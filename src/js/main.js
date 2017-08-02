//Hace jQuery accesible públicamente
window.$ = window.jQuery = require("jquery");  // Muy importante para utilizar jQuery con otros frameworks como Bootstrap

import SongsService from "./SongsService";
import SongsListManager from "./SongsListManager.js";
import SongFormManager from "./SongFormManager";
import PubSub from "pubsub-js";

//Instanciamos SongService
const songsService = new SongsService("/songs/");

const songsListManager = new SongsListManager(".songs-list", songsService, PubSub); // Inyección de dependencias
songsListManager.init(); //inicializamos SongsListManager que es donde está la carga de canciones

const songFormManager = new SongFormManager(".song-form", songsService, PubSub);
songFormManager.init();





