//Hace jQuery accesible públicamente
window.$ = window.jQuery = require("jquery");  // Muy importante para utilizar jQuery con otros frameworks como Bootstrap

import SongsService from "./SongsService";
import UIManager from "./UIManager";
import SongsListManager from "./SongsListManager.js";
import SongFormManager from "./SongFormManager";
import PubSub from "pubsub-js";

//Instanciamos SongService
const songsService = new SongsService("/songs/");
const songListUIManager = new UIManager(".songs-list");

const songsListManager = new SongsListManager(songsService, songListUIManager, PubSub); // Inyección de dependencias
songsListManager.init(); //inicializamos SongsListManager que es donde está la carga de canciones

const songFormManager = new SongFormManager(".song-form", songsService, PubSub);
songFormManager.init();





