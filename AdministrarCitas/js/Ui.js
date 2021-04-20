import {  quitarCita, editarCita } from "./Funciones.js";
import { contenedorCitas } from "./selectores.js";

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

export default UI;