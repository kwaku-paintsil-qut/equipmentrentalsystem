const booking = require('../models/booking');
const Booking = require('../models/booking');
const Equipment = require('../models/Equipment');

const createBooking = async (req, res) => {
    const {  equipmentId, pickupDate, returnDate, pricePerHour } = req.body;
    

    if (isNaN(pickup) || isNaN(returnD)) {return res.status(400).json({ message: 'Please provide valid dates' });
}

    if (!pickupDate || !returnDate || !equipmentId) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    };

    if (returnD <= pickup) {
        return res.status(400).json({ message: 'Return date must be after pickup date' });
    };

    if (pickup < new Date()) {
        return res.status(400).json({ message: 'Pickup date must be in the future' });
    };

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const pickup = new Date(start);
    pickup.setHours(0, 0, 0, 0); // Set time to midnight for comparison
    const returnD = new Date(end);
    returnD.setHours(23, 59, 59, 999); // Set time to end of the day for comparison


    const existingBookings = await Booking.find({
        equipmentId,
        $or: [
            { pickupDate: { $lt: returnD }, returnDate: { $gt: pickup } },
            { pickupDate: { $lt: returnD }, returnDate: { $gt: pickup } },
            { pickupDate: { $lt: returnD }, returnDate: { $gt: pickup } },
        ],
    });

    if (existingBookings.length > 0) {
        return res.status(409).json({ message: 'Equipment is already booked for the selected dates' });
    };


    
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

const getAllBooking = async (req, res) => {
    try{
        const booking = await Booking.find()
        .populate('userId', 'status');
        res.status(200).json(booking);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};




module.exports = { createBooking, getAllBooking };
