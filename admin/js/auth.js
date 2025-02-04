// Verificar si el usuario está autenticado
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn && window.location.pathname !== '/admin/login.html') {
        window.location.href = 'login.html';
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'login.html';
}

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', checkAuth); 