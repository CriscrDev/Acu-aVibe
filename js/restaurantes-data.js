// Datos de ejemplo para restaurantes
const placesData = [
    {
        id: 1,
        nombre: "El Rincón Mexicano",
        tipo: "mexicana",
        descripcion: "Auténtica cocina mexicana con los mejores platillos tradicionales",
        imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
                        { nombre: "Queso Fundido", precio: "$95", descripcion: "Con chorizo o champiñones" }
                    ]
                },
                {
                    nombre: "Platos Fuertes",
                    items: [
                        { nombre: "Enchiladas Verdes", precio: "$120", descripcion: "Rellenas de pollo con salsa verde" },
                        { nombre: "Mole Poblano", precio: "$140", descripcion: "Pechuga de pollo bañada en mole" }
                    ]
                },
                {
                    nombre: "Postres",
                    items: [
                        { nombre: "Flan Napolitano", precio: "$45", descripcion: "Casero con caramelo" },
                        { nombre: "Churros", precio: "$40", descripcion: "Con azúcar y canela" }
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
                        { nombre: "Tostadas de Atún", precio: "$90", descripcion: "Atún fresco marinado" }
                    ]
                },
                {
                    nombre: "Especialidades",
                    items: [
                        { nombre: "Pescado a la Veracruzana", precio: "$180", descripcion: "Pescado del día en salsa de tomate y aceitunas" },
                        { nombre: "Camarones al Mojo", precio: "$210", descripcion: "Camarones al mojo de ajo" }
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
        calificacion: 4.8,
        precio: "alto",
        horario: "13:00 - 23:00",
        ubicacion: "Centro Comercial"
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
        ubicacion: "Zona Sur"
    }
]; 