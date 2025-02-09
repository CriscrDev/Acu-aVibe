import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: String, required: true },
    descripcion: { type: String },
    imagen: { type: String }
});

const menuCategoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    items: [menuItemSchema]
});

const placeSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: { type: String, required: true },
    categoria: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: {
        original: { type: String, required: true },
        thumbnail: { type: String },
        medium: { type: String }
    },
    calificacion: { type: Number, required: true },
    precio: { type: String, required: true },
    horario: { type: String, required: true },
    ubicacion: { type: String, required: true },
    menu: {
        categorias: [menuCategoriaSchema]
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Place', placeSchema); 