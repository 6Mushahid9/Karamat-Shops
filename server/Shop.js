import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  shopNumber: {
    type: String,
    required: true,
    unique: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  amountDue: {
    type: Number,
    default: 0,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0, 
  },
  floorNumber: {
    type: Number,
    required: true,
  },
  owner: {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    shopsOwned: [Number], 
  },
});

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;
