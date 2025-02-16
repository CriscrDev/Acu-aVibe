// Datos de ejemplo para tiendas y comercios
const placesData = [
    {
        id: 1,
        nombre: "Boutique Elegancia",
        tipo: "ropa",
        descripcion: "Ropa y accesorios de moda para toda la familia",
        imagen: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1441984904997-e0b6ba687e05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1441984904998-e0b6ba687e06?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1441984904999-e0b6ba687e07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.4,
        precio: "moderado",
        horario: "10:00 - 20:00",
        ubicacion: "Centro Comercial"
    },
    {
        id: 2,
        nombre: "TechZone",
        tipo: "electronica",
        descripcion: "Lo último en tecnología y electrónica",
        imagen: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1454165804607-c3d57bc86b41?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1454165804608-c3d57bc86b42?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1454165804609-c3d57bc86b43?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.6,
        precio: "alto",
        horario: "11:00 - 19:00",
        ubicacion: "Plaza Principal"
    },
    {
        id: 3,
        nombre: "Artesanías Mexicanas",
        tipo: "artesanias",
        descripcion: "Artesanías tradicionales y souvenirs locales",
        imagen: "https://images.unsplash.com/photo-1513096010445-c8e05a26c05c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1513096010445-c8e05a26c05c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1513096010446-c8e05a26c05d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1513096010447-c8e05a26c05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1513096010448-c8e05a26c05f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.8,
        precio: "economico",
        horario: "09:00 - 18:00",
        ubicacion: "Centro Histórico"
    },
    {
        id: 4,
        nombre: "Deportes Acuña",
        tipo: "deportes",
        descripcion: "Todo para el deporte y la vida activa",
        imagen: "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1526178613552-2b45c6c302f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1526178613553-2b45c6c302f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1526178613554-2b45c6c302f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1526178613555-2b45c6c302f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.3,
        precio: "moderado",
        horario: "10:00 - 19:00",
        ubicacion: "Zona Norte"
    },
    {
        id: 5,
        nombre: "Casa & Estilo",
        tipo: "hogar",
        descripcion: "Decoración y artículos para el hogar",
        imagen: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1513519245089-0e12902e35cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1513519245090-0e12902e35cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1513519245091-0e12902e35cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.5,
        precio: "alto",
        horario: "10:00 - 20:00",
        ubicacion: "Centro Comercial"
    }
]; 