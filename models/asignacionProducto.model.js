const mongoose = require("mongoose");

const asignacionProductoSchema = new mongoose.Schema({
    persona: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', required: true }, // Cambiado de 'nombre' a 'persona'
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
    fechaAsignacion: { type: Date, required: true },
    estado: { type: String, required: true }
});

module.exports = mongoose.model("AsignacionProducto", asignacionProductoSchema); // Corregido el nombre del modelo