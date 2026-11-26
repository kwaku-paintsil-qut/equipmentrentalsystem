const Equipment = require('../models/Equipment');

const getEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find();
        res.status(200).json(equipment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {getEquipment};