document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    // En una implementación real, esto se haría con una API y base de datos
    // Por ahora, usamos credenciales de ejemplo
    if (username === 'admin' && password === 'admin123') {
        // Guardar el estado de inicio de sesión
        localStorage.setItem('adminLoggedIn', 'true');
        // Redirigir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        errorMessage.textContent = 'Usuario o contraseña incorrectos';
    }
}); 