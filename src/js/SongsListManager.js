import UIManager from './UIManager';

export default class SongsListManager extends UIManager{
    
    constructor(elementSelector, songService, pubSub) {
        super(elementSelector);
        this.songsService = songService;
        this.pubSub = pubSub;
    }
    
    init() {
        //Tenemos que cargar las canciones
        this.loadSongs();

        let self = this;

        //Manejador de eventos, al hacer clic borramos la cacnión
        this.element.on("click", ".song", function() {
            //Con jQuery accedemos a los atributos data para saber el id
            let songId = this.dataset.id; 
            self.deleteSong(songId);
            
        });

        this.pubSub.subscribe("new-song", (topic, song) => {
            this.loadSongs();
        });

    }


    loadSongs() {
        // Aquí va el código que teníamos en main.js de carga de canciones
        //con algunas modificaciones para que funcione
        this.songsService.list(songs => {
            //Comprovamos si hay canciones
            if(songs.lenght == 0) {
                //Mostramos el estado vacío
                this.setEmpty();
            }else{
                //Llamamos al método que pinta el html con las canciones
                this.renderSongs(songs);

                //Quitamos el mensaje de cargando y ponemos la clase ideal
                this.setIdeal();
            }
        }, error => {
            //Mostrar el estado de error
            this.setError();
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
            html += this.renderSong(song);
        }
        //Metemos el HTML en el div que contiene las canciones
        this.setIdealHtml(html);
    }


    renderSong(song) {
        let cover_url = song.cover_url;
        let srcset = "";

        if (cover_url == "") {
            cover_url = "img/disk-150px.png";
            srcset = 'srcset= img/disk-150px.png 150w, img/disk-250px.png 250w, img/disk-300px.png 300w';

        }

        //retorna el template string con el renderizado de una canción
        return `<article class="song" data-id="${song.id}">
                        <img src="${song.cover_url}" alt="${song.artist} - ${song.title}" class="cover"${srcset}>   
                        <div class="artist">${song.artist}</div>
                        <div class="title">${song.title}</div>
                    </article>`;
    }


    deleteSong(songId) {
        this.setLoading();
        this.songsService.delete(songId, success => {
            this.loadSongs();
        }), error => {
            this.setError();
        }
    }
}