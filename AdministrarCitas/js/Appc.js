import { iMascotas, iPropietarios, iTelefono, iFecha,iHora,iSintomas, form } from "./selectores.js";
import { datosCita, validarDatos} from "./Funciones.js";

class App {
    constructor(){
            this.initApp();
    }
    initApp(){
        iMascotas.addEventListener('input', datosCita);
        iPropietarios.addEventListener('input', datosCita);
        iTelefono.addEventListener('input', datosCita);
        iFecha.addEventListener('input', datosCita);
        iHora.addEventListener('input', datosCita);
        iSintomas.addEventListener('input', datosCita);

        form.addEventListener('submit', validarDatos)

    }
}

export default App;