const { Schema, model } = require('mongoose');

const estudianteSchema = new Schema({
    id: { type: String, unique: true },
    carnet: { type: String },
    nombre: { type: String }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Estudiante', estudianteSchema);