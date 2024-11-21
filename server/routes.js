import express from 'express';
import Shop from './Shop.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Authenticate Owner
router.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  // Check if provided credentials match the ones in .env
  if (email !== process.env.OWNER_EMAIL || password !== process.env.OWNER_PASSWORD) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
});

// Get all shops of a specific floor
router.get('/shops/floor', async (req, res) => {
    const { floorNumber } = req.query; // Extract floorNumber from query parameters
    if (!floorNumber) {
      return res.status(400).json({ message: 'Floor number is required' });
    }
  
    try {
      const shops = await Shop.find({ floorNumber });
      if (shops.length === 0) {
        return res.status(404).json({ message: 'No shops found on this floor' });
      }
      res.status(200).json(shops);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching shops of the floor', error });
    }
  });


// Filters
router.get('/shops/details', async (req, res) => {
  const { 
    shopNumber, 
    shopName, 
    ownerName, 
    ownerNumber, 
    ownerEmail, 
    amountDue 
  } = req.query;

  try {
    // Build the query object dynamically based on the provided query params
    let query = {};

    // Filter by shop number (exact match)
    if (shopNumber) {
      query.shopNumber = shopNumber;
    }

    // Filter by shop name (exact match)
    if (shopName) {
      query.shopName = { $regex: shopName, $options: 'i' }; // Case-insensitive search
    }

    // Filter by owner name (exact match)
    if (ownerName) {
      query['owner.name'] = { $regex: ownerName, $options: 'i' }; // Case-insensitive search
    }

    // Filter by owner number (exact match)
    if (ownerNumber) {
      query['owner.number'] = ownerNumber;
    }

    // Filter by owner email (exact match)
    if (ownerEmail) {
      query['owner.email'] = { $regex: ownerEmail, $options: 'i' }; // Case-insensitive search
    }

    // Filter by amount due greater than 0
    if (amountDue === 'true') { // Expecting string 'true' to filter
      query.amountDue = { $gt: 0 }; // Amount due greater than 0
    }

    // Fetch shops based on the constructed query
    const shops = await Shop.find(query);

    if (shops.length === 0) {
      return res.status(404).json({ message: 'No shops found' });
    }

    res.status(200).json(shops); // Return the filtered shops
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shop details', error });
  }
});


// Change amounts (total, paid, and due)
router.put('/shops/change-amounts/:id', async (req, res) => {
    const { totalAmount, amountPaid, amountDue } = req.body;
    try {
      const updatedShop = await Shop.findByIdAndUpdate(
        req.params.id,
        { $set: { totalAmount, amountPaid, amountDue } },
        { new: true }
      );
      if (!updatedShop) return res.status(404).json({ message: 'Shop not found' });
      res.status(200).json(updatedShop);
    } catch (error) {
      res.status(500).json({ message: 'Error updating amounts', error });
    }
  });

// Edit details of the owner
router.put('/shops/edit-owner/:id', async (req, res) => {
    const { name, number, address, email, shopsOwned } = req.body;
    try {
      const updatedShop = await Shop.findByIdAndUpdate(
        req.params.id,
        { 
          $set: {
            'owner.name': name,
            'owner.number': number,
            'owner.address': address,
            'owner.email': email,
            'owner.shopsOwned': shopsOwned
          }
        },
        { new: true }
      );
      if (!updatedShop) return res.status(404).json({ message: 'Shop not found' });
      res.status(200).json(updatedShop);
    } catch (error) {
      res.status(500).json({ message: 'Error updating owner details', error });
    }
  });
  
// Clear and reset all details of a shop
router.put('/shops/reset/:id', async (req, res) => {
    try {
      const resetShop = await Shop.findByIdAndUpdate(
        req.params.id, 
        {
          $set: {
            shopName: "Empty",
            amountDue: 0,
            amountPaid: 0,
            totalAmount: 0,
            'owner.name': "Vacant",
            'owner.number': "0000",
            'owner.address': "Vacant",
            'owner.email': "null@gmail.com",
            'owner.shopsOwned': [],
          }
        },
        { new: true }
      );
      if (!resetShop) return res.status(404).json({ message: 'Shop not found' });
      res.status(200).json(resetShop);
    } catch (error) {
      res.status(500).json({ message: 'Error resetting shop details', error });
    }
  });
  

export default router;
