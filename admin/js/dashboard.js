// Almacenamiento local para los comercios
let commerces = JSON.parse(localStorage.getItem('commerces')) || [];

// Mostrar/ocultar formulario
function showAddCommerceForm() {
    document.getElementById('commerceForm').style.display = 'block';
}

function hideAddCommerceForm() {
    document.getElementById('commerceForm').style.display = 'none';
    document.getElementById('addCommerceForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
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

// Manejar envío del formulario
document.getElementById('addCommerceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const commerce = {
        id: Date.now(), // ID único basado en timestamp
        nombre: formData.get('nombre'),
        categoria: formData.get('categoria'),
        tipo: formData.get('tipo'),
        descripcion: formData.get('descripcion'),
        precio: formData.get('precio'),
        horario: formData.get('horario'),
        ubicacion: formData.get('ubicacion'),
        calificacion: 0, // Calificación inicial
        imagen: document.getElementById('imagePreview').src
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

// Renderizar la tabla de comercios
function renderCommerces() {
    const tableBody = document.getElementById('commerceTableBody');
    tableBody.innerHTML = '';
    
    commerces.forEach(commerce => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${commerce.nombre}</td>
            <td>${commerce.categoria}</td>
            <td>${commerce.tipo}</td>
            <td>${commerce.ubicacion}</td>
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
    
    // Rellenar el formulario con los datos existentes
    document.getElementById('nombre').value = commerce.nombre;
    document.getElementById('categoria').value = commerce.categoria;
    document.getElementById('tipo').value = commerce.tipo;
    document.getElementById('descripcion').value = commerce.descripcion;
    document.getElementById('precio').value = commerce.precio;
    document.getElementById('horario').value = commerce.horario;
    document.getElementById('ubicacion').value = commerce.ubicacion;
    
    // Mostrar la imagen existente
    const preview = document.getElementById('imagePreview');
    preview.src = commerce.imagen;
    preview.style.display = 'block';
    
    // Mostrar el formulario
    showAddCommerceForm();
    
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
        commerce.imagen = document.getElementById('imagePreview').src;
        
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