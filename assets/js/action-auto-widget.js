var ActionAutoWidget = function(){
    var cars = $(".action-auto-list-el"),
        back = $(".back-to-action-auto-list"),
        slider;

    this.toggleState = function(e){
        var id = $(this).data("id"),
            widgetContainer = findParent($(this));
        e.preventDefault();

        if(widgetContainer.hasClass("widget-action-auto-state-list"))
            setOpenedState(widgetContainer);
        else {
            if (widgetContainer.hasClass("widget-action-auto-state-opened"))
                setListState(widgetContainer);
        }
    };

    this.init = function () {
        cars.bind("click",this.toggleState);
        back.bind("click",this.toggleState);
        return this;
    };

    var setOpenedState = function(widgetContainer){
        var promise = http("assets/templates/limbery/json/car.json");
        widgetContainer
            .removeClass("widget-action-auto-state-list")
            .addClass("widget-action-auto-state-opened widget_border_radius_b")
            .find(".widget-action-auto-tmpl-for-list-state").hide();

        promise.success(function(data){
            parseTmpl(widgetContainer,data);
        });

        widgetContainer
            .find(".widget-action-auto-tmpl-for-open-state").show();
    };

    var setListState = function(widgetContainer){
        widgetContainer
            .removeClass("widget-action-auto-state-opened widget_border_radius_b")
            .addClass("widget-action-auto-state-list")
            .find(".widget-action-auto-tmpl-for-open-state").hide();

        widgetContainer.find(".widget-action-auto-tmpl-for-list-state").show();
        cleanOutTmpl(widgetContainer);
    };

    var parseTmpl = function(el,data){
        var tmpl = getTmpl(el);
        data.images.forEach(function(item,i){
            $("<li class='widget-action-auto-slider-el' />")
                .append($('<img class="widget-action-auto-slider__image" alt="" title="">').attr("src", item))
                .appendTo(tmpl.slider);
            $('<li data-uk-slideshow-item="'+i+'" />')
                .append($("<a href='' />"))
                .appendTo(tmpl.dotnav);
        });
        tmpl.title.html(data.title);
        tmpl.description.html(data.description);
        //tmpl.slider.bxSlider({
        //    onSliderLoad: function(){
        //        $(".widget-slider").css("visibility", "visible");
        //    }
        //});
    };

    var cleanOutTmpl = function (el) {
        var tmpl = getTmpl(el);
        tmpl.slider.html("");
        tmpl.dotnav.html("");
        tmpl.title.html("");
        tmpl.description.html("");
    };

    var getTmpl = function (el) {
      return {
          "slider" : el.find(".uk-slideshow"),
          "dotnav" : el.find(".uk-dotnav"),
          "title" : el.find(".widget-action-auto-tmpl-for-open-state .action-auto-list-el__title"),
          "description" : el.find(".widget-action-auto-tmpl-for-open-state .action-auto-list-el__description")
      };
    };
};

function findParent(el){
    if(el.parent().hasClass("widget-container")){
        return el.parent();
    }
    else {
        return findParent(el.parent());
    }
}

function http(url, data, before){
    var params = {
        url: url,
        dataType: 'json'
    };
    if(data) params.data = data;
	if(before) params.beforeSend = before;

    return $.ajax(params);
}