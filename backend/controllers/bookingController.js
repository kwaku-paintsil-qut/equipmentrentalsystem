const Booking = require('../models/booking');
const Equipment = require('../models/Equipment');

const createBooking = async (req, res) => {
    const {  equipmentId, pickupDate, returnDate, pricePerHour } = req.body;
    try {
        
        const equipment = await Equipment.findById(equipmentId);
        if (!equipment) {
            return res.status(404).json({ message: 'Equipment not found' });
        }

        if (equipment.status !== 'Available') {
            return res.status(400).json({ message: 'Equipment is not available for booking' });
        }

        
        const hours = (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60);

        const booking = await Booking.create({
            equipmentId,
            pickupDate,
            returnDate,
            total: hours * equipment.pricePerHour,
            userId: req.user.id,
        });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { createBooking };
