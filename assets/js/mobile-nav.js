$(window).load(function(){
    if($(window).width() <= 768){
        var script = document.createElement('script');

        $('a').attr('rel', 'external');

        script.src = 'http://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js';
        document.body.appendChild(script);

        script.onload = function () {
            $.event.special.tap.tapholdThreshold = 500;

            $('.header-nav-list > .with-submenu:not(.more-mobile)')
                .on("tap",function(e){
                    $(this).find('.header-nav-submenu').show();
                    e.preventDefault();
                })
                .on("taphold",function(){
                    var url = $(this).find('>.header-nav-list-el__link').attr('href');
                    document.location.href = url;
                });
        };
    }

});