import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  shopNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner', // Reference to the Owner model
  },
  amountDue: {
    type: Number,
    default: 0,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
});

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;
