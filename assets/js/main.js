$(document).ready(function(){

    if (navigator.appVersion.indexOf("Mac")!=-1) $("html").addClass("mac-os");
    if (navigator.userAgent.search(/Firefox/) > -1) $("html").addClass("ff-browser");


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
        $("body").addClass("scroll-disable scroll-disable-indent");
        //$(".popup-cover-wrap").show().css({"top": $(window).scrollTop()});
        $(".popup-cover-wrap").show();
    });
    $(".rent-car-form-close-btn-wrap").click(function () {
        $(".popup-cover-wrap").hide();
        $("body").removeClass("scroll-disable scroll-disable-indent");
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
    //$(".routes-table-body").mCustomScrollbar({
    //    axis: "y"
    //});

    $('.excursion_filters .filter-dropdown-scroll').mCustomScrollbar({theme:"minimal-dark"});

    $(".reviews-form__rating-wrap").find('.rating').barrating({
        theme: 'fontawesome-stars-o',
        initialRating: "0",
        showSelectedRating: false
    }).addClass("rating-font-size");

    $(".widget-price").priceTabsWidget();

    if($(window).width() <= 560){
        var stepHtml;
        $(".with-second-level .with-submenu").on('click', function () {
                var step = $(this).parent().parent().find(".more-mobile-main-step"),
                    text = $(this).find(">.header-nav-submenu-el__link").text(),
                    that = $(this);

                stepHtml = step.html();
                step.html('<i class="fa fa-chevron-left" aria-hidden="true"></i> '+text);
                $(this).parent().addClass("hide-mob-submenu");
                $(this).find(".header-nav-submenu").addClass("mob-submenu-indent");

                step.on('click', function () {
                    $(this).html(stepHtml);
                    that.parent().removeClass("hide-mob-submenu");
                    that.find(".header-nav-submenu").removeClass("mob-submenu-indent");
                });

            })
            .find(".header-nav-submenu-el__link").on('click', function (e) {e.preventDefault();});
    }
    liveSearchExcursions();

    cropStrings(['.aside-nav-custom-scroll .aside-nav-el__link','.widget-news .auto__title'], [17,22]);

    cropReviewsText();

    if($(window).width() <= 840 && $(window).width()>= 768){
        //cropStrings(['.widget-auto:not(.tmpl-for-cloning) .auto__title'], [1]);
    }

    $('.footer-links-list__title').on('click', function (e) {
        $(this).parent().find('.footer-links-with-wubmenu').toggleClass('footer-links-closed-state');
        e.preventDefault();
    });


    document.addEventListener("carsLoaded", function(event) {
        cropStrings(['.widget-auto .auto__title'], [18]);
    }, false);


    fixTableHead();

});


$(window).load(function(){

    if($(window).width() <= 560){
        //var logo = $(".header__logo"),
        //    src = logo.attr("src").split("/");
        //src.splice(-1,1, "logo-mobile.png");
        //src = src.join("/");
        //logo.attr("src",src);
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
        if($(".widget-price .tabs-titles__el:not(.tabs-titles__el-mobile-selected)").length){
            $(".widget-price .tabs-titles__el:not(.tabs-titles__el-mobile-selected)")[0].click();
        }
    }
});

$(window).resize(resizeGrid);

function fixTableHead(){
    var tableWidget = $('.widget-routes'),
        tHead = tableWidget.find('.routes-table-head'),
        tBody = $('.routes-table-body'),
        pageHeader = $('.header'),
        tHeadOffset = tHead.offset().top,
        w  = $(window);


    setBodyIndent();


    w.scroll(function(){

        var windowScroll = w.scrollTop(),
            pageHeaderHeight = pageHeader.height();

        if(windowScroll >= tHeadOffset){
            tHead.css({
                'top': windowScroll - tHeadOffset + pageHeaderHeight
            });
        }else{
            tHead.css({
                'top': 0
            });
        }

    });


    function setBodyIndent(){
        var indent = tHead.height();
        tBody.css({'marginTop': indent});
    }
}

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

function liveSearchExcursions(){
    var els = $('.live__search-el');

    els.on('click', function () {
        var el = $(this),
            textField = el.find('.live__search-header-content'),
            inputField = el.find('.live__search-field');

        el.addClass('live__search-active');
        textField.hide();
        inputField.show().focus()
            .on('change', function () {

            })
            .on('focusout', function () {
                textField.text($(this).val()).show();
                $(this).hide();
                el.removeClass('live__search-active');
            });

    });

}

function cropStrings(arr,length){
    arr.forEach(function (item,i) {
        var els = $(item);
        if(els.length){
            els.each(function () {
                var el = $(this),
                    text = el.text().trim(),
                    cropedText;
                (text.length > length[i]) ? cropedText = text.substring(0,parseInt(length[i]))+'...' : cropedText = text;
                el.text(cropedText);
            });
        }
    });
}

function cropReviewsText(){
    var els = $('.widget-reviews-list .reviews-slider-el-content'),
        CROPED_TEXT_LENGTH = 250;

    els.each(function () {
        var el = $(this),
            review = el.find('.reviews-slider-el__text'),
            reviewText = review.text(),
            moreBtn = el.find('.reviews-slider-el__more');

        if(reviewText.length > CROPED_TEXT_LENGTH){
            review.text(
                reviewText.substring(0, CROPED_TEXT_LENGTH)+'...'
            );
            moreBtn.addClass('show').on('click', function (e) {
                review.text(reviewText);
                $(this).removeClass('show').hide();
                e.preventDefault();
            });
        }
    });
}