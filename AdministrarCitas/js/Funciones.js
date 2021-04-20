import Citas from './Citas.js';
import { iMascotas, iPropietarios, iFecha, iHora, iSintomas, iTelefono, form } from './selectores.js';
import UI from './Ui.js';



const ui = new UI();
const administradorCitas = new Citas();

let editando = false;


// Funciones 


const citaObj = {
    mascota : '',
    propietario : '',
    telefono :'',
    fecha:'',
    hora:'',
    sintomas:''
}




export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
    return
}


// Valida nueva cita y agrega a la clase
export function validarDatos(e){
    e.preventDefault();

    // Extraer datos del objeto

    const {mascota,propietario,telefono,fecha,hora,sintomas} = citaObj;
    

    // Validar

    if( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas=== '' ){
        ui.imprimirAlerta('todos los campos son obligatorios', 'error');
        return
    }

    if(editando){
       
        ui.imprimirAlerta('Se edito correctamente');

        administradorCitas.editCita({...citaObj})

        botonCrear.textContent = 'Crear cita';

        editando = false;

        
    }else{
                // Generar un ID 
        citaObj.id = Date.now()

        administradorCitas.agregarCita({...citaObj});

        //Mensaje de alerta 
       
    }

    //crear una nueva cita




    reiniciarObj()


    form.reset()

    // Mostrar el HTML de las citas 

    ui.imprimirCitas(administradorCitas);


}

export function reiniciarObj(){
    citaObj.mascota = '';
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono ='';
    citaObj.fecha='';
    citaObj.hora='';
    citaObj.sintomas='';
}

export function quitarCita(id){
    administradorCitas.eliminarCita(id)

    ui.imprimirAlerta('La cita se elimino correctamente');

    ui.imprimirCitas(administradorCitas);
}

export function editarCita(cita){

    const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;
    iMascotas.value = mascota; 
    iPropietarios.value = propietario;
    iTelefono.value = telefono;
    iFecha.value = fecha;
    iHora.value = hora;
    iSintomas.value = sintomas;

   

    citaObj.mascota = iMascotas.value;
    citaObj.propietario = iPropietarios.value;
    citaObj.telefono = iTelefono.value;
    citaObj.fecha = iFecha.value;
    citaObj.hora = iHora.value;
    citaObj.sintomas = iSintomas.value;
    citaObj.id = id;
   
    botonCrear.textContent = 'Editar cita ';
    editando = true;

}