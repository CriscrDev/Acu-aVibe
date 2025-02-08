// Verificar autenticación al inicio
const session = JSON.parse(localStorage.getItem('adminSession') || '{}');
const currentTime = new Date().getTime();

if (!session.loggedIn || 
    !session.timestamp || 
    (currentTime - session.timestamp) >= (30 * 60 * 1000)) {
    window.location.replace('login.html');
}

// Configuración de tipos por categoría
const tiposPorCategoria = {
    antros: ['bar', 'antro', 'cantina'],
    restaurantes: ['mexicana', 'internacional', 'mariscos', 'carnes', 'italiana'],
    cafeterias: ['cafe_tradicional', 'cafe_especialidad', 'pasteleria', 'brunch'],
    tiendas: ['ropa', 'electronica', 'artesanias', 'deportes', 'hogar'],
    lugares: ['historico', 'natural', 'cultural', 'recreativo', 'religioso'],
    locales: ['comida', 'ropa', 'servicios', 'entretenimiento']
};

// Almacenamiento local para los comercios
let commerces = JSON.parse(localStorage.getItem('commerces')) || [];

// Actualizar opciones de tipo según la categoría seleccionada
function updateTipoOptions() {
    const categoria = document.getElementById('categoria').value;
    const tipoSelect = document.getElementById('tipo');
    tipoSelect.innerHTML = '<option value="">Seleccionar tipo</option>';
    
    if (categoria && tiposPorCategoria[categoria]) {
        tiposPorCategoria[categoria].forEach(tipo => {
            const option = document.createElement('option');
            option.value = tipo;
            option.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1).replace('_', ' ');
            tipoSelect.appendChild(option);
        });
    }
}

// Mostrar/ocultar formulario
function showAddCommerceForm() {
    document.getElementById('commerceForm').style.display = 'block';
    document.getElementById('menuCategories').innerHTML = '';
    addMenuCategory(); // Agregar una categoría inicial al menú
}

function hideAddCommerceForm() {
    document.getElementById('commerceForm').style.display = 'none';
    document.getElementById('addCommerceForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('menuCategories').innerHTML = '';
}

// Agregar categoría al menú
function addMenuCategory() {
    const menuCategories = document.getElementById('menuCategories');
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'menu-category';
    
    categoryDiv.innerHTML = `
        <div class="category-header">
            <input type="text" placeholder="Nombre de la categoría" class="category-name" required>
            <button type="button" class="remove-category" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="menu-items">
            <div class="menu-item">
                <input type="text" placeholder="Nombre del item" class="item-name" required>
                <input type="text" placeholder="Precio" class="item-price" required>
                <input type="text" placeholder="Descripción" class="item-description" required>
                <button type="button" class="remove-item" onclick="this.parentElement.remove()">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
        <button type="button" class="add-item" onclick="addMenuItem(this.parentElement)">
            <i class="fas fa-plus"></i> Agregar Item
        </button>
    `;
    
    menuCategories.appendChild(categoryDiv);
}

// Agregar item al menú
function addMenuItem(categoryDiv) {
    const menuItems = categoryDiv.querySelector('.menu-items');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';
    
    itemDiv.innerHTML = `
        <input type="text" placeholder="Nombre del item" class="item-name" required>
        <input type="text" placeholder="Precio" class="item-price" required>
        <input type="text" placeholder="Descripción" class="item-description" required>
        <button type="button" class="remove-item" onclick="this.parentElement.remove()">
            <i class="fas fa-minus"></i>
        </button>
    `;
    
    menuItems.appendChild(itemDiv);
}

// Preview de imagen
document.getElementById('imagen').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const preview = document.getElementById('imagePreview');
        preview.src = e.target.result;
        preview.style.display = 'block';
    }
    
    if (file) {
        reader.readAsDataURL(file);
    }
});

// Recopilar datos del menú
function getMenuData() {
    const menuCategories = document.getElementById('menuCategories');
    const categories = menuCategories.getElementsByClassName('menu-category');
    const menuData = {
        categorias: []
    };
    
    Array.from(categories).forEach(category => {
        const categoryName = category.querySelector('.category-name').value;
        const items = category.getElementsByClassName('menu-item');
        const categoryItems = [];
        
        Array.from(items).forEach(item => {
            categoryItems.push({
                nombre: item.querySelector('.item-name').value,
                precio: item.querySelector('.item-price').value,
                descripcion: item.querySelector('.item-description').value
            });
        });
        
        menuData.categorias.push({
            nombre: categoryName,
            items: categoryItems
        });
    });
    
    return menuData;
}

// Manejar envío del formulario
document.getElementById('addCommerceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const commerce = {
        id: Date.now(),
        nombre: formData.get('nombre'),
        categoria: formData.get('categoria'),
        tipo: formData.get('tipo'),
        descripcion: formData.get('descripcion'),
        precio: formData.get('precio'),
        horario: formData.get('horario'),
        ubicacion: formData.get('ubicacion'),
        calificacion: parseFloat(formData.get('calificacion')),
        imagen: document.getElementById('imagePreview').src,
        menu: getMenuData()
    };
    
    // Agregar al array de comercios
    commerces.push(commerce);
    // Guardar en localStorage
    localStorage.setItem('commerces', JSON.stringify(commerces));
    
    // Actualizar la tabla
    renderCommerces();
    // Ocultar el formulario
    hideAddCommerceForm();
});

// Filtrar comercios
function filterCommerces() {
    const categoria = document.getElementById('filterCategoria').value;
    const searchTerm = document.getElementById('searchCommerce').value.toLowerCase();
    
    const filteredCommerces = commerces.filter(commerce => {
        const matchesCategoria = !categoria || commerce.categoria === categoria;
        const matchesSearch = commerce.nombre.toLowerCase().includes(searchTerm) ||
                            commerce.descripcion.toLowerCase().includes(searchTerm);
        return matchesCategoria && matchesSearch;
    });
    
    renderCommerces(filteredCommerces);
}

// Renderizar la tabla de comercios
function renderCommerces(commercesToShow = commerces) {
    const tableBody = document.getElementById('commerceTableBody');
    tableBody.innerHTML = '';
    
    commercesToShow.forEach(commerce => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${commerce.nombre}</td>
            <td>${commerce.categoria}</td>
            <td>${commerce.tipo}</td>
            <td>${commerce.ubicacion}</td>
            <td>${commerce.calificacion} ★</td>
            <td>${commerce.precio}</td>
            <td class="action-buttons">
                <button onclick="editCommerce(${commerce.id})" class="edit-button">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteCommerce(${commerce.id})" class="delete-button">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Editar comercio
function editCommerce(id) {
    const commerce = commerces.find(c => c.id === id);
    if (!commerce) return;
    
    showAddCommerceForm();
    
    // Rellenar el formulario con los datos existentes
    document.getElementById('nombre').value = commerce.nombre;
    document.getElementById('categoria').value = commerce.categoria;
    updateTipoOptions();
    document.getElementById('tipo').value = commerce.tipo;
    document.getElementById('descripcion').value = commerce.descripcion;
    document.getElementById('precio').value = commerce.precio;
    document.getElementById('horario').value = commerce.horario;
    document.getElementById('ubicacion').value = commerce.ubicacion;
    document.getElementById('calificacion').value = commerce.calificacion;
    
    // Mostrar la imagen existente
    const preview = document.getElementById('imagePreview');
    preview.src = commerce.imagen;
    preview.style.display = 'block';
    
    // Cargar menú existente
    if (commerce.menu && commerce.menu.categorias) {
        document.getElementById('menuCategories').innerHTML = '';
        commerce.menu.categorias.forEach(categoria => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'menu-category';
            
            let itemsHtml = '';
            categoria.items.forEach(item => {
                itemsHtml += `
                    <div class="menu-item">
                        <input type="text" placeholder="Nombre del item" class="item-name" value="${item.nombre}" required>
                        <input type="text" placeholder="Precio" class="item-price" value="${item.precio}" required>
                        <input type="text" placeholder="Descripción" class="item-description" value="${item.descripcion}" required>
                        <button type="button" class="remove-item" onclick="this.parentElement.remove()">
                            <i class="fas fa-minus"></i>
                        </button>
                    </div>
                `;
            });
            
            categoryDiv.innerHTML = `
                <div class="category-header">
                    <input type="text" placeholder="Nombre de la categoría" class="category-name" value="${categoria.nombre}" required>
                    <button type="button" class="remove-category" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="menu-items">
                    ${itemsHtml}
                </div>
                <button type="button" class="add-item" onclick="addMenuItem(this.parentElement)">
                    <i class="fas fa-plus"></i> Agregar Item
                </button>
            `;
            
            document.getElementById('menuCategories').appendChild(categoryDiv);
        });
    }
    
    // Actualizar el manejador del formulario para edición
    const form = document.getElementById('addCommerceForm');
    form.onsubmit = function(e) {
        e.preventDefault();
        
        // Actualizar los datos del comercio
        commerce.nombre = document.getElementById('nombre').value;
        commerce.categoria = document.getElementById('categoria').value;
        commerce.tipo = document.getElementById('tipo').value;
        commerce.descripcion = document.getElementById('descripcion').value;
        commerce.precio = document.getElementById('precio').value;
        commerce.horario = document.getElementById('horario').value;
        commerce.ubicacion = document.getElementById('ubicacion').value;
        commerce.calificacion = parseFloat(document.getElementById('calificacion').value);
        commerce.imagen = document.getElementById('imagePreview').src;
        commerce.menu = getMenuData();
        
        // Actualizar localStorage
        localStorage.setItem('commerces', JSON.stringify(commerces));
        
        // Actualizar la tabla y resetear el formulario
        renderCommerces();
        hideAddCommerceForm();
        
        // Restaurar el manejador original del formulario
        form.onsubmit = null;
    };
}

// Eliminar comercio
function deleteCommerce(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este comercio?')) {
        commerces = commerces.filter(c => c.id !== id);
        localStorage.setItem('commerces', JSON.stringify(commerces));
        renderCommerces();
    }
}

// Cambiar entre secciones
function showSection(sectionId) {
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Cargar los comercios al iniciar
document.addEventListener('DOMContentLoaded', function() {
    renderCommerces();
}); 