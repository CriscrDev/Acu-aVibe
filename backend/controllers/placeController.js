const Place = require('../models/Place');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

// Crear un nuevo lugar
exports.createPlace = async (req, res) => {
    try {
        const placeData = req.body;
        
        if (req.file) {
            const { filename } = req.file;
            const uploadsDir = path.join(__dirname, '../uploads');
            
            // Crear versiones de diferentes tamaños de la imagen
            await sharp(req.file.path)
                .resize(800, 600)
                .jpeg({ quality: 90 })
                .toFile(path.join(uploadsDir, `medium_${filename}`));
                
            await sharp(req.file.path)
                .resize(400, 300)
                .jpeg({ quality: 80 })
                .toFile(path.join(uploadsDir, `thumbnail_${filename}`));
            
            placeData.imagen = {
                original: `/uploads/${filename}`,
                medium: `/uploads/medium_${filename}`,
                thumbnail: `/uploads/thumbnail_${filename}`
            };
        }
        
        const place = new Place(placeData);
        await place.save();
        
        res.status(201).json(place);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los lugares
exports.getPlaces = async (req, res) => {
    try {
        const { categoria, tipo } = req.query;
        let query = {};
        
        if (categoria) query.categoria = categoria;
        if (tipo) query.tipo = tipo;
        
        const places = await Place.find(query);
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un lugar por ID
exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ message: 'Lugar no encontrado' });
        }
        res.json(place);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un lugar
exports.updatePlace = async (req, res) => {
    try {
        const placeData = req.body;
        
        if (req.file) {
            const { filename } = req.file;
            const uploadsDir = path.join(__dirname, '../uploads');
            
            await sharp(req.file.path)
                .resize(800, 600)
                .jpeg({ quality: 90 })
                .toFile(path.join(uploadsDir, `medium_${filename}`));
                
            await sharp(req.file.path)
                .resize(400, 300)
                .jpeg({ quality: 80 })
                .toFile(path.join(uploadsDir, `thumbnail_${filename}`));
            
            placeData.imagen = {
                original: `/uploads/${filename}`,
                medium: `/uploads/medium_${filename}`,
                thumbnail: `/uploads/thumbnail_${filename}`
            };
        }
        
        const place = await Place.findByIdAndUpdate(
            req.params.id,
            placeData,
            { new: true }
        );
        
        if (!place) {
            return res.status(404).json({ message: 'Lugar no encontrado' });
        }
        
        res.json(place);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un lugar
exports.deletePlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            return res.status(404).json({ message: 'Lugar no encontrado' });
        }
        
        // Eliminar imágenes asociadas
        if (place.imagen) {
            const uploadsDir = path.join(__dirname, '..');
            await Promise.all([
                fs.unlink(path.join(uploadsDir, place.imagen.original)),
                fs.unlink(path.join(uploadsDir, place.imagen.medium)),
                fs.unlink(path.join(uploadsDir, place.imagen.thumbnail))
            ]).catch(console.error);
        }
        
        await place.remove();
        res.json({ message: 'Lugar eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 