// Datos de antros y bares
const placesData = [
    {
        id: 1,
        nombre: "La Luna Bar",
        tipo: "bar",
        descripcion: "Bar con música en vivo y ambiente relajado",
        imagen: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572116469697-31de0f17cc35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572116469698-31de0f17cc36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572116469699-31de0f17cc37?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.5,
        precio: "moderado",
        horario: "18:00 - 02:00",
        ubicacion: "Centro",
        color: "#3498db",
        menu: {
            categorias: [
                {
                    nombre: "Cervezas",
                    items: [
                        { nombre: "Corona", precio: "$45", descripcion: "Cerveza clara" },
                        { nombre: "Negra Modelo", precio: "$50", descripcion: "Cerveza oscura" },
                        { nombre: "Victoria", precio: "$45", descripcion: "Cerveza tipo pilsner" }
                    ]
                },
                {
                    nombre: "Cocteles",
                    items: [
                        { nombre: "Margarita", precio: "$85", descripcion: "Tequila, limón y triple sec" },
                        { nombre: "Mojito", precio: "$80", descripcion: "Ron, menta y limón" },
                        { nombre: "Piña Colada", precio: "$90", descripcion: "Ron, piña y coco" }
                    ]
                }
            ]
        }
    },
    {
        id: 2,
        nombre: "Club Nocturno Eclipse",
        tipo: "antro",
        descripcion: "El mejor ambiente nocturno con DJ en vivo",
        imagen: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1566737236501-c8ac43014a68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1566737236502-c8ac43014a69?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1566737236503-c8ac43014a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.8,
        precio: "alto",
        horario: "21:00 - 04:00",
        ubicacion: "Zona Norte",
        color: "#e74c3c",
        menu: {
            categorias: [
                {
                    nombre: "Botellas",
                    items: [
                        { nombre: "Whisky Black Label", precio: "$1200", descripcion: "Botella 750ml" },
                        { nombre: "Vodka Absolut", precio: "$800", descripcion: "Botella 750ml" },
                        { nombre: "Tequila Don Julio", precio: "$1000", descripcion: "Botella 750ml" }
                    ]
                },
                {
                    nombre: "Bebidas Preparadas",
                    items: [
                        { nombre: "Long Island", precio: "$120", descripcion: "Mezcla de 5 licores" },
                        { nombre: "Cosmopolitan", precio: "$100", descripcion: "Vodka y arándano" },
                        { nombre: "Blue Hawaii", precio: "$110", descripcion: "Ron y curaçao azul" }
                    ]
                }
            ]
        }
    },
    {
        id: 3,
        nombre: "Cantina El Mariachi",
        tipo: "cantina",
        descripcion: "Auténtica cantina mexicana con música tradicional",
        imagen: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514933651104-005eec06c04c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514933651105-005eec06c04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514933651106-005eec06c04e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.2,
        precio: "economico",
        horario: "14:00 - 00:00",
        ubicacion: "Centro Histórico",
        color: "#f1c40f",
        menu: {
            categorias: [
                {
                    nombre: "Cervezas",
                    items: [
                        { nombre: "Cerveza de Barril", precio: "$35", descripcion: "Vaso de 500ml" },
                        { nombre: "Michelada", precio: "$45", descripcion: "Preparada con limón y sal" },
                        { nombre: "Cubetazo", precio: "$180", descripcion: "6 cervezas" }
                    ]
                },
                {
                    nombre: "Botanas",
                    items: [
                        { nombre: "Chicharrón", precio: "$50", descripcion: "Con salsa verde" },
                        { nombre: "Tacos Dorados", precio: "$60", descripcion: "Orden de 4 piezas" },
                        { nombre: "Cacahuates", precio: "$25", descripcion: "Preparados" }
                    ]
                }
            ]
        }
    }
]; 