// Datos de cafeterías
const placesData = [
    {
        id: 1,
        nombre: "Kappel",
        tipo: "cafe_especialidad",
        descripcion: "La Casa del Café",
        imagen: "../images/places/Kappel.JPG",
        galeria: [
            "../images/places/Kappel.JPG",
            "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.6,
        precio: "moderado",
        horario: "07:00 - 21:00",
        ubicacion: "Heroes de Nacozari 605, Benito Juarez, Acuña, Mexico",
        menu: {
            categorias: [
                {
                    nombre: "Café Caliente",
                    items: [
                        { nombre: "Espresso", precio: "$35", descripcion: "Shot de café puro" },
                        { nombre: "Cappuccino", precio: "$45", descripcion: "Espresso con leche espumada" },
                        { nombre: "Latte", precio: "$40", descripcion: "Café con leche cremosa" }
                    ]
                },
                {
                    nombre: "Café Frío",
                    items: [
                        { nombre: "Frappuccino", precio: "$55", descripcion: "Café helado con crema" },
                        { nombre: "Cold Brew", precio: "$50", descripcion: "Café extraído en frío" },
                        { nombre: "Affogato", precio: "$60", descripcion: "Espresso con helado" }
                    ]
                },
                {
                    nombre: "Postres",
                    items: [
                        { nombre: "Croissant", precio: "$35", descripcion: "Recién horneado" },
                        { nombre: "Cheesecake", precio: "$45", descripcion: "Con frutos rojos" },
                        { nombre: "Galletas", precio: "$25", descripcion: "Variedad del día" }
                    ]
                }
            ]
        }
    },
    {
        id: 2,
        nombre: "La Dulce Vida",
        tipo: "pasteleria",
        descripcion: "Pasteles artesanales y café gourmet",
        imagen: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1559620192-032c4bc4674e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1455373260793-3d6b701ea76b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514509152927-e7d9df03f9a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.8,
        precio: "moderado",
        horario: "08:00 - 20:00",
        ubicacion: "Zona Norte",
        menu: {
            categorias: [
                {
                    nombre: "Pasteles",
                    items: [
                        { nombre: "Pastel de Chocolate", precio: "$45", descripcion: "Con ganache de chocolate" },
                        { nombre: "Tres Leches", precio: "$40", descripcion: "Tradicional" },
                        { nombre: "Red Velvet", precio: "$50", descripcion: "Con frosting de queso crema" }
                    ]
                },
                {
                    nombre: "Bebidas",
                    items: [
                        { nombre: "Café Americano", precio: "$35", descripcion: "Café de grano" },
                        { nombre: "Té Chai", precio: "$40", descripcion: "Con especias" },
                        { nombre: "Chocolate Caliente", precio: "$45", descripcion: "Con malvaviscos" }
                    ]
                }
            ]
        }
    },
    {
        id: 3,
        nombre: "Brunch & Coffee",
        tipo: "brunch",
        descripcion: "El mejor brunch de la ciudad con café de primera",
        imagen: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1550507992-eb63ffee0847?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1512034400317-de97d7d6c3ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.5,
        precio: "alto",
        horario: "08:00 - 16:00",
        ubicacion: "Zona Residencial",
        menu: {
            categorias: [
                {
                    nombre: "Brunch",
                    items: [
                        { nombre: "Huevos Benedictinos", precio: "$120", descripcion: "Con salmón ahumado" },
                        { nombre: "Avocado Toast", precio: "$95", descripcion: "Pan artesanal con aguacate" },
                        { nombre: "Pancakes", precio: "$85", descripcion: "Con frutas y miel" }
                    ]
                },
                {
                    nombre: "Bebidas",
                    items: [
                        { nombre: "Mimosa", precio: "$75", descripcion: "Jugo de naranja con espumoso" },
                        { nombre: "Smoothie Verde", precio: "$65", descripcion: "Con espinacas y frutas" },
                        { nombre: "Café de Especialidad", precio: "$55", descripcion: "Método V60" }
                    ]
                }
            ]
        }
    },
    {
        id: 4,
        nombre: "Café Tradicional",
        tipo: "cafe_tradicional",
        descripcion: "Café de olla y pan dulce tradicional",
        imagen: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        galeria: [
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        calificacion: 4.3,
        precio: "economico",
        horario: "06:00 - 22:00",
        ubicacion: "Centro",
        menu: {
            categorias: [
                {
                    nombre: "Café",
                    items: [
                        { nombre: "Café de Olla", precio: "$25", descripcion: "Con canela y piloncillo" },
                        { nombre: "Café con Leche", precio: "$30", descripcion: "Café tradicional" },
                        { nombre: "Chocolate Abuelita", precio: "$35", descripcion: "Chocolate caliente tradicional" }
                    ]
                },
                {
                    nombre: "Pan Dulce",
                    items: [
                        { nombre: "Concha", precio: "$15", descripcion: "Vainilla o chocolate" },
                        { nombre: "Oreja", precio: "$18", descripcion: "Hojaldre caramelizado" },
                        { nombre: "Mantecada", precio: "$20", descripcion: "Pan esponjoso" }
                    ]
                }
            ]
        }
    }
]; 