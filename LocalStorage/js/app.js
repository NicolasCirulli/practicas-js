// variables 
const form = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-notas');
let notas = [ ];

// Eventos 
evenListeners();

function evenListeners(){
    // Cuando se agrega una nueva nota
    form.addEventListener('submit', agregarNota);

    // Cuando el dom esta listo 
    document.addEventListener('DOMContentLoaded', ()=>{
        notas = JSON.parse( localStorage.getItem('notas') ) || [];
        crearHtml();
    })
}

// Funciones 
function agregarNota(e){
    e.preventDefault();
    // Text area donde el usuario escribe
    const nota = document.querySelector('#nueva_nota').value;
    // validacion
    if(nota === ''){
        mostrarError('La nota no puede estar vacia');
        return
    }
    // Añadir al arreglo de notas 
    const notasObj = {
        id : Date.now(),
        nota
    }
    notas = [...notas, notasObj];
    crearHtml();
    // Reiniciar formulario
    form.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHtml(){

    limpiarHTML();

    if(notas.length > 0){
        notas.forEach( nota =>{

            // Agregar un boton
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-nota')
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = ()=>{
                borrarNota(nota.id);
            }
            // Creando html
            const li = document.createElement('li')
            li.innerText = nota.nota;
            li.appendChild(btnEliminar);
            listaNotas.appendChild(li);

        })
    }

    sincronizarStorage();
}

function limpiarHTML(){
    while( listaNotas.firstChild){
        listaNotas.removeChild(listaNotas.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem('notas', JSON.stringify(notas))
}

function borrarNota(id){
    notas = notas.filter( nota => nota.id !== id);
    crearHtml();
}