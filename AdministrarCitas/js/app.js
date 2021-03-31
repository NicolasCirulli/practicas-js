//  Campos
const iMascotas = document.querySelector('#mascota');
const iPropietarios = document.querySelector('#propietario');
const iTelefono = document.querySelector('#telefono');
const iFecha = document.querySelector('#fecha');
const iHora = document.querySelector('#hora');
const iSintomas = document.querySelector('#sintomas');
const botonCrear = document.querySelector('.btn');

// UI
const form = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// Events
eventListener();
function eventListener(){ 
        iMascotas.addEventListener('input', datosCita);
        iPropietarios.addEventListener('input', datosCita);
        iTelefono.addEventListener('input', datosCita);
        iFecha.addEventListener('input', datosCita);
        iHora.addEventListener('input', datosCita);
        iSintomas.addEventListener('input', datosCita);

        form.addEventListener('submit', validarDatos)

       // botonCrear.addEventListener('click', cargarDatos)
    }


    // Clases

 class Citas{
        constructor(){
            this.citas = [];
        }
        agregarCita(cita){
            
            this.citas = [...this.citas, cita];

            console.log(this.citas);

        }
}

class UI {

    imprimirAlerta(mensaje, tipo){

        // Crear div

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12' );

        // Agregar clase si es un error
        if( tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;

        // Agregar al DOM

       document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        
       setTimeout(() => {
           divMensaje.remove();
       }, 3000);
    }

}

const ui = new UI();
const administradorCitas = new Citas();

    // Obj

const citaObj = {
    mascota : '',
    propietario : '',
    telefono :'',
    fecha:'',
    hora:'',
    sintomas:''
}

// Funciones 

function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    return
}


// Valida nueva cita y agrega a la clase
function validarDatos(e){
    e.preventDefault();

    // Extraer datos del objeto

    const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;
    

    // Validar

    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas=== '' ){
        ui.imprimirAlerta('todos los campos son obligatorios', 'error');
        return
    }
    //crear una nueva cita


    // Generar un ID 
    citaObj.id = Date.now()

    administradorCitas.agregarCita({...citaObj});
}

