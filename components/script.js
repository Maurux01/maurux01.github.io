// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Funciones de utilidad
    const $ = selector => document.querySelector(selector);
    const $$ = selector => document.querySelectorAll(selector);

    // Funciones para manipulación del DOM
    function crearElemento(tag, clases = [], texto = '') {
        const elemento = document.createElement(tag);
        if (clases.length) elemento.classList.add(...clases);
        if (texto) elemento.textContent = texto;
        return elemento;
    }

    // Manejador de formularios
    function manejarFormulario(evento) {
        evento.preventDefault();
        const formulario = evento.target;
        const datos = new FormData(formulario);
        
        // Aquí puedes procesar los datos del formulario
        console.log(Object.fromEntries(datos));
    }

    // Funciones para peticiones HTTP
    async function obtenerDatos(url) {
        try {
            const respuesta = await fetch(url);
            if (!respuesta.ok) throw new Error('Error en la petición');
            return await respuesta.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    // Funciones para almacenamiento local
    const almacenamiento = {
        guardar(clave, valor) {
            localStorage.setItem(clave, JSON.stringify(valor));
        },
        obtener(clave) {
            const valor = localStorage.getItem(clave);
            return valor ? JSON.parse(valor) : null;
        },
        eliminar(clave) {
            localStorage.removeItem(clave);
        }
    };

    // Funciones para validación
    const validadores = {
        email(valor) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(valor);
        },
        requerido(valor) {
            return valor.trim() !== '';
        },
        longitud(valor, min, max) {
            const largo = valor.length;
            return largo >= min && largo <= max;
        }
    };

    // Manejadores de eventos
    function inicializarEventos() {
        // Ejemplo de manejo de click
        $$('.boton').forEach(boton => {
            boton.addEventListener('click', (e) => {
                console.log('Botón clickeado:', e.target);
            });
        });

        // Ejemplo de manejo de formulario
        const formularios = $$('form');
        formularios.forEach(form => {
            form.addEventListener('submit', manejarFormulario);
        });
    }

    // Función de inicialización
    function inicializar() {
        inicializarEventos();
        console.log('Aplicación inicializada');
    }

    // Iniciar la aplicación
    inicializar();
});

// Funciones de utilidad global
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString();
}

function formatearMoneda(cantidad) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(cantidad);
}

// Detección de modo oscuro del sistema
function detectarModoOscuro() {
    return window.matchMedia && 
           window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Animaciones suaves
function animarElemento(elemento, animacion) {
    elemento.classList.add('animando', animacion);
    elemento.addEventListener('animationend', () => {
        elemento.classList.remove('animando', animacion);
    }, { once: true });
}