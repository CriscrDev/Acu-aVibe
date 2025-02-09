import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Place from '../models/Place.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, join(__dirname, '../uploads'));
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('No es una imagen válida'));
        }
    }
});

// Procesar imagen
async function processImage(file) {
    const originalPath = file.path;
    const filename = file.filename.split('.')[0];
    
    // Crear thumbnail
    await sharp(originalPath)
        .resize(200, 200)
        .jpeg({ quality: 90 })
        .toFile(join(__dirname, `../uploads/${filename}-thumb.jpg`));
    
    // Crear versión mediana
    await sharp(originalPath)
        .resize(800, 800)
        .jpeg({ quality: 90 })
        .toFile(join(__dirname, `../uploads/${filename}-medium.jpg`));
    
    return {
        original: `/uploads/${file.filename}`,
        thumbnail: `/uploads/${filename}-thumb.jpg`,
        medium: `/uploads/${filename}-medium.jpg`
    };
}

// Rutas
router.get('/', async (req, res) => {
    try {
        const { categoria } = req.query;
        const query = categoria ? { categoria } : {};
        const places = await Place.find(query).sort('-createdAt');
        res.json(places);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        const placeData = req.body;
        
        if (req.file) {
            const processedImages = await processImage(req.file);
            placeData.imagen = processedImages;
        }
        
        const place = new Place(placeData);
        await place.save();
        res.status(201).json(place);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', upload.single('imagen'), async (req, res) => {
    try {
        const placeData = req.body;
        
        if (req.file) {
            const processedImages = await processImage(req.file);
            placeData.imagen = processedImages;
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
});

router.delete('/:id', async (req, res) => {
    try {
        const place = await Place.findByIdAndDelete(req.params.id);
        
        if (!place) {
            return res.status(404).json({ message: 'Lugar no encontrado' });
        }
        
        res.json({ message: 'Lugar eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 