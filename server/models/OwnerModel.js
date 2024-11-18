import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // URL or path to the image
  },
  shops: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop', // Reference to the Shop model
  }],
});

const Owner = mongoose.model('Owner', ownerSchema);
export default Owner;
