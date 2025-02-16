// Datos de restaurantes
const placesData = [
    {
        id: 1,
        nombre: "El Rincón Mexicano",
        tipo: "mexicana",
        descripcion: "Auténtica cocina mexicana con los mejores platillos tradicionales",
        imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.7,
        precio: "moderado",
        horario: "11:00 - 23:00",
        ubicacion: "Centro",
        menu: {
            categorias: [
                {
                    nombre: "Entradas",
                    items: [
                        { nombre: "Guacamole", precio: "$85", descripcion: "Aguacate fresco con tomate, cebolla y cilantro" },
                        { nombre: "Queso Fundido", precio: "$95", descripcion: "Con chorizo o champiñones" },
                        { nombre: "Sopa de Tortilla", precio: "$75", descripcion: "Tradicional sopa con tortilla crujiente" }
                    ]
                },
                {
                    nombre: "Platos Fuertes",
                    items: [
                        { nombre: "Enchiladas Verdes", precio: "$120", descripcion: "Rellenas de pollo con salsa verde" },
                        { nombre: "Mole Poblano", precio: "$140", descripcion: "Pechuga de pollo bañada en mole" },
                        { nombre: "Chiles en Nogada", precio: "$180", descripcion: "Chile poblano relleno con carne y frutas" }
                    ]
                },
                {
                    nombre: "Postres",
                    items: [
                        { nombre: "Flan Napolitano", precio: "$45", descripcion: "Casero con caramelo" },
                        { nombre: "Churros", precio: "$40", descripcion: "Con azúcar y canela" },
                        { nombre: "Pastel de Tres Leches", precio: "$55", descripcion: "Con frutas frescas" }
                    ]
                }
            ]
        }
    },
    {
        id: 2,
        nombre: "Mariscos El Puerto",
        tipo: "mariscos",
        descripcion: "Los mejores mariscos frescos de la región",
        imagen: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.5,
        precio: "alto",
        horario: "12:00 - 22:00",
        ubicacion: "Zona Norte",
        menu: {
            categorias: [
                {
                    nombre: "Entradas",
                    items: [
                        { nombre: "Cóctel de Camarón", precio: "$130", descripcion: "Camarones frescos en salsa coctelera" },
                        { nombre: "Tostadas de Atún", precio: "$90", descripcion: "Atún fresco marinado" },
                        { nombre: "Sopa de Pescado", precio: "$85", descripcion: "Caldo casero con pescado del día" }
                    ]
                },
                {
                    nombre: "Especialidades",
                    items: [
                        { nombre: "Pescado a la Veracruzana", precio: "$180", descripcion: "Pescado del día en salsa de tomate y aceitunas" },
                        { nombre: "Camarones al Mojo", precio: "$210", descripcion: "Camarones al mojo de ajo" },
                        { nombre: "Paella Marina", precio: "$250", descripcion: "Con mariscos variados" }
                    ]
                }
            ]
        }
    },
    {
        id: 3,
        nombre: "La Parrilla Argentina",
        tipo: "carnes",
        descripcion: "Especialidad en cortes finos y parrilladas",
        imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.8,
        precio: "alto",
        horario: "13:00 - 23:00",
        ubicacion: "Centro Comercial",
        menu: {
            categorias: [
                {
                    nombre: "Cortes",
                    items: [
                        { nombre: "Ribeye", precio: "$320", descripcion: "350g de corte premium" },
                        { nombre: "T-Bone", precio: "$380", descripcion: "500g de corte especial" },
                        { nombre: "Arrachera", precio: "$250", descripcion: "300g marinada en especias" }
                    ]
                },
                {
                    nombre: "Guarniciones",
                    items: [
                        { nombre: "Papas a la Francesa", precio: "$60", descripcion: "Con especias argentinas" },
                        { nombre: "Ensalada Mixta", precio: "$45", descripcion: "Vegetales frescos" },
                        { nombre: "Chimichurri", precio: "$25", descripcion: "Salsa tradicional argentina" }
                    ]
                }
            ]
        }
    },
    {
        id: 4,
        nombre: "Bella Italia",
        tipo: "italiana",
        descripcion: "Auténtica cocina italiana con pasta fresca y pizzas artesanales",
        imagen: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        calificacion: 4.3,
        precio: "moderado",
        horario: "12:00 - 22:30",
        ubicacion: "Zona Sur",
        menu: {
            categorias: [
                {
                    nombre: "Pastas",
                    items: [
                        { nombre: "Spaghetti Carbonara", precio: "$140", descripcion: "Con huevo, panceta y queso pecorino" },
                        { nombre: "Fettuccine Alfredo", precio: "$130", descripcion: "En salsa cremosa de queso" },
                        { nombre: "Lasagna", precio: "$160", descripcion: "Tradicional con carne y bechamel" }
                    ]
                },
                {
                    nombre: "Pizzas",
                    items: [
                        { nombre: "Margherita", precio: "$150", descripcion: "Tomate, mozzarella y albahaca" },
                        { nombre: "Quattro Formaggi", precio: "$180", descripcion: "Cuatro quesos selectos" },
                        { nombre: "Prosciutto e Funghi", precio: "$170", descripcion: "Jamón y champiñones" }
                    ]
                }
            ]
        }
    }
]; 