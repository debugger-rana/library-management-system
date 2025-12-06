const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  membershipNo: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  aadharCard: {
    type: String,
    default: ''
  },
  membershipType: {
    type: String,
    enum: ['6months', '1year', '2years'],
    default: '6months'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  booksIssued: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate expiry date based on membership type
memberSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('membershipType')) {
    const startDate = this.startDate || new Date();
    let months = 6;
    
    switch(this.membershipType) {
      case '1year':
        months = 12;
        break;
      case '2years':
        months = 24;
        break;
      default:
        months = 6;
    }
    
    this.expiryDate = new Date(startDate.setMonth(startDate.getMonth() + months));
  }
  next();
});

module.exports = mongoose.model('Member', memberSchema);
