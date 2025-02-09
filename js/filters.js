// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const tipoFilter = document.getElementById('tipoFilter');
const precioFilter = document.getElementById('precioFilter');
const calificacionFilter = document.getElementById('calificacionFilter');
const placesContainer = document.getElementById('placesContainer');

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

// Función para crear una tarjeta de lugar
function createPlaceCard(place) {
    return `
        <div class="place-card">
            <img src="${place.imagen}" alt="${place.nombre}" class="place-image">
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
    const header = modal.querySelector('.modal-header h2');
    const body = modal.querySelector('.modal-body');

    header.textContent = place.nombre;

    let modalContent = `
        <div class="modal-image-section">
            <img class="modal-image" src="${place.imagen}" alt="${place.nombre}">
        </div>
        <div class="modal-info">
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
                <span>Precio: ${place.precio}</span>
            </div>
            <div class="modal-description">
                <p>${place.descripcion}</p>
            </div>
            ${place.menu ? `
                <div class="modal-menu-button">
                    <button class="menu-button" onclick="showMenu(${place.id})">
                        <i class="fas fa-utensils"></i>
                        Ver Menú
                    </button>
                </div>
            ` : ''}
        </div>
    `;

    body.innerHTML = modalContent;
    modal.classList.add('active');
    document.getElementById('modalOverlay').classList.add('active');
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('placeModal');
    const overlay = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

// Cerrar modal al hacer clic en el overlay
document.getElementById('modalOverlay').addEventListener('click', closeModal);

// Función para mostrar el menú
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

// Función para mostrar el menú
function showMenu(placeId) {
    const place = placesData.find(p => p.id === placeId);
    if (!place || !place.menu) return;

    const modal = document.getElementById('placeModal');
    const header = modal.querySelector('.modal-header h2');
    const body = modal.querySelector('.modal-body');

    header.textContent = `Menú - ${place.nombre}`;

    body.innerHTML = getMenuHTML(place.menu);
    modal.classList.add('active');
    document.getElementById('modalOverlay').classList.add('active');
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

// Cargar lugares inicialmente
document.addEventListener('DOMContentLoaded', () => {
    displayPlaces(placesData);
});

// Función para expandir una imagen
function expandImage(imgSrc, imgAlt) {
    const expandedDiv = document.createElement('div');
    expandedDiv.className = 'expanded-image';
    expandedDiv.innerHTML = `
        <div class="expanded-image-content">
            <img src="${imgSrc}" alt="${imgAlt}">
            <button class="close-expanded" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    document.body.appendChild(expandedDiv);
    
    expandedDiv.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

// Hacer las funciones disponibles globalmente
window.expandImage = expandImage;
window.changeImage = changeImage;
window.showMenu = showMenu; 