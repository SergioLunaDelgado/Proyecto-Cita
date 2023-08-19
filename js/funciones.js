import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from "./selectores.js";

const ui = new UI();
const administrarCitas = new Citas();

let editando;

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

/* Agrega datos de la cita */
export function datosCita(e) {
    /* si lo hacemos sin corchete accede al evento del objeto pero nos interesa las propiedades */
    citaObj[e.target.name] = e.target.value;
}

/* Valida y agrega una nueva cita a la clase de citas */
export function nuevaCita(e) {
    e.preventDefault();

    /* Extraer la informacion del objeto de cita */
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    /* Validar */
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando) {
        ui.imprimirAlerta('Se edito correctamente');

        /* Pasar el objeto de la cita a edición */
        administrarCitas.editarCita({...citaObj});

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;
    } else {
        /* Generar un id único */
        citaObj.id = Date.now();
    
        /* Generar una nueva cita */
        administrarCitas.agergarCita({ ...citaObj });

        /* mensaje */
        ui.imprimirAlerta('Se agrego correctamente');
    }


    reiniciarObjeto();
    formulario.reset();

    /* Mostrar en el HTML */
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    /* Eliminar la cita */
    administrarCitas.eliminarCita(id);

    /* Muestre un mensaje */
    ui.imprimirAlerta('La cita se eliminó correctamente')

    /* Refrescar las citas */
    ui.imprimirCitas(administrarCitas);
}

/* Carga los datos y el edicion */
export function cargaEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    /* Llenar los inputs */
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    /* Llenar el objeto */
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    /* Cambiar el texto del bton */
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}