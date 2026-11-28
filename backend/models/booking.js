const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Rejected', 'Cancelled', 'Approved', 'Ready for Pickup', 'Picked Up'], default: 'Pending' },
    total: { type: Number, required: true },
});

module.exports = mongoose.model('booking', bookingSchema);

