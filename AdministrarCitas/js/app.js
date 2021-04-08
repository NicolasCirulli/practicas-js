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

    }


    // Clases

 class Citas{
        constructor(){
            this.citas = [];
        }
        agregarCita(cita){
            
            this.citas = [...this.citas, cita];

        }
        eliminarCita(id){
            this.citas = this.citas.filter( cita => cita.id !== id);
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

    imprimirCitas({citas}){
      

        this.limpiarContenedor();

        citas.forEach(cita => {
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;
            
            const mParrafo = document.createElement('h2');
            mParrafo.classList.add('card-title', 'font-weight-bolder');
            mParrafo.textContent = mascota;


            const pParrafo = document.createElement('p');
            const tParrafo = document.createElement('p');
            const fParrafo = document.createElement('p');
            const hParrafo = document.createElement('p');
            const sParrafo = document.createElement('p');

            const botonEliminar = document.createElement('button');
            botonEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            botonEliminar.onclick = ()=> quitarCita(id);

            const botonEditar = document.createElement('button');
            botonEditar.classList.add('btn', 'btn-info' );
            botonEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>`
            botonEditar.onclick = ()=> editarCita(cita);

            pParrafo.innerHTML = ` <span class="font-weight-bolder">Propietario: </span> ${propietario}`
            tParrafo.innerHTML = ` <span class="font-weight-bolder" >Telefono: </span> ${telefono}`
            fParrafo.innerHTML = ` <span class="font-weight-bolder" >Fecha:</span>  ${fecha}`
            hParrafo.innerHTML = ` <span class="font-weight-bolder" >Hora: </span> ${hora}`
            sParrafo.innerHTML = ` <span class="font-weight-bolder" >Sintomas: </span> ${sintomas}`
            botonEliminar.innerHTML = `Eliminar  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>`

            divCita.appendChild(mParrafo);
            divCita.appendChild(pParrafo);
            divCita.appendChild(tParrafo);
            divCita.appendChild(fParrafo);
            divCita.appendChild(hParrafo);
            divCita.appendChild(sParrafo);
            divCita.appendChild(botonEliminar);
            divCita.appendChild(botonEditar)
            

            contenedorCitas.appendChild(divCita);
            
        });

    }

    limpiarContenedor(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
            
        }
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

    reiniciarObj()


    form.reset()

    // Mostrar el HTML de las citas 

    ui.imprimirCitas(administradorCitas);


}

function reiniciarObj(){
    citaObj.mascota = '';
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono ='';
    citaObj.fecha='';
    citaObj.hora='';
    citaObj.sintomas='';
}

function quitarCita(id){
    administradorCitas.eliminarCita(id)

    ui.imprimirAlerta('La cita se elimino correctamente');

    ui.imprimirCitas(administradorCitas);
}

function editarCita(cita){

}