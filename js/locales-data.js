// Datos de ejemplo para locales
const placesData = [
    {
        id: 1,
        nombre: "Plaza Comercial Centro",
        tipo: "comida",
        descripcion: "Local comercial con diversos puestos de comida",
        imagen: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        calificacion: 4.6,
        precio: "moderado",
        horario: "10:00 - 22:00",
        ubicacion: "Centro",
        menu: {
            categorias: [
                {
                    nombre: "Comida Mexicana",
                    items: [
                        { nombre: "Tacos al Pastor", precio: "$50", descripcion: "Tacos de cerdo marinado con piña" },
                        { nombre: "Quesadillas", precio: "$45", descripcion: "Tortilla con queso y su elección de guisado" }
                    ]
                },
                {
                    nombre: "Bebidas",
                    items: [
                        { nombre: "Aguas Frescas", precio: "$25", descripcion: "Horchata, Jamaica, Tamarindo" },
                        { nombre: "Refrescos", precio: "$20", descripcion: "Variedad de refrescos" }
                    ]
                }
            ]
        }
    },
    {
        id: 2,
        nombre: "Fashion Mall",
        tipo: "ropa",
        descripcion: "Local de moda con las últimas tendencias",
        imagen: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        calificacion: 4.4,
        precio: "alto",
        horario: "11:00 - 21:00",
        ubicacion: "Zona Norte",
        menu: null
    },
    {
        id: 3,
        nombre: "Foodie Corner",
        tipo: "comida",
        descripcion: "Variedad de opciones gastronómicas en un solo lugar",
        imagen: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        calificacion: 4.8,
        precio: "moderado",
        horario: "12:00 - 22:00",
        ubicacion: "Centro Comercial",
        menu: {
            categorias: [
                {
                    nombre: "Hamburguesas",
                    items: [
                        { nombre: "Clásica", precio: "$85", descripcion: "Carne, queso, lechuga, tomate" },
                        { nombre: "Especial", precio: "$110", descripcion: "Doble carne, tocino, queso" }
                    ]
                },
                {
                    nombre: "Postres",
                    items: [
                        { nombre: "Helado", precio: "$35", descripcion: "Variedad de sabores" },
                        { nombre: "Pastel", precio: "$45", descripcion: "Porción del día" }
                    ]
                }
            ]
        }
    }
]; 