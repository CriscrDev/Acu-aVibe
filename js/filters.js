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
            <img src="${place.imagen}" alt="${place.nombre}" class="modal-image" onclick="expandImage('${place.imagen}', '${place.nombre}')">
        </div>

        <div class="modal-description">
            <p>${place.descripcion}</p>
        </div>

        <div class="info-section">
            <div class="info-row">
                <div class="info-item">
                    <i class="fas fa-store"></i>
                    <span><strong>Tipo:</strong> ${place.tipo.charAt(0).toUpperCase() + place.tipo.slice(1)}</span>
                </div>
                <div class="info-item contact-item">
                    <i class="fas fa-phone"></i>
                    <span><strong>Reservaciones:</strong> +52 877 123 4567</span>
                </div>
            </div>

            <div class="info-row">
                <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <span><strong>Horario:</strong> ${place.horario}</span>
                </div>
                <div class="info-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span><strong>Precio:</strong> ${place.precio.charAt(0).toUpperCase() + place.precio.slice(1)}</span>
                </div>
            </div>

            <div class="info-row">
                <div class="info-item">
                    <i class="fas fa-star"></i>
                    <span><strong>Calificación:</strong> ${place.calificacion} ★</span>
                </div>
                <div class="info-item location-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span><strong>Ubicación:</strong> ${place.ubicacion}</span>
                </div>
            </div>
        </div>

        ${place.menu ? `
            <div class="menu-button-container">
                <button class="menu-button" onclick="toggleBotellas(${placeId})">
                    <i class="fas fa-wine-bottle"></i> Ver Botellas
                </button>
            </div>
            <div class="botellas-menu" id="botellasMenu${placeId}" style="display: none;">
                ${getBottlesHTML(place.menu)}
            </div>
        ` : ''}
    `;

    // Agregar galería si existe
    if (place.galeria && place.galeria.length > 0) {
        modalContent += `
            <div class="gallery-grid">
                ${place.galeria.map((img, index) => `
                    <div class="gallery-item" onclick="expandImage('${img}', '${place.nombre} - Imagen ${index + 1}')">
                        <img src="${img}" alt="${place.nombre} - Imagen ${index + 1}">
                    </div>
                `).join('')}
            </div>`;
    }

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
    expandedDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = imgAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
    `;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="fas fa-times"></i>';
    closeButton.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
    `;

    expandedDiv.appendChild(img);
    expandedDiv.appendChild(closeButton);
    document.body.appendChild(expandedDiv);
    document.body.style.overflow = 'hidden';

    function close() {
        expandedDiv.remove();
        document.body.style.overflow = '';
    }

    closeButton.onclick = close;
    expandedDiv.onclick = (e) => {
        if (e.target === expandedDiv) close();
    };
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') close();
    });
}

// Función para abrir la galería
function openGallery(placeId, initialIndex = 0) {
    const place = placesData.find(p => p.id === placeId);
    if (!place || !place.galeria) return;

    currentGalleryImages = place.galeria;
    currentImageIndex = initialIndex;

    const galleryModal = document.createElement('div');
    galleryModal.className = 'expanded-gallery';
    galleryModal.innerHTML = `
        <div class="expanded-image-container">
            <img src="${currentGalleryImages[currentImageIndex]}" alt="${place.nombre}">
            <button class="gallery-close" onclick="closeGallery()">×</button>
            <div class="gallery-nav">
                <button onclick="changeImage(-1)"><i class="fas fa-chevron-left"></i></button>
                <button onclick="changeImage(1)"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;

    // Agregar manejador de eventos para cerrar con Escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeGallery();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    // Agregar manejador de clic para cerrar al hacer clic fuera
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeGallery();
        }
    });

    document.body.appendChild(galleryModal);
    document.body.style.overflow = 'hidden';
}

// Función para cambiar la imagen de la galería
function changeImage(direction) {
    if (!currentGalleryImages.length) return;
    
    currentImageIndex = (currentImageIndex + direction + currentGalleryImages.length) % currentGalleryImages.length;
    const galleryImage = document.querySelector('.expanded-image-container img');
    
    if (galleryImage) {
        // Precargar la imagen antes de mostrarla
        const newImage = new Image();
        newImage.onload = () => {
            galleryImage.src = newImage.src;
        };
        newImage.src = currentGalleryImages[currentImageIndex];
    }
}

// Función para cerrar la galería
function closeGallery() {
    const gallery = document.querySelector('.expanded-gallery');
    if (gallery) {
        gallery.remove();
        document.body.style.overflow = '';
        currentGalleryImages = [];
        currentImageIndex = 0;
    }
}

// Función para obtener el HTML de las botellas
function getBottlesHTML(menu) {
    const botellasCategoria = menu.categorias.find(cat => cat.nombre === "Botellas");
    if (!botellasCategoria) return '';

    return `
        <div class="botellas-grid">
            ${botellasCategoria.items.map(item => `
                <div class="botella-item">
                    <h4>${item.nombre}</h4>
                    <div class="price">${item.precio}</div>
                    <div class="description">${item.descripcion}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Función para mostrar/ocultar botellas
function toggleBotellas(placeId) {
    const botellasMenu = document.getElementById('botellasMenu' + placeId);
    const menuButton = document.querySelector('.menu-button');
    
    if (botellasMenu.style.display === 'none') {
        botellasMenu.style.display = 'block';
        menuButton.innerHTML = '<i class="fas fa-times"></i> Cerrar';
    } else {
        botellasMenu.style.display = 'none';
        menuButton.innerHTML = '<i class="fas fa-wine-bottle"></i> Ver Botellas';
    }
}

// Hacer las funciones disponibles globalmente
window.expandImage = expandImage;
window.changeImage = changeImage;
window.showMenu = showMenu;
window.openGallery = openGallery;
window.closeGallery = closeGallery;
window.toggleBotellas = toggleBotellas; 