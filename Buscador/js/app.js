// variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');
const max = new Date().getFullYear();
const min = max - 10;

// objeto busqueda

const datosBusquedas ={
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// eventos

document.addEventListener('DOMContentLoaded', ()=>{
        mostrarAutos(autos); // muestra autos al cargar

        //llena las opciones de años

        llenarSelect();

});


// event del buscador

marca.addEventListener('change', (e)=>{
    datosBusquedas.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener('change', (e)=>{
    datosBusquedas.year = parseInt(e.target.value);
    filtrarAuto();
});

minimo.addEventListener('change', (e)=>{
    datosBusquedas.minimo = e.target.value;
    filtrarAuto();
});

maximo.addEventListener('change', (e)=>{
    datosBusquedas.maximo = e.target.value;
    filtrarAuto();
});

puertas.addEventListener('change', (e)=>{
    datosBusquedas.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener('change', (e)=>{
    datosBusquedas.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener('change', (e)=>{
    datosBusquedas.color = e.target.value;
    filtrarAuto();
});



// funciones
function mostrarAutos(autos){
        limpiarHtml()
        autos.forEach(auto => {
            const {marca, modelo, year, puertas, transmision, precio, color} = auto;
            const autoHTML = document.createElement('p');
            autoHTML.textContent = ` ${marca}  ${modelo} - ${year} - ${puertas} Puertas - Transmision : ${transmision} - ${precio} - ${color}  `;
            // insertarl en el html
            resultado.appendChild(autoHTML);
        })
};

function llenarSelect(){
    
    for (let i = max ; i >= min ; i-- ){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }

}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function  filtrarAuto(){
    const resultado = autos.filter(filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor )
  
   if (resultado.length){
        mostrarAutos(resultado);
   }else{
       mostrarMensaje();
   }
}

function filtrarMarca(auto){
    const { marca } = datosBusquedas;
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const { year } = datosBusquedas;
    if(year){
        return auto.year === year;
    }
    return auto;

}

function filtrarMinimo(auto){
    const { minimo } = datosBusquedas;
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const { maximo } = datosBusquedas;
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto; 
}
function filtrarPuertas(auto){

    // probando con switch
    const { puertas} = datosBusquedas;
    switch (puertas) {
        case 2:
            return auto.puertas === 2
        case 4:
            return auto.puertas === 4
        default:
            return auto
            
    }
}
function filtrarTransmision(auto){
    const { transmision} = datosBusquedas;
    switch (transmision) {
        case 'automatico':
            return auto.transmision === 'automatico'
        case 'manual':
            return auto.transmision === 'manual'
        default:
            return auto
            
    }
}

function filtrarColor(auto){
    const { color } = datosBusquedas;
    switch (color) {
        case 'Negro':
            return auto.color === 'Negro'
        case 'Azul':
            return auto.color === 'Azul'
        case 'Blanco':
            return auto.color === 'Blanco'
        case 'Rojo':
            return auto.color === 'Rojo'
        default:
            return auto
            
    }
}
function mostrarMensaje(){
    limpiarHtml();
    const sinAutos = document.createElement('div');
    sinAutos.classList.add('alerta', 'error');
    sinAutos.textContent = 'No hay autos disponibles';
    resultado.appendChild(sinAutos);
}