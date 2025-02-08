// Duración de la sesión en minutos
const SESSION_DURATION = 30;

// Verificar si el usuario está autenticado
function checkAuth() {
    const session = JSON.parse(localStorage.getItem('adminSession') || '{}');
    const currentTime = new Date().getTime();
    const currentPath = window.location.pathname;
    
    // Verificar si la sesión es válida y no ha expirado
    const isValidSession = session.timestamp && 
                          session.loggedIn && 
                          (currentTime - session.timestamp) < (SESSION_DURATION * 60 * 1000);
    
    // Si la sesión ha expirado, limpiarla
    if (session.loggedIn && !isValidSession) {
        clearSession();
    }
    
    // Si no hay sesión válida y no está en la página de login, redirigir al login
    if (!isValidSession && !currentPath.includes('login.html')) {
        window.location.replace('login.html');
        return false;
    }
    
    // Si hay sesión válida y está en la página de login, redirigir al dashboard
    if (isValidSession && currentPath.includes('login.html')) {
        window.location.replace('dashboard.html');
        return false;
    }
    
    // Si la sesión es válida, actualizar el timestamp
    if (isValidSession) {
        updateSessionTimestamp();
    }
    
    return isValidSession;
}

// Iniciar sesión
function login(username, password) {
    if (username === 'admin' && password === 'admin123') {
        const session = {
            loggedIn: true,
            timestamp: new Date().getTime(),
            username: username
        };
        localStorage.setItem('adminSession', JSON.stringify(session));
        return true;
    }
    return false;
}

// Actualizar timestamp de la sesión
function updateSessionTimestamp() {
    const session = JSON.parse(localStorage.getItem('adminSession') || '{}');
    session.timestamp = new Date().getTime();
    localStorage.setItem('adminSession', JSON.stringify(session));
}

// Limpiar la sesión
function clearSession() {
    localStorage.removeItem('adminSession');
}

// Función para cerrar sesión
function logout() {
    clearSession();
    window.location.replace('login.html');
}

// Verificar autenticación al cargar la página
document.addEventListener('DOMContentLoaded', checkAuth);

// Verificar autenticación cuando se usa la navegación del historial
window.addEventListener('popstate', checkAuth);

// Prevenir el acceso directo a través de la caché del navegador
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        checkAuth();
    }
});

// Verificar la sesión periódicamente
setInterval(checkAuth, 60000); // Verificar cada minuto 