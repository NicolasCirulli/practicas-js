// Constructores

function Seguro(marca,year,tipo){
        this.marca = marca;
        this.year = year;
        this.tipo = tipo;

}

// Cotizacion con los datos

Seguro.prototype.cotizarSeguro = function(){
    /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35
    */
    let cantidad;
    const base = 2000;
    const diferencia = new Date().getFullYear() - this.year 
    console.log(this.marca);
    switch(this.marca){
        case '1':
                cantidad = base * 1.15;
                break
        case '2':
                cantidad = base * 1.05;
                break
        case '3':
                cantidad = base * 1.35;
                break
        default:
            break;
    }
    
    // Cada año de antiguedad se reduce el precio un 3%
    cantidad -= ((diferencia * 3 ) * cantidad ) / 100;

    /*
    si el seguro es basico se multiplica por 1.30
    si el seguro es completo se multiplica por 1.50
    */ 
   if(this.tipo === 'basico'){
       cantidad *= 1.30;
   }else{
       cantidad *= 1.50;
   }

   return cantidad;
}

function UI() {} 

UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear(),
             min = max - 20;
    const selectYear = document.querySelector('#year');
    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }         
}

UI.prototype.mostrarMensaje = (mensaje, tipo)=>{
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add( 'error')
    }else{
        div.classList.add( 'correcto')
    }
    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje;
    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(()=>{
        div.remove();
    },2500)
}

UI.prototype.mostrarResultado = ( total, seguro)=> {
   const {marca, year, tipo} = seguro;
    let textoMarca;
    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }




    // crear el resultado 
    const div = document.createElement('div')
    div.classList.add('mt-10');

    div.innerHTML = `
            <p class="header">Tu Resumen</p>
            <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca}</span></p>
            <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
            <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo}</span></p>
            <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
    `;
    const resultadoDiv = document.querySelector('#resultado');
 

    // Mostrar el spinner
    const spinner = document.querySelector('#cargando')
    spinner.style.display ='block';

    setTimeout( ()=>{
        spinner.style.display = 'none';
        // borra el spinner y aparece el resultado 
        resultadoDiv.appendChild(div)
    },2500 )
}



const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones();
})

eventListeners()
function eventListeners(){
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    // Leer los valores de los campos

    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    // validar
    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('todos los campos son obligatorios', 'error')
        return
    }
    ui.mostrarMensaje('cotizando', 'exito')

    // Ocultar las cotizaciones previas

    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }

    // Instanciar seguro

    const seguro = new Seguro(marca, year, tipo)
    const total = seguro.cotizarSeguro()
    // Utilizar el portotype que va a cotizar

    ui.mostrarResultado(total, seguro);

}