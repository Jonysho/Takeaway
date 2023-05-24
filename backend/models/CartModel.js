const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cartDetails: [
    {
      itemId: {
        type: Number,
        ref: 'menuitems',
        required: true
      },
      name: {
        type: String,
      },
      portions: [
        {
          size: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true,
            default: 0
          },
          price: {
            type: Number,
          }
        }
      ],
      amount: {
        type: Number,
        required: true
      }
    }
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
