const $ = require("jquery");

// Servicio para extraer el acceso del API REST
export default class SongService {

    constructor() {
    }

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
    update(songId) {

    }

    //Borrar una canción
    delete(songId) {

    }

}