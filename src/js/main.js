//Hace jQuery accesible públicamente
window.$ = window.jQuery = require("jquery");  // Muy importante para utilizar jQuery con otros frameworks como Bootstrap

import SongsService from "./SongsService";

//Instanciamos SongService
const songsService = new SongsService();



// Cargar la lista de canciones con AJAX
songsService.list(songs => {
    //Comprovamos si hay canciones
    if(songs.lenght == 0) {
        //Mostramos el estado vacío
        $(".songs-list").removeClass("loading").addClass("empty");
    }else{
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

                //Quitamos el mensaje de cargando y ponemos la clase ideal
                $(".songs-list").removeClass("loading").addClass("ideal");
    }
}, error => {
    //Mostrar el estado de error
    $(".songs-list").removeClass("loading").addClass("error");
    //Hacemos log del error en la consola
    console.log("ERROR", error);
})


/*
$.ajax({
    url: "/songs/",
    success: songs => {
        console.log("SUCCESS", songs);

        //Comprovamos si hay canciones
        if(songs.lenght == 0) {
            //Mostramos el estado vacío
            $(".songs-list").removeClass("loading").addClass("empty");
        }else{
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

                    //Quitamos el mensaje de cargando y ponemos la clase ideal
                    $(".songs-list").removeClass("loading").addClass("ideal");
        }
    },

    error: error => {
        //Mostrar el estado de error
        $(".songs-list").removeClass("loading").addClass("error");
        //Hacemos log del error en la consola
        console.log("ERROR", error);
    }
});
*/



