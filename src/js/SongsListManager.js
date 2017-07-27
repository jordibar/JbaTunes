const $ = require("jQuery");

export default class SongsListManager {
    
    constructor(songService, uiManager) {
        this.songsService = songService;
        this.uiManager = uiManager;
    }
    
    init() {
        //Tenemos que cargar las canciones
        this.loadSongs();

    }


    loadSongs() {
        // Aquí va el código que teníamos en main.js de carga de canciones
        //con algunas modificaciones para que funcione
        this.songsService.list(songs => {
            //Comprovamos si hay canciones
            if(songs.lenght == 0) {
                //Mostramos el estado vacío
                this.uiManager.setEmpty();
            }else{
                //Llamamos al método que pinta el html con las canciones
                this.renderSongs(songs);

                //Quitamos el mensaje de cargando y ponemos la clase ideal
                this.uiManager.setIdeal();
            }
        }, error => {
            //Mostrar el estado de error
            this.uiManager.setError();
            //Hacemos log del error en la consola
            console.log("ERROR", error);
        })
    }

    renderSongs(songs) {
        //Componemos el HTML con todas las canciones
        let html = "";
        for (let song of songs) {
            //Template strings de ES6
            //Componemos el html con todas las canciones
            html += `<article class="song">
                        <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover">
                        <div class="artist">${song.artist}</div>
                        <div class="title">${song.title}</div>
                    </article>`;
        }
        //Metemos el HTML en el div que contiene las canciones
        $(".songs-list .ui-state.ideal").html(html);
    }
}