const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  serialNo: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['issue', 'return'],
    required: true
  },
  issueDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['issued', 'returned', 'overdue'],
    default: 'issued'
  },
  fine: {
    type: Number,
    default: 0
  },
  finePaid: {
    type: Boolean,
    default: false
  },
  remarks: {
    type: String
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  returnedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Calculate fine (₹5 per day after due date)
transactionSchema.methods.calculateFine = function() {
  if (this.returnDate && this.returnDate > this.dueDate) {
    const daysLate = Math.ceil((this.returnDate - this.dueDate) / (1000 * 60 * 60 * 24));
    this.fine = daysLate * 5;
  }
  return this.fine;
};

module.exports = mongoose.model('Transaction', transactionSchema);
