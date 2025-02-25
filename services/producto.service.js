const ProductoRepository = require("../repositories/producto.repository");
const Validaciones = require("../utils/validation");
class ProductoService {
  async getAllProductos() {
    return await ProductoRepository.getAllProductos();
  }

  async getProductoById(id) {
    if(!id){
      throw new Error("El id del producto es requerido");
    }
    return await ProductoRepository.getProductoById(id);
  }
  
  async getProductoByNumSerie(numSerie) {
    if(!numSerie){
      throw new Error("El Numero de serie del producto es requerido");
    }
    return await ProductoRepository.getProductoByNumSerie(numSerie);
  }

  async createProducto(producto){
    //Validar que todos los campos obligatorios vengan
    if (!producto.nombre || !producto.precio || !producto.fechaAdquisicion || !producto.numSerie) {
        throw new Error('Todos los campos son requeridos');
    }

    //Validar que el numero de serie no exista
    const productoByNumSerie = await ProductoRepository.getProductoByNumSerie(producto.numSerie);
    if (productoByNumSerie) {
        throw new Error('El número de serie ya existe');
    }

    //Validar que el precio no sea negativo
    if (producto.precio < 1) {
        throw new Error('El precio debe ser mayor a 0');
    }

    //Validar que la fecha de adquisicion tenga formato valido
    if(!Validaciones.esFechaValida(producto.fechaAdquisicion)){
        throw new Error('La fecha de adquisición no tiene el formato correcto');
    }
    //Generar número de inventario
    //año-consecutivo 20225-001
    //Obtener el año de adquisicion
    //2025-02-24
    const yearAdquisicion = producto.fechaAdquisicion.split('-')[0];
    //2025 [0]
    //02 [1]
    //24[2]

    let countYear = await ProductoRepository.contarProductosByYear(yearAdquisicion);

    //Incremetar en 1 el contador
    countYear++;

    //padStart funciona para agregar ceros a la izquierda si el número no tiene dígitos
    producto.numInventario = `${yearAdquisicion}-${countYear.toString().padStart(3, '0')}`;

    return await ProductoRepository.createProducto(producto);
}

  async updateProducto(id, producto) {
    if (
      !producto.nombre ||
      !producto.precio ||
      !producto.fechaAdquisicion ||
      !producto.numSerie ||
      !producto.numInventario
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    const existeNumSerie = await ProductoRepository.getProductoByNumSerie(
      producto.numSerie
    );
    if (existeNumSerie && existeNumSerie._id.toString() !== id) {
      throw new Error("El número de serie ya existe en otro producto");
    }

    if (producto.precio < 0) {
      throw new Error("El precio no puede ser negativo");
    }

    if (!Validaciones.esFechaValida(producto.fechaAdquisicion)) {
      throw new Error("La fecha de adquisición no tiene un formato válido");
    }

    // Generar numero de inventario
    // año-consecutivo 2025-001   ¿
    //Obtener el año de adquisició
    return await ProductoRepository.updateProducto(id, producto);
  }

  async deleteProducto(id) {
    return await ProductoRepository.deleteProducto(id);
  }
}

module.exports = new ProductoService();