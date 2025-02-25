const mongoose = require("mongoose");

const asignacionProductoSchema = new mongoose.Schema({
    nombre: {type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true},
    producto: {type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true},
    fechaAsignacion: {type: Date, required: true},
    estado : {type: String, required: true}
});

module.exports = mongoose.model("Producto", productoSchema);