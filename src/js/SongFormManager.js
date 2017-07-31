//importamos jQuery, hacemos un require porque jquery
//todavía no acepta ES6, si no lo haríamos con import
const $ = require("jquery");

import UIManager from './UIManager';


// SongsService, para hacer petición AJAX para guardar la canción en el backend
// UIManager para gestionar los estados de la interfaz
// para tener acceso al formulario para poder leer los valores de los inputs


export default class SongFormManager extends UIManager{ //Hereda de UIManager

    constructor(elementSelector, songsService, pubSub) {
        
        super(elementSelector); //llamada al constructor de la clase UIManager

        this.songsService = songsService; 
        this.pubSub = pubSub;
    }

    
    init() {
        this.setupSubmitEventHandler()
    }

    setupSubmitEventHandler() {
        //No le ponemos los parentesis al final validateAndSendData()
        //ya que le estoy poniendo el manejador de eventos y el manejador de eventos
        //es una función, NO es la ejecución de esta función!
        // La hacemos arrow function por el tema de scope de los manejadores de eventos,
        //con una función normal el this hace referencia al formulario
        //con arrow function hace referencia al scope del padre, al objeto SongFormManager
        this.element.on("submit", () => {
            this.validateAndSendData();

            // en jQuery podemos hacer un preventDefault haciendo un return false
            //es lo mismo que hacer un event.preventDefault();
            return false; 
        });
    }

    validateAndSendData() {
        if (this.isValid()) {
            this.send();
        }        
    }

    isValid() {
        //recuperamos todos los valores de los input
        const inputs = this.element.find("input");

        for (let input of inputs) {
            if (input.checkValidity() == false) { //checkValidity de JS
                const errorMessage = input.validationMessage;
                input.focus();
                this.setErrorHtml(errorMessage);
                this.setError(); // nos ponemos en estado de error
                return false;
            }
        }
        this.setIdeal();
        return true;
    }

    send() {
        // lo ponemos en estado cargando
        // reescribimos el código setLoading de UIManager
        // para habilitar y deshabilitar los campos
        this.setLoading();

        // tenemos que definir el objeto song
        const song = {
            artist: this.element.find("#artist").val(),
            title: this.element.find("#title").val(),
            cover_url: this.element.find("#cover_url").val()
        };

        //enviamos los datos utilizando SongsService
        this.songsService.save(song, success => {
            //Recargamos el listado de canciones con PubSub
            PubSub.publish("new-song", song); //Publicamos el evento que informa de la creación de una canción

            //limpiamos el formulario
            this.resetForm();
            this.setIdeal(); //Ponemos el estado ideal
        }, error => {
            this.setErrorHtml("Se ha producido un error al guardar la canción en el servidor");
            this.setError(); //ponemos el estado de error
        });       
    }

    resetForm() {
        this.element[0].reset(); //resetea el formulario
    }

    disableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    enableFormControls() {
        this.element.find("input, button").attr("disabled", true);
    }

    //redefinimos los métodos del padre UIManager

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }
}