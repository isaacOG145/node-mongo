const AsignacionProductoRepository = require('../repositories/asignacionProducto.repository');
const PersonaRepository = require('../repositories/persona.repository');
const ProductoRepository = require('../repositories/producto.repository');

class AsignacionProductoService {

    async getAllAsignacionesActivas() {
        return await AsignacionProductoRepository.getAllAsignacionesActivas();
    }

    async createAP(personaId, productoId) {
        const persona = await PersonaRepository.getPersonaById(personaId);
        if (!persona) {
            throw new Error('La persona no existe');
        }

        const producto = await ProductoRepository.getProductoById(productoId);
        if (!producto) {
            throw new Error('El producto no existe');
        }

        const asignacionCreada = await AsignacionProductoRepository.createAsignacionProducto(personaId, productoId);
        return asignacionCreada;
    }

    async createAPs(personaId, productoId){

        const persona = await PersonaRepository.getPersonaById(personaId);
        if(!persona){
            throw new Error ('La persona no existe');
        }

        let asignaciones = [];

        for (let index = 0; index < productoId.length; index ++){
            const productoId = productosId[index];

            try{
                const asignacionCreada = await AsignacionProductoRepository.createAsignacionProducto(personaId, productoId);
                asignacionCreada.push(asignacionCreada);

            }catch(error){
                const asignacionError = {producto: productoId, error: error.message}
            }
        }
    }

}

module.exports = new AsignacionProductoService();