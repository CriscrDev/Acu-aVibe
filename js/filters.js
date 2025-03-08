// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const tipoFilter = document.getElementById('tipoFilter');
const precioFilter = document.getElementById('precioFilter');
const calificacionFilter = document.getElementById('calificacionFilter');
const placesContainer = document.getElementById('placesContainer');

// Forzar recarga de datos
console.log('Datos cargados:', placesData);

// Crear el modal en el DOM
document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-overlay" id="modalOverlay"></div>
    <div class="modal" id="placeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2></h2>
                <button class="close-modal" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body"></div>
        </div>
    </div>
`);

// Variables para la galería
let currentGalleryImages = [];
let currentImageIndex = 0;

// Función para manejar rutas de imágenes
function getImagePath(path) {
    // Si la ruta es una URL externa, la devolvemos tal cual
    if (path.startsWith('http')) {
        return path;
    }
    
    // Si estamos en GitHub Pages
    if (window.location.hostname === 'criscrdev.github.io') {
        // Si la ruta ya tiene el prefijo de GitHub Pages, la devolvemos tal cual
        if (path.startsWith('/Acu-aVibe/')) {
            return path;
        }
        // Si no, agregamos el prefijo
        return '/Acu-aVibe' + (path.startsWith('/') ? '' : '/') + path.replace(/^\.\.\//, '');
    }
    
    // En desarrollo local, convertimos las rutas absolutas de GitHub Pages a relativas
    if (path.startsWith('/Acu-aVibe/')) {
        return path.replace('/Acu-aVibe/', '../');
    }
    
    // Si es una ruta relativa local, la devolvemos tal cual
    return path;
}

// Función para crear una tarjeta de lugar
function createPlaceCard(place) {
    return `
        <div class="place-card">
            <img src="${getImagePath(place.imagen)}" alt="${place.nombre}" class="place-image" onclick="expandImage(this.src)">
            <div class="place-info">
                <h3>${place.nombre}</h3>
                <p>${place.descripcion}</p>
                <p><strong>Horario:</strong> ${place.horario}</p>
                <p><strong>Ubicación:</strong> ${place.ubicacion}</p>
                <div class="place-meta">
                    <div class="place-rating">
                        ${"★".repeat(Math.floor(place.calificacion))}${place.calificacion % 1 >= 0.5 ? "½" : ""}
                        <span>(${place.calificacion})</span>
                    </div>
                    <div class="place-price">
                        ${"$".repeat(place.precio === "alto" ? 3 : place.precio === "moderado" ? 2 : 1)}
                    </div>
                </div>
                <div class="place-actions">
                    <button class="details-button" onclick="showDetails(${place.id})">
                        <i class="fas fa-info-circle"></i>
                        Ver Detalles
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para mostrar detalles en el modal
function showDetails(placeId) {
    const place = placesData.find(p => p.id === placeId);
    if (!place) return;

    const modal = document.getElementById('placeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${place.nombre}</h2>
            <button class="close-modal" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <div class="modal-layout">
                <div class="modal-left">
                    <div class="modal-image-section">
                        <img src="${getImagePath(place.imagen)}" alt="${place.nombre}" onclick="expandImage('${getImagePath(place.imagen)}')">
                    </div>
                    <div class="modal-description">
                        ${place.descripcion}
                    </div>
                </div>
                <div class="modal-right">
                    <div class="info-group">
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <strong>Horario</strong>
                                <p>${place.horario}</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <strong>Ubicación</strong>
                                <p>${place.ubicacion}</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-star"></i>
                            <div>
                                <strong>Calificación</strong>
                                <p>${place.calificacion} ★</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-dollar-sign"></i>
                            <div>
                                <strong>Precio</strong>
                                <p>${place.precio}</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-phone"></i>
                            <div>
                                <strong>Teléfono</strong>
                                <p>+52 844 123 4567</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ${place.galeria ? `
                <div class="modal-gallery">
                    <h3>Galería de Imágenes</h3>
                    <div class="gallery-grid">
                        ${place.galeria.map((img, index) => `
                            <div class="gallery-item" onclick="expandImage('${getImagePath(img)}')">
                                <img src="${getImagePath(img)}" alt="${place.nombre} - Imagen ${index + 1}">
                                <div class="gallery-overlay">
                                    <i class="fas fa-search-plus"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            ${place.menu ? `
                <div class="menu-section">
                    <h3>Menú</h3>
                    <button class="menu-button" onclick="toggleMenu(${place.id})">
                        Ver Menú
                    </button>
                    <div class="menu-content" id="menu${place.id}" style="display: none;">
                        ${getMenuHTML(place.menu)}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('placeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
}

// Función para expandir imagen
function expandImage(src) {
    const expandedImg = document.createElement('div');
    expandedImg.className = 'expanded-image';
    expandedImg.innerHTML = `
        <div class="expanded-image-container">
            <img src="${src}" alt="Imagen ampliada">
            <button class="close-expanded" onclick="closeExpandedImage(this)">×</button>
        </div>
        <div class="expanded-image-overlay"></div>
    `;
    document.body.appendChild(expandedImg);
    document.body.style.overflow = 'hidden';

    // Cerrar al hacer clic fuera de la imagen
    expandedImg.addEventListener('click', function(e) {
        if (e.target === expandedImg || e.target.classList.contains('expanded-image-overlay')) {
            closeExpandedImage(expandedImg.querySelector('.close-expanded'));
        }
    });

    // Animar la aparición
    setTimeout(() => {
        expandedImg.classList.add('active');
    }, 10);
}

// Función para cerrar imagen expandida
function closeExpandedImage(button) {
    button.parentElement.parentElement.remove();
    document.body.style.overflow = '';
}

// Función para mostrar/ocultar menú
function toggleMenu(placeId) {
    const menuContent = document.getElementById(`menu${placeId}`);
    const button = menuContent.previousElementSibling;
    
    if (menuContent.style.display === 'none') {
        menuContent.style.display = 'block';
        button.textContent = 'Ocultar Menú';
    } else {
        menuContent.style.display = 'none';
        button.textContent = 'Ver Menú';
    }
}

// Función para filtrar lugares
function filterPlaces() {
    const searchTerm = searchInput.value.toLowerCase();
    const tipoValue = tipoFilter.value;
    const precioValue = precioFilter.value;
    const calificacionValue = parseFloat(calificacionFilter.value) || 0;

    const filteredPlaces = placesData.filter(place => {
        const matchesSearch = place.nombre.toLowerCase().includes(searchTerm) ||
                            place.descripcion.toLowerCase().includes(searchTerm);
        const matchesTipo = !tipoValue || place.tipo === tipoValue;
        const matchesPrecio = !precioValue || place.precio === precioValue;
        const matchesCalificacion = place.calificacion >= calificacionValue;

        return matchesSearch && matchesTipo && matchesPrecio && matchesCalificacion;
    });

    displayPlaces(filteredPlaces);
}

// Función para mostrar lugares
function displayPlaces(places) {
    if (places.length === 0) {
        placesContainer.innerHTML = '<p class="no-results">No se encontraron lugares que coincidan con tu búsqueda.</p>';
        return;
    }

    placesContainer.innerHTML = places.map(place => createPlaceCard(place)).join('');
}

// Event listeners
searchInput.addEventListener('input', filterPlaces);
searchButton.addEventListener('click', filterPlaces);
tipoFilter.addEventListener('change', filterPlaces);
precioFilter.addEventListener('change', filterPlaces);
calificacionFilter.addEventListener('change', filterPlaces);

// Cerrar modal al hacer clic fuera
document.getElementById('modalOverlay').addEventListener('click', closeModal);

// Cargar lugares inicialmente
document.addEventListener('DOMContentLoaded', () => {
    displayPlaces(placesData);
});

// Función para mostrar el menú
function getMenuHTML(menu) {
    if (!menu || !menu.categorias) return '';

    return `
        <div class="modal-menu">
            ${menu.categorias.map(categoria => `
                <div class="menu-category">
                    <h3>${categoria.nombre}</h3>
                    <div class="menu-items">
                        ${categoria.items.map(item => `
                            <div class="menu-item">
                                <h4>${item.nombre}</h4>
                                <div class="price">${item.precio}</div>
                                <div class="description">${item.descripcion}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Función para mostrar/ocultar contenedores según el filtro
function toggleContainers(filter) {
    const placesContainer = document.getElementById('placesContainer');
    const eventsContainer = document.getElementById('eventsContainer');

    if (filter === 'eventos') {
        placesContainer.style.display = 'none';
        eventsContainer.style.display = 'block';
        loadEventos(); // Cargar eventos
    } else {
        placesContainer.style.display = 'grid';
        eventsContainer.style.display = 'none';
        filterPlaces(filter); // Filtrar lugares
    }
}

// Función para mostrar lugares
function showPlaces(places) {
    const container = document.getElementById('placesContainer');
    container.innerHTML = places.map(place => createPlaceCard(place)).join('');
}

// Función para buscar lugares
function searchPlaces(searchTerm, filter) {
    const container = document.getElementById('placesContainer');
    container.innerHTML = '';
    
    let allPlaces = [];
    if (typeof placesData !== 'undefined') {
        allPlaces = allPlaces.concat(placesData);
    }
    
    const filteredPlaces = allPlaces.filter(place => {
        const matchesFilter = filter === 'todos' || place.tipo === filter;
        const matchesSearch = place.nombre.toLowerCase().includes(searchTerm) ||
                            place.descripcion.toLowerCase().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });
    
    filteredPlaces.forEach(place => {
        const card = createPlaceCard(place);
        container.appendChild(card);
    });
}

// Función para buscar eventos
function searchEventos(searchTerm) {
    const filteredEventos = eventosData.filter(evento => 
        evento.titulo.toLowerCase().includes(searchTerm) ||
        evento.descripcion.toLowerCase().includes(searchTerm) ||
        evento.lugar.toLowerCase().includes(searchTerm)
    );
    
    const eventsGrid = document.getElementById('eventsGrid');
    eventsGrid.innerHTML = '';
    
    filteredEventos.forEach(evento => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${evento.imagen}" alt="${evento.titulo}">
            </div>
            <div class="event-info">
                <h3>${evento.titulo}</h3>
                <p>${evento.descripcion}</p>
                <div class="event-details">
                    <span><i class="fas fa-calendar"></i> ${formatDate(evento.fecha)}</span>
                    <span><i class="fas fa-clock"></i> ${evento.hora}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${evento.lugar}</span>
                </div>
            </div>
        `;
        
        eventsGrid.appendChild(eventCard);
    });
}

// Hacer las funciones disponibles globalmente
window.expandImage = expandImage;
window.closeExpandedImage = closeExpandedImage;
window.toggleMenu = toggleMenu;
window.showPlaces = showPlaces;
window.searchPlaces = searchPlaces;
window.searchEventos = searchEventos; 