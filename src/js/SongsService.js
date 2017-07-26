//No es necesario cargar jQuery ya que está importado en main.js
//es simplemente para que sea más legible
const $ = require("jquery");

// Servicio para extraer el acceso del API REST
export default class SongsService {

    constructor() {
        console.log("Songs Service");
    }



    //Métodos
    //Obtener un listado de canciones
    list(successCallback, errorCallback) {
        $.ajax({
            url: "/songs/",
            success: successCallback,
            error: errorCallback
        });
    }

    //Crear o actualizar canción, si no exite la crea
    save(song){

    }

    //Crear una canción
    create(song) {

    }

    //Obtener el detalle de una canción
    getDetail(songId) {

    }

    //Actulizar una canción
    update(song) {

    }

    //Borrar una canción
    delete(songId) {

    }

}