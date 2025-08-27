// Expresión regular para validar email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Elementos del DOM
const form = document.getElementById('registroForm');
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const edadInput = document.getElementById('edad');
const correoInput = document.getElementById('correo');

// Elementos de error
const nombreError = document.getElementById('nombreError');
const apellidoError = document.getElementById('apellidoError');
const edadError = document.getElementById('edadError');
const correoError = document.getElementById('correoError');

// Mensaje de éxito
const successMessage = document.getElementById('successMessage');

// Función para mostrar error
function mostrarError(input, errorElement, mensaje) {
    input.classList.add('error');
    input.classList.remove('valid');
    errorElement.textContent = mensaje;
}

// Función para mostrar éxito
function mostrarExito(input, errorElement) {
    input.classList.add('valid');
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Validación del nombre
function validarNombre() {
    const nombre = nombreInput.value.trim();
    
    if (nombre === '') {
        mostrarError(nombreInput, nombreError, 'El nombre es obligatorio');
        return false;
    }
    
    mostrarExito(nombreInput, nombreError);
    return true;
}

// Validación del apellido
function validarApellido() {
    const apellido = apellidoInput.value.trim();
    
    if (apellido === '') {
        mostrarError(apellidoInput, apellidoError, 'El apellido es obligatorio');
        return false;
    }
    
    if (apellido.length < 3) {
        mostrarError(apellidoInput, apellidoError, 'El apellido debe tener al menos 3 caracteres');
        return false;
    }
    
    mostrarExito(apellidoInput, apellidoError);
    return true;
}

// Validación de la edad
function validarEdad() {
    const edad = parseInt(edadInput.value);
    
    if (isNaN(edad) || edadInput.value.trim() === '') {
        mostrarError(edadInput, edadError, 'La edad es obligatoria');
        return false;
    }
    
    if (edad < 18) {
        mostrarError(edadInput, edadError, 'Debes ser mayor de edad (18 años o más)');
        return false;
    }
    
    if (edad > 120) {
        mostrarError(edadInput, edadError, 'Por favor ingresa una edad válida');
        return false;
    }
    
    mostrarExito(edadInput, edadError);
    return true;
}

// Validación del correo
function validarCorreo() {
    const correo = correoInput.value.trim();
    
    if (correo === '') {
        mostrarError(correoInput, correoError, 'El correo electrónico es obligatorio');
        return false;
    }
    
    if (!emailRegex.test(correo)) {
        mostrarError(correoInput, correoError, 'Por favor ingresa un correo electrónico válido');
        return false;
    }
    
    mostrarExito(correoInput, correoError);
    return true;
}

// Validación en tiempo real
nombreInput.addEventListener('blur', validarNombre);
nombreInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        validarNombre();
    }
});

apellidoInput.addEventListener('blur', validarApellido);
apellidoInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        validarApellido();
    }
});

edadInput.addEventListener('blur', validarEdad);
edadInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        validarEdad();
    }
});

correoInput.addEventListener('blur', validarCorreo);
correoInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        validarCorreo();
    }
});

// Validación del formulario completo
function validarFormulario() {
    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const edadValida = validarEdad();
    const correoValido = validarCorreo();
    
    return nombreValido && apellidoValido && edadValida && correoValido;
}

// Evento de envío del formulario
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ocultar mensaje de éxito previo
    successMessage.style.display = 'none';
    
    if (validarFormulario()) {
        // Simular envío exitoso
        successMessage.style.display = 'block';
        
        // Opcional: limpiar el formulario
        setTimeout(() => {
            form.reset();
            // Limpiar clases de validación
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.classList.remove('valid', 'error');
            });
            // Limpiar mensajes de error
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.textContent = '';
            });
            successMessage.style.display = 'none';
        }, 3000);
    } else {
        // Hacer scroll al primer campo con error
        const primerError = form.querySelector('.error');
        if (primerError) {
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            primerError.focus();
        }
    }
});

// Prevenir envío con Enter en campos individuales
form.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.preventDefault();
        
        // Mover al siguiente campo o enviar si es el último
        const inputs = Array.from(form.querySelectorAll('input'));
        const currentIndex = inputs.indexOf(e.target);
        
        if (currentIndex < inputs.length - 1) {
            inputs[currentIndex + 1].focus();
        } else {
            form.querySelector('button[type="submit"]').click();
        }
    }
});