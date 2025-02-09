// Importar lazysizes
import 'lazysizes';

// Variables globales
const API_URL = 'http://localhost:5000/api';

// Exportar funciones para uso global
window.showDetails = showDetails;
window.closeModal = closeModal;

// Función para cargar los lugares desde la API
async function loadPlaces(categoria = '') {
    try {
        const response = await fetch(`${API_URL}/places${categoria ? `?categoria=${categoria}` : ''}`);
        if (!response.ok) throw new Error('Error al cargar los lugares');
        const places = await response.json();
        displayPlaces(places);
    } catch (error) {
        console.error('Error al cargar los lugares:', error);
        displayError('No se pudieron cargar los lugares. Por favor, intenta más tarde.');
    }
}

// Función para mostrar errores
function displayError(message) {
    const container = document.getElementById('placesContainer');
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
}

// Función para mostrar los lugares en la página
function displayPlaces(places) {
    const container = document.getElementById('placesContainer');
    container.innerHTML = '';

    places.forEach(place => {
        const placeCard = createPlaceCard(place);
        container.appendChild(placeCard);
    });
}

// Función para crear una tarjeta de lugar
function createPlaceCard(place) {
    const card = document.createElement('div');
    card.className = 'place-card';
    
    card.innerHTML = `
        <img 
            class="place-image lazyload"
            src="${place.imagen.thumbnail}"
            data-src="${place.imagen.medium}"
            data-srcset="${place.imagen.thumbnail} 400w, ${place.imagen.medium} 800w, ${place.imagen.original} 1200w"
            data-sizes="auto"
            alt="${place.nombre}"
        >
        <div class="place-info">
            <h3>${place.nombre}</h3>
            <p>${place.descripcion}</p>
            <p><strong>Horario:</strong> ${place.horario}</p>
            <p><strong>Ubicación:</strong> ${place.ubicacion}</p>
            <div class="place-meta">
                <div class="place-rating">
                    ${getStarRating(place.calificacion)}
                </div>
                <div class="place-price">
                    ${getPriceSymbols(place.precio)}
                </div>
            </div>
            <div class="place-actions">
                <button class="details-button" onclick="showDetails('${place._id}')">
                    <i class="fas fa-info-circle"></i>
                    Ver Detalles
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Función para generar las estrellas de calificación
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    return `${stars} <span>(${rating})</span>`;
}

// Función para mostrar símbolos de precio
function getPriceSymbols(price) {
    switch (price) {
        case 'economico':
            return '$';
        case 'moderado':
            return '$$';
        case 'alto':
            return '$$$';
        default:
            return '$';
    }
}

// Función para mostrar detalles de un lugar
async function showDetails(id) {
    try {
        const response = await fetch(`${API_URL}/places/${id}`);
        const place = await response.json();
        
        const modal = document.getElementById('placeModal');
        const modalContent = modal.querySelector('.modal-content');
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h2>${place.nombre}</h2>
                <button class="close-modal" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <img 
                    class="modal-image lazyload"
                    src="${place.imagen.thumbnail}"
                    data-src="${place.imagen.original}"
                    alt="${place.nombre}"
                >
                <div class="modal-info">
                    ${getPlaceDetails(place)}
                </div>
                ${place.menu ? getMenuHTML(place.menu) : ''}
            </div>
        `;
        
        modal.classList.add('active');
        document.getElementById('modalOverlay').classList.add('active');
    } catch (error) {
        console.error('Error al cargar los detalles:', error);
    }
}

// Función para generar el HTML de los detalles del lugar
function getPlaceDetails(place) {
    return `
        <div class="info-item">
            <i class="fas fa-tag"></i>
            <span>Tipo: ${place.tipo}</span>
        </div>
        <div class="info-item">
            <i class="fas fa-clock"></i>
            <span>Horario: ${place.horario}</span>
        </div>
        <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>Ubicación: ${place.ubicacion}</span>
        </div>
        <div class="info-item">
            <i class="fas fa-star"></i>
            <span>Calificación: ${place.calificacion}</span>
        </div>
        <div class="info-item">
            <i class="fas fa-dollar-sign"></i>
            <span>Precio: ${getPriceSymbols(place.precio)}</span>
        </div>
        <div class="modal-description">
            <p>${place.descripcion}</p>
        </div>
    `;
}

// Función para generar el HTML del menú
function getMenuHTML(menu) {
    if (!menu.categorias || menu.categorias.length === 0) return '';
    
    let menuHTML = '<div class="menu-container">';
    menuHTML += '<h3><i class="fas fa-utensils"></i> Menú</h3>';
    
    menu.categorias.forEach(categoria => {
        menuHTML += `
            <div class="menu-category">
                <h4>${categoria.nombre}</h4>
                <div class="menu-items">
                    ${categoria.items.map(item => `
                        <div class="menu-item">
                            ${item.imagen ? `
                                <img 
                                    class="menu-item-image lazyload"
                                    src="${item.imagen}"
                                    data-src="${item.imagen}"
                                    alt="${item.nombre}"
                                >
                            ` : ''}
                            <div class="menu-item-header">
                                <span class="menu-item-name">${item.nombre}</span>
                                <span class="menu-item-price">${item.precio}</span>
                            </div>
                            <p class="menu-item-description">${item.descripcion}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    menuHTML += '</div>';
    return menuHTML;
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('placeModal').classList.remove('active');
    document.getElementById('modalOverlay').classList.remove('active');
}

// Inicializar la carga de lugares cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname;
    const categoria = currentPage.split('/').pop().replace('.html', '');
    loadPlaces(categoria);
    
    // Inicializar los filtros
    initializeFilters();
}); 