$(document).ready(function(){
    $(".more-mobile").click(function(){
        $("#more-block").show().css({"z-index": "20"});
    });
    $(".mobile-nav-close-btn").click(function(e){
        $("#more-block").hide();
        e.stopPropagation();
    });

    $(".aside-nav-el-with-submenu>.aside-nav-el__link").click(function(e){
        var el  = $(this).parent();
        el.find(".aside-nav-el-submenu").toggleClass("aside-nav-el-submenu-opened");
        el.find(".auto-drop-arrow").toggleClass("auto-drop-arrow_rotate");
        e.preventDefault();
    });

    /*$(".widget-action-auto-slider:not(.widget-action-auto-slider-dynamic)").bxSlider({
        onSliderLoad: function(){
            $(".widget-slider").css("visibility", "visible");
        }
    });*/

    var actionAutoWidget = new ActionAutoWidget().init();

    /*$(".widget-reviews-slider").bxSlider({
        onSliderLoad: function(){
            $(".widget-slider").css("visibility", "visible");
        }
    });*/
    var ratings = new RatingWidget().init();

    $(".widget-reviews").each(function(i){
        $(this).find(".reviews-slider-el__text").each(function(j){
            var text = $(this).text();
            if(text.length > 255){
                var sliced = text.slice(0,255) + '...';
                $(this).text(sliced);
            }
        });
    });

    /*$(".widget-excursion-slider").bxSlider({
        onSliderLoad: function(){
            $(".widget-slider").css("visibility", "visible");
        }
    });*/

    $(".widget-lg .widget-tabs-wrap").tabs();
    $(".main-content>.widget-tabs-wrap").tabs();


    $(".widget-sm .tabs-titles__el").click(function(){
        var el  = $(this);
        el.find(".accordion-container").toggleClass("accordion-opened");
        el.find(".drop-arrow").toggleClass("auto-drop-arrow_rotate");
    });

    if($(window).width() >= 1050){
        toTopInit();
    }

    if($(".widget-cars-filter").length){
        var tabsAjax = new TabsAjax($(".widget-cars-filter"));
    }

    //$(".car-slider").bxSlider();

    $(".rent-car-btn").click(function () {
        $("body").addClass("scroll-disable");
        $(".popup-cover-wrap").show().css({"top": $(window).scrollTop()});
    });
    $(".rent-car-form-close-btn-wrap").click(function () {
        $(".popup-cover-wrap").hide();
        $("body").removeClass("scroll-disable");
    });

    $(".aside-nav-el-submenu.aside-nav-el-submenu-opened-state").mCustomScrollbar({
        theme:"minimal-dark"
    });

    /*$(".widget-slider").bxSlider({
        onSliderLoad: function(){
            $(this).css("visibility", "visible");
        }
    });*/

    $(".widget-services-list-wrap>.widget-services-list__el").click(function(e){
        var el  = $(this);
        el.find(".services-list-dropdown").toggleClass("services-list-dropdown-opened");
        el.find(".service-drop-arrow").toggleClass("auto-drop-arrow_rotate");
        //e.preventDefault();
    });

    $(".routes-table-scroll-wrap").mCustomScrollbar({
        axis:"x"
    });
    $(".routes-table-body").mCustomScrollbar({
        axis: "y"
    });

    $(".reviews-form__rating-wrap").find('.rating').barrating({
        theme: 'fontawesome-stars-o',
        initialRating: "0",
        showSelectedRating: false
    }).addClass("rating-font-size");

    $(".widget-price").priceTabsWidget();

    if($(window).width() <= 440){
        $(".with-second-level .with-submenu").hover(function () {
            $(this).parent().addClass("hide-mob-submenu");
            $(this).find(".header-nav-submenu").addClass("mob-submenu-indent");
        },function () {
            $(this).parent().removeClass("hide-mob-submenu");
            $(this).find(".header-nav-submenu").removeClass("mob-submenu-indent");
        });
    }
});




$(window).load(function(){
    if($(window).width() <= 560){
        var logo = $(".header__logo"),
            src = logo.attr("src").split("/");
        src.splice(-1,1, "logo-mobile.png");
        src = src.join("/");
        logo.attr("src",src);
    }

    if($(window).width() <= 720){
        var excSmEls = $(".widget-excursion.widget-sm"),
            excLgEls = $(".widget-excursion.widget-lg");


        if(excSmEls.width()>=240){
            excSmEls.each(function (i) {
                $(this).find(".widget-excursion-slider-el__image").each(function (j) {
                    var newImg = $(this).data("reserveImg");
                    $(this).attr("src",newImg);
                });
            });
        }

        if(excLgEls.width()>=500){
            excLgEls.each(function (i) {
                $(this).find(".widget-excursion-slider-el__image").each(function (j) {
                    var newImg = $(this).data("lgImg");
                    $(this).attr("src",newImg);
                });
            });
        }

        resizeGrid();
    }

    if($(window).width()<=480){
        var autoEls = $(".auto__image");

        autoEls.each(function () {
            var newImg = $(this).data("lgImg");
            $(this).attr("src",newImg);

        });
    }

    $(".auto-characteristics-el__divider").each(function () {
        var el = $(this),
            parent = el.parent(),
            w1 = parent.find(".auto-characteristics-el__title").width(),
            w2 = parent.find(".auto-characteristics-el__value").width(),
            w = parent.innerWidth() - w1 - w2 - 10,
            w_per = (w/parent.innerWidth())*100;

        el.css({"width": w_per+"%"});
    });

    if($(window).width() <= 768){
        $(".widget-price .tabs-titles__el-mobile-selected").on("click",function(){
            var el = $(this).parent();
            el.find(".tabs-titles__el:not(.tabs-titles__el-mobile-selected)").toggle();
        });
        $(".widget-price .tabs-titles__el:not(.tabs-titles__el-mobile-selected)").on("click", function () {
            var el = $(this),
                parent = el.parent();
            parent.find(".tabs-titles__el-mobile-text").text(el.text());
            parent.find(".tabs-titles__el:not(.tabs-titles__el-mobile-selected)").hide();
        });
        $(".widget-price .tabs-titles__el:not(.tabs-titles__el-mobile-selected)")[0].click();
    }
});

$(window).resize(resizeGrid);

function resizeGrid(){
    if($(window).width() > 480 && $(window).width()<=720){
        var els = $(".vertical-row-left .widget-sm");
        els.each(function(i){
            if(i%2 !== 0){
                var residual = $(els[i-1]).outerHeight(true) - $(els[i]).outerHeight(true);
                if(residual > 0){
                    var offsetResidual = $(els[i]).offset().top - $(els[i-1]).offset().top;
                    if(offsetResidual>0) residual = residual - offsetResidual;
                    $(this).css({"marginBottom": residual+1});
                }
            }
        });
    }
}

function toTopInit(){
    var el = $(".to-top-block"),
        left = $(".main-content.main-content_indent_under_header").offset().left - el.width(),
        scroll = false;

    el.css({
        "height": $(window).height()
    });


    $(window).scroll(function(){
        if ( $(window).scrollTop() >= 350 ){
            el.show();
            if(el.hasClass("scrolledTop")){

                if($(window).width() >= 1130){
                    $(".to-top-text").show();
                }
                $(".to-top-arrow").toggleClass("auto-drop-arrow_rotate").toggleClass("to-top-arrow_indent");
                el.removeClass("scrolledTop");
                scroll = false;
            }
            el.addClass("opacity_05");
            setTimeout(function () {
                el.removeClass("opacity_05");
            }, 2000)
        }
    });

    el.click(function () {
        if(!scroll){
            scroll = $(window).scrollTop();
            $("html, body").animate({scrollTop: 0}, 500);
            $(".to-top-text").hide();
            $(".to-top-arrow").toggleClass("auto-drop-arrow_rotate").toggleClass("to-top-arrow_indent");
            setTimeout(function () {
                el.addClass("scrolledTop");
            }, 500)
        }else{
            $("html, body").animate({scrollTop: scroll}, 500);
            scroll = false;
        }
    });
}