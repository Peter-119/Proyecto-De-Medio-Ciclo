/**
 * js/funciones.js
 * Genera el código automáticamente en segundo plano y guarda la información en localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    if (formulario) {
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();

            if (typeof validarFormularioMateria === 'function') {
                if (!validarFormularioMateria()) {
                    return;
                }
            }

            guardarMateria();
        });
    }

    // Renderiza la tabla si se encuentra en materias.html
    mostrarMaterias();
});

function obtenerSiguienteCodigo() {
    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    let maxNum = 0;

    materias.forEach(materia => {
        if (materia.codigo && materia.codigo.startsWith('MAT-')) {
            let num = parseInt(materia.codigo.replace('MAT-', ''), 10);
            if (!isNaN(num) && num > maxNum) {
                maxNum = num;
            }
        }
    });

    return `MAT-${String(maxNum + 1).padStart(3, '0')}`;
}

function guardarMateria() {
    // Generar el código internamente en lugar de leer del formulario visible
    const codigo = obtenerSiguienteCodigo();
    const nombre = document.getElementById('nombre').value.trim();
    const nivel = document.getElementById('nivel').value;
    const creditos = document.getElementById('creditos').value.trim();
    const docente = document.getElementById('docente').value.trim();

    const nuevaMateria = {
        codigo: codigo,
        nombre: nombre,
        materia: nombre,
        nivel: nivel,
        creditos: creditos,
        docente: docente
    };

    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    materias.push(nuevaMateria);
    localStorage.setItem('materias', JSON.stringify(materias));

    const mensaje = document.getElementById('mensaje');
    if (mensaje) {
        mensaje.textContent = `Materia registrada exitosamente con el código generado: ${codigo}.`;
        mensaje.style.color = "green";
    }

    document.getElementById('formulario').reset();
}

function mostrarMaterias() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    tbody.innerHTML = '';

    if (materias.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No hay materias registradas.</td></tr>`;
        return;
    }

    materias.forEach((materia, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${materia.codigo}</td>
            <td>${materia.materia || materia.nombre}</td>
            <td>${materia.nivel}</td>
            <td>${materia.creditos}</td>
            <td>${materia.docente}</td>
            <td>
                <button type="button" onclick="eliminarMateria(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

function eliminarMateria(index) {
    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    materias.splice(index, 1);
    localStorage.setItem('materias', JSON.stringify(materias));
    mostrarMaterias();
}