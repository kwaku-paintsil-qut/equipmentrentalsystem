const express = require('express');
const router = express.Router();
const { getEquipment } = require('../controllers/equipmentController');
const { getEquipmentById } = require('../controllers/equipmentController');

router.get('/:id', getEquipmentById);

router.get('/' , getEquipment);

module.exports = router;