const AsignacionProductoService = require('../services/asignacionProducto.service');

class AsignacionProductoController {

    static async getAllAP(req, res) {
        try {
            const asignaciones = await AsignacionProductoService.getAllAsignacionesActivas();
            res.status(200).json(asignaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllAPById(req, res) {
        // Implementación
    }

    static async createAP(req, res) {
        try {
            const personaId = req.body.persona;

            if (!personaId || personaId === '' || personaId === null || personaId === undefined) {
                throw new Error('El id de la persona es requerido');
            }

            const productoId = req.body.producto;
            if (!productoId || productoId === '' || productoId === null || productoId === undefined) {
                throw new Error('El id del producto es requerido'); // Corregido el mensaje de error
            }

            const asignacionCreada = await AsignacionProductoService.createAP(personaId, productoId);
            res.status(200).json(asignacionCreada); // Cambiado a 201 (Created)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createAPs(){
        try {
            const personaId = req.body.persona;

            if (!personaId || personaId === '' || personaId === null || personaId === undefined) {
                throw new Error('El id de la persona es requerido');
            }

            const productos = req.body.producto;
            if(!productos || productos.length == 0 || productos == null || productos == undefined){
                throw new Error('Los productos son requeridos');
            }

            const asignacionesCreadas = await AsignacionProductoService.createAPs(personaId, producto);
            res.json(asignacionesCreadas);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateAP(req, res) {
        // Implementación
    }

    static async deleteAP(req, res) {
        // Implementación
    }

}

module.exports = AsignacionProductoController;