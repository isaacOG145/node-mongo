const AsignacionProducto = require('../models/asignacionProducto.model'); // Asegúrate de que la ruta sea correcta

class AsignacionProductoRepository {

    async getAllAsignacionesActivas() {
        return await AsignacionProducto.find({ estado: "activo" }).populate('persona').populate('producto');
    }

    async getAllAsignacionesProductoByPersona(personaId) {
        return await AsignacionProducto.find({ persona: personaId }).populate('producto');
    }

    async createAsignacionProducto(personaId, productoId) {
        const fechaAsignacion = new Date();
        fechaAsignacion.setHours(0, 0, 0, 0); // Corregido el nombre del método

        return await AsignacionProducto.create({
            persona: personaId, // Corregido el nombre de la variable
            producto: productoId,
            fechaAsignacion: fechaAsignacion,
            estado: 'Activo'
        });
    }

}

module.exports = new AsignacionProductoRepository();