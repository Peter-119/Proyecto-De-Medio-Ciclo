function validarFormularioMateria() {
    const inputNombre = document.getElementById('nombre');
    const selectNivel = document.getElementById('nivel');
    const inputCreditos = document.getElementById('creditos');
    const inputDocente = document.getElementById('docente');

    let errores = [];

    if (inputNombre) {
        const val = inputNombre.value.trim();
        if (!val || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{3,60}$/.test(val)) {
            errores.push("El 'Nombre de la materia' debe tener al menos 3 letras.");
        }
    }

    if (selectNivel && (!selectNivel.value || selectNivel.value === "")) {
        errores.push("Debe seleccionar un 'Nivel' de la lista.");
    }

    if (inputCreditos) {
        const val = parseInt(inputCreditos.value.trim(), 10);
        if (isNaN(val) || val <= 0 || val > 20) {
            errores.push("Los 'Créditos' deben ser un número entre 1 y 20.");
        }
    }

    if (inputDocente) {
        const val = inputDocente.value.trim();
        if (!val || !isNaN(val) || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]{3,60}$/.test(val)) {
            errores.push("El nombre del 'Docente' no puede ser un número y debe contener letras.");
        }
    }

    if (errores.length > 0) {
        alert("Atención:\n\n- " + errores.join("\n- "));
        return false;
    }

    return true;
}