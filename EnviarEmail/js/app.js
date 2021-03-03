// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

//Variables campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
// Eventos
evenListeners();
function evenListeners(){
    //Cuando la app arranca
    document.addEventListener( 'DOMContentLoaded' , iniciarApp);
    //campos del form
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    // Enviar email

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', resetForm);
}



// Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

function validarFormulario(e){
    if(e.target.value.length > 0){
        // Eliminar errores
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }

        e.target.classList.remove('border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }else {
        e.target.classList.remove('border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
       if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            

            e.target.classList.remove('border-red-500');
            e.target.classList.add('border', 'border-green-500');
       }else{
            e.target.classList.remove('border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
       }
    }
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center','error');
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }
    
}

function enviarEmail(e){
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    setTimeout(()=>{
        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent= 'El email se envio correctamente'
        parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase')
        formulario.insertBefore(parrafo, spinner);

        setTimeout( ()=>{ parrafo.remove(); resetForm(); removeBorder();} , 5000)
    },3000)
}

function resetForm(){
    formulario.reset();
}

function removeBorder(){
    email.classList.remove('border');
    asunto.classList.remove('border');
    mensaje.classList.remove('border');
}