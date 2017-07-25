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
    }
}