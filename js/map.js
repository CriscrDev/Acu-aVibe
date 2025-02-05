// Coordenadas de Ciudad Acuña
const ACUNA_CENTER = { lat: 29.3244, lng: -100.9319 };

// Datos de ejemplo de lugares (en una aplicación real, estos vendrían de una base de datos)
const places = [
    {
        name: "El Rincón Mexicano",
        category: "restaurantes",
        position: { lat: 29.3230, lng: -100.9320 },
        icon: "fas fa-utensils",
        description: "Auténtica cocina mexicana",
        horario: "11:00 - 23:00",
        rating: 4.5
    },
    {
        name: "Café del Arte",
        category: "cafeterias",
        position: { lat: 29.3250, lng: -100.9310 },
        icon: "fas fa-coffee",
        description: "Café de especialidad y ambiente artístico",
        horario: "07:00 - 21:00",
        rating: 4.6
    },
    {
        name: "La Luna Bar",
        category: "antros",
        position: { lat: 29.3260, lng: -100.9330 },
        icon: "fas fa-cocktail",
        description: "Bar con música en vivo",
        horario: "18:00 - 02:00",
        rating: 4.4
    },
    {
        name: "Plaza Principal",
        category: "lugares",
        position: { lat: 29.3240, lng: -100.9315 },
        icon: "fas fa-map-marker-alt",
        description: "Centro histórico de la ciudad",
        horario: "24 horas",
        rating: 4.8
    }
];

let map;
let markers = [];
let currentInfoWindow = null;

// Personalización del estilo del mapa
const mapStyles = [
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            { "color": "#a0d6d1" },
            { "lightness": 35 }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            { "color": "#f5f5f5" }
        ]
    }
];

// Inicializar el mapa
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: ACUNA_CENTER,
        zoom: 14,
        styles: mapStyles,
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true
    });

    // Agregar marcadores iniciales
    showMarkers('todos');

    // Agregar listeners a los filtros
    document.querySelectorAll('.map-filter').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.map-filter').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            showMarkers(this.dataset.category);
        });
    });
}

// Mostrar marcadores según la categoría
function showMarkers(category) {
    clearMarkers();

    const filteredPlaces = category === 'todos' 
        ? places 
        : places.filter(place => place.category === category);

    filteredPlaces.forEach(place => {
        // Crear icono personalizado
        const markerIcon = {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: getCategoryColor(place.category),
            fillOpacity: 0.9,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 10
        };

        const marker = new google.maps.Marker({
            position: place.position,
            map: map,
            title: place.name,
            animation: google.maps.Animation.DROP,
            icon: markerIcon
        });

        // Crear ventana de información
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="info-window">
                    <h3><i class="${place.icon}"></i> ${place.name}</h3>
                    <p>${place.description}</p>
                    <p><strong>Horario:</strong> ${place.horario}</p>
                    <p><strong>Calificación:</strong> ${getStars(place.rating)}</p>
                </div>
            `
        });

        // Agregar evento click al marcador
        marker.addListener('click', () => {
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }
            infoWindow.open(map, marker);
            currentInfoWindow = infoWindow;
            
            // Animar el marcador al hacer clic
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 750);
        });

        markers.push(marker);
    });

    // Ajustar el zoom para mostrar todos los marcadores
    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
    }
}

// Obtener el color según la categoría
function getCategoryColor(category) {
    const colors = {
        antros: '#3498db',
        restaurantes: '#e74c3c',
        cafeterias: '#9b59b6',
        tiendas: '#1abc9c',
        lugares: '#e67e22',
        locales: '#2ecc71'
    };
    return colors[category] || '#7f8c8d';
}

// Generar estrellas para la calificación
function getStars(rating) {
    const fullStar = '<i class="fas fa-star" style="color: #f1c40f;"></i>';
    const halfStar = '<i class="fas fa-star-half-alt" style="color: #f1c40f;"></i>';
    const emptyStar = '<i class="far fa-star" style="color: #f1c40f;"></i>';
    
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += fullStar;
        } else if (i === fullStars && hasHalfStar) {
            stars += halfStar;
        } else {
            stars += emptyStar;
        }
    }
    return stars;
}

// Limpiar todos los marcadores del mapa
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    if (currentInfoWindow) {
        currentInfoWindow.close();
    }
}

// Cargar el mapa cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    // El mapa se inicializará cuando Google Maps API esté cargada
    if (typeof google === 'undefined') {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    } else {
        initMap();
    }
}); 