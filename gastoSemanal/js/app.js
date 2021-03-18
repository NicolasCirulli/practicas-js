// Variables y Selectores

const form = document.querySelector('#agregar-gasto');
const listaGastos= document.querySelector('#gastos ul');


// Eventos

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    
    form.addEventListener('submit' ,agregarGasto);



}


// Clases
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        this.resta()
    }
    resta(){
        let suma = this.presupuesto;
        this.gastos.forEach((gasto)=>{
                        suma -= gasto.cantidadGasto;
        })
        this.restante = suma;
    }
    calcularPorcentaje(presupuestoActual){
        const {presupuesto, restante} = presupuestoActual;
        const restanteDiv = document.querySelector('.restante');
        let calculo = restante / (presupuesto / 100);
        if(calculo < 25){
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');

            return
        }else if(calculo < 50){
            restanteDiv.classList.remove('alert-success' , 'alert-danger');
            restanteDiv.classList.add('alert-warning');
            return
        }else if(calculo > 51){
            restanteDiv.classList.remove('alert-warning' , 'alert-danger');
            restanteDiv.classList.add('alert-success');
        }
    }
    eliminarGasto(id){
        this.gastos = this.gastos.filter( gasto => gasto.id !== id);
    }
}

class Ui {
    agregarPresupuesto( monto ){
        // Extraer el valor
        const {presupuesto, restante } = monto;

        // Agregar al html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }
    imprimirAlerta(mensaje, tipo){
        // Crear el div
        const divAlerta = document.createElement('div');
        divAlerta.classList.add('text-center', "alert");

        if(tipo === 'error'){
            divAlerta.classList.add('alert-danger');
        }else{
            divAlerta.classList.add('alert-success');
        }
            //mensaje de error
        divAlerta.textContent = mensaje;
        // insertar en el html
        document.querySelector('.primario').insertBefore(divAlerta, form);
        
        // Quitar alerta despues de 3 segundos
        setTimeout(()=>{
            divAlerta.remove();
        },3000)
    }
    mostrarGastosHtml(gastos){
        this.limpiarHtml()
        // iterar sobre los gastos
        listaGastos.innerHTML = ``
        gastos.forEach( gasto => {
           
            const {nombreGasto, cantidadGasto, id} = gasto;
            
            // Crear un Li
            const nuevoLi = document.createElement('li')
            nuevoLi.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoLi.textContent = `${nombreGasto}, ${cantidadGasto}` ;
            nuevoLi.dataset.id = id;

            // Agregar el HTML del gasto

            nuevoLi.innerHTML = `${nombreGasto} <span class="badge badge-primary badge-pil">$ ${cantidadGasto}</span>`


            // Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.textContent = 'borrar';
            nuevoLi.appendChild(btnBorrar);
            btnBorrar.onclick = () =>{
                eliminarGasto(id);
            }

            //Agregar el HTML
            listaGastos.appendChild(nuevoLi);
        });

    }
    limpiarHtml(){
        while(listaGastos.firstChild){
            listaGastos.removeChild(listaGastos.firstChild);
        }
    }
}
// instanciar
const ui = new Ui();
let presupuestoDisponible;
// Funciones

function preguntarPresupuesto(){
        const presupuestoU = prompt('¿Cual es tu presupuesto?');
        if( presupuestoU === '' || presupuestoU === null || isNaN(presupuestoU) || presupuestoU <= 0){
            window.location.reload();
        }else{
            presupuestoDisponible = new Presupuesto(presupuestoU);
        }
        ui.agregarPresupuesto(presupuestoDisponible)
}

function agregarGasto(e){
    e.preventDefault();

    // Leer datos del form 
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = Number(document.querySelector('#cantidad').value);
    
    // Validar campos del form

    if(nombreGasto === '' || cantidadGasto === ''){
       ui.imprimirAlerta('Ambos cambios son obligatorios', 'error');
       return;
    }else if(cantidadGasto <= 0 || isNaN(cantidadGasto)){
        ui.imprimirAlerta('la cantidad no es valida', 'error');
        return;
    }
     ui.imprimirAlerta('Gasto agregado con exito');


     // Objeto del gasto
     const gasto = { nombreGasto, cantidadGasto, id: Date.now() };
     presupuestoDisponible.nuevoGasto(gasto)
     const { gastos} = presupuestoDisponible;
     ui.mostrarGastosHtml(gastos)
   
     // reinicia el form
    form.reset();
    // Muestra el nuevo presupuesto
    ui.agregarPresupuesto(presupuestoDisponible)
    presupuestoDisponible.calcularPorcentaje(presupuestoDisponible);
}

function borrarGasto(){
    console.log('borrando gasto');
}

function eliminarGasto(id){
    // Elimina el gasto del obj
    presupuestoDisponible.eliminarGasto(id);
    presupuestoDisponible.resta()

    // Elimina el gasto del html
    const { gastos } = presupuestoDisponible;
    ui.mostrarGastosHtml(gastos);

    // Actualiza el restante y su color 
    ui.agregarPresupuesto(presupuestoDisponible)
    presupuestoDisponible.calcularPorcentaje(presupuestoDisponible);
}