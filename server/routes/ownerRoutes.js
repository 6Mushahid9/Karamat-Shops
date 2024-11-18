import express from 'express';
import Owner from '../models/OwnerModel.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.get('/shops', authMiddleware, async (req, res) => {
  try {
    const ownerId = req.headers.ownerid; // Replace with OAuth token later
    const owner = await Owner.findById(ownerId).populate('shops');
    if (!owner) {
      return res.status(404).json({ error: 'Owner not found.' });
    }
    res.status(200).json(owner.shops);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch shops.' });
  }
});


router.put('/edit', authMiddleware, async (req, res) => {
    try {
      const ownerId = req.headers.ownerid; // Replace with OAuth token later
      const updates = req.body; // Expect { name, email, number }
      const updatedOwner = await Owner.findByIdAndUpdate(ownerId, updates, { new: true });
      if (!updatedOwner) {
        return res.status(404).json({ error: 'Owner not found.' });
      }
      res.status(200).json(updatedOwner);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update owner details.' });
    }
});

router.put('/profile-picture', authMiddleware, async (req, res) => {
    try {
      const ownerId = req.headers.ownerid; // Replace with OAuth token later
      const { profileImage } = req.body; // Expect { profileImage: 'URL' }
      const updatedOwner = await Owner.findByIdAndUpdate(
        ownerId,
        { profileImage },
        { new: true }
      );
      if (!updatedOwner) {
        return res.status(404).json({ error: 'Owner not found.' });
      }
      res.status(200).json({ message: 'Profile picture updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile picture.' });
    }
});
  


export default router;
