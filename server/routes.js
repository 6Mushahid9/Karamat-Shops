import express from 'express';
import Shop from './Shop.js';

const router = express.Router();

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

// Get all details of a particular shop by ID
router.get('/shops/details/:id', async (req, res) => {
    try {
      const shop = await Shop.findById(req.params.id);
      if (!shop) return res.status(404).json({ message: 'Shop not found' });
      res.status(200).json(shop);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching shop details', error });
    }
  });

  // Get all details of a particular shop by shopNumuber
  router.get('/shops/details/number/:shopNumber', async (req, res) => {
    try {
      const shop = await Shop.findOne({ shopNumber: req.params.shopNumber });
      if (!shop) return res.status(404).json({ message: 'Shop not found' });
      res.status(200).json(shop);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching shop details', error });
    }
});

  // Get all details of a particular shop by Owner name
router.get('/shops/details/owner/:ownerName', async (req, res) => {
    try {
      const shops = await Shop.find({ 'owner.name': req.params.ownerName });
      if (shops.length === 0) return res.status(404).json({ message: 'No shops found for this owner' });
      res.status(200).json(shops);
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
