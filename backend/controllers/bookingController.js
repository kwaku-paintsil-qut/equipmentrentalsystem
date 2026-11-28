const Booking = require('../models/booking');
const Equipment = require('../models/Equipment');

const createBooking = async (req, res) => {
    const {  equipmentId, pickupDate, returnDate, } = req.body;
    

     if (!pickupDate || !returnDate || !equipmentId) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    };

    
    const start = new Date(pickupDate);
    const end = new Date(returnDate); 

    const pickup = new Date(start);
    pickup.setHours(0, 0, 0, 0); // Set time to midnight for comparison
    const returnD = new Date(end);
    returnD.setHours(23, 59, 59, 999); // Set time to end of the day for comparison

    if (isNaN(pickup) || isNaN(returnD)) {return res.status(400).json({ message: 'Please provide valid dates' });
    
}

    if (pickup < new Date()) {
        return res.status(400).json({ message: 'Pickup date must be in the future' });
    };

    if (returnD <= pickup) {
        return res.status(400).json({ message: 'Return date must be after pickup date' });
    };

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
        .populate('userId', 'firstName lastName email')
        .populate('equipmentId', 'name imageUrl');
        res.status(200).json(booking);
    }catch (error){
        res.status(500).json({message: error.message});
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        .populate('userId', 'firstName lastName email')
        .populate('equipmentId', 'name imageUrl pricePerHour');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBookingStatus = async ( req, res ) => {
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes (status)){
        return res.status(400).json({ message: 'Status must be Approved or Rejected'});
    }

    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.status !== 'Pending') {
            return res.status(400).json({ message: 'Only pending bookings can be updated' });
        }

        booking.status = status;
        await booking.save();
        res.status(200).json(booking);
    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};



module.exports = { createBooking, getAllBooking, getBookingById, updateBookingStatus };
