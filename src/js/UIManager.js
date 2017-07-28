const $ = require("jquery");

export default class UIManager {
    
    constructor(selector) {
        this.uiStateClasses = "empty loading error partial ideal"; // Clases CSS que definen estados de componente
        this.element = $(selector); // seleccionamos el elemento de jQuery en el constructor
    }

    //Métodos para poner el elemento en diferentes estados de interfaz
    setEmpty() {
        this.element.removeClass(this.uiStateClasses).addClass("empty");
    }

    setLoading() {
        this.element.removeClass(this.uiStateClasses).addClass("Loading");
    }

    setError() {
        this.element.removeClass(this.uiStateClasses).addClass("error");
    }

    setPartial() {
        this.element.removeClass(this.uiStateClasses).addClass("partial");
    }

    setIdeal() {
        this.element.removeClass(this.uiStateClasses).addClass("ideal");
    }




    setEmptyHtml(html) {
        //Busca un descendiente de this.element,
        //que tenga las clases CSS ui.-state y empty y le asigna el HTML
        this.element.find(".ui-state.emtpy").html(html);
    }

    setLoadingHtml(html) {
        //Busca un descendiente de this.element,
        //que tenga las clases CSS ui.-state y loading y le asigna el HTML
        this.element.find(".ui-state.loading").html(html);
    }

    setErrorHtml(html) {
        this.element.find(".ui-state.error").html(html);
    }

    setPartialHtml(html) {
        this.element.find(".ui-state.partial").html(html);
    }

    setIdealHtml(html) {
        this.element.find(".ui-state.ideal").html(html);
    }
}