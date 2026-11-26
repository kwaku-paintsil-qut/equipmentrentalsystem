const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    status: { type: String, enum: ['Available', 'Under Maintenance'], default: 'Available' },
});

module.exports = mongoose.model('Equipment', equipmentSchema);

