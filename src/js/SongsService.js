//No es necesario cargar jQuery ya que está importado en main.js
//es simplemente para que sea más legible
const $ = require("jquery");

// Servicio para extraer el acceso del API REST
export default class SongsService {

    constructor(url) {
        this.url = url
    }



    //Métodos
    //Obtener un listado de canciones
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    //Crear o actualizar canción, si no exite la crea
    save(song, successCallback, errorCallback){
        if(song.id) {
            this.update(song, successCallback, errorCallback);
        } else {
            this.create(song, successCallback, errorCallback);
        }
    }

    //Crear una canción
    create(song, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: "post",
            data: song,
            success: successCallback,
            error: errorCallback
        })
    }

    //Obtener el detalle de una canción
    getDetail(songId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${songsId}`,
            success: successCallback,
            error: errorCallback
        })
    }

    //Actulizar una canción
    update(song, successCallback, errorCallback) {
        $.ajax({
            url: `{this.url}${song.id}`,
            method: "put",
            data: song,
            success: successCallback,
            error: errorCallback
        })
    }

    //Borrar una canción, ejemplo delete(3, response => {}, error => {})
    delete(songId, successCallback, errorCallback) {
        $.ajax({
            url: `{this.url}${songId}`,
            method: 'delete',
            success:successCallback,
            error: errorCallback
        })
    }

}