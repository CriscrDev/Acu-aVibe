// Elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const tipoFilter = document.getElementById('tipoFilter');
const precioFilter = document.getElementById('precioFilter');
const calificacionFilter = document.getElementById('calificacionFilter');
const placesContainer = document.getElementById('placesContainer');

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
            </div>
        </div>
    `;
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