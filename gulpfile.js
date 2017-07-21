var gulp = require("gulp"); //Importamos gulp, la carga en momoria
var sass = require("gulp-sass"); //Importamos gulp-sass, es el puente entre gulp y sass
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");

// Definimos la tarea por defecto
//decimos donde tiene que buscar archivos sass, carpeta y subcarpetas
//cuando hay cambios ejecuta la tarea 'sass'
gulp.task("default", ["html", "sass"], function() {

    //Iniciamos el servidor de desarrollo en la carpeta src
    browserSync.init({ server: "dist/" });

    //Observa los cambios en los archivos SASS, y entonces ejecutamos la tarea 'sass'
    gulp.watch(["./src/scss/*.scss", "./src/scss/**/*.scss"], ["sass"]);

    //Observa los cambios en los archivos html, y recarga el navegador
    //También hemos incluido la carpeta de components
    gulp.watch(["./src/*.html", "./src/**/*.html"], ["html"]);
});


//Definimos la tarea compliar sass
gulp.task("sass", function(){    
    gulp.src("./src/scss/style.scss") //Indicamos el archivo fuente
        .pipe(sass().on("error", function(error){
            return notify().write(error);//Si ocurre un error mostramos una notificación
        })) //y le hacemos un pipe para pasarlo a la función que indicamos, también hacemos control de errores
        .pipe(gulp.dest("dist/")) //guardamos el resultado en la carpeta dist
        .pipe(browserSync.stream()); //recarga el CSS del navegador
});


// Definimos la tarea html para copiar e importar html
gulp.task("html", function() {
    gulp.src("src/*.html") //Coge todos los html de la carpeta src
        .pipe(gulpImport("src/components/")) //carpeta donde estaran los trozos de html que va a poder importar
        .pipe(gulp.dest("dist/")) //carpeta donde deja las copias
        .pipe(browserSync.stream()) // Recargamos el navegador
});