const express = require('express');
const AsignacionProductoController = require('../controllers/asignacionProducto.controller');
const router = express.Router();

//Obtener todas las personas
router.get('/', AsignacionProductoController.getAllAP);
router.get('/id/:id', AsignacionProductoController.getAllAPById);
router.post('/', AsignacionProductoController.createAP);
router.post('/asignacionProductos', AsignacionProductoController.createAPs);
router.put('/:id', AsignacionProductoController.updateAP);
router.delete('/:id', AsignacionProductoController.deleteAP);


module.exports = router;