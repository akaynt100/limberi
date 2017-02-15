(function(){
    var SRCSET_WINDOW_WIDTH_INDEX = 1,
        SRCSET_PATH_INDEX = 0;

    var ImageReplacer = function (callback) {
        var images = $('[data-custom-srcset]');

        images.each(function(){
            var image = $(this),
                srcset = image.data('customSrcset').split(', '),
                windowWidth = parseInt($(window).width()),
                max,
                min,
                src='';

            srcset.forEach(function (item, i) {
                var srcsetCase = item.split(' | ');
                if(srcsetCase.length >2) return;
                if(i==0){ min = srcsetCase; max = srcsetCase; return;}

                if(parseInt(srcsetCase[SRCSET_WINDOW_WIDTH_INDEX]) < parseInt(min[SRCSET_WINDOW_WIDTH_INDEX])){
                    min = srcsetCase;
                }
                if(parseInt(srcsetCase[SRCSET_WINDOW_WIDTH_INDEX]) > parseInt(max[SRCSET_WINDOW_WIDTH_INDEX])){
                    max = srcsetCase;
                }
            });

            if(windowWidth >= max[SRCSET_WINDOW_WIDTH_INDEX]){
                src = max[SRCSET_PATH_INDEX];
            }

            if(windowWidth <= min[SRCSET_WINDOW_WIDTH_INDEX]){
                src = min[SRCSET_PATH_INDEX];
            }

            if(windowWidth > min[SRCSET_WINDOW_WIDTH_INDEX] && windowWidth < max[SRCSET_WINDOW_WIDTH_INDEX]){
                var higher = [],
                    maxLower = ['',0],
                    minHigher;

                for(var j=0; j < srcset.length; j++){
                    var item = srcset[j].split(' | ');
                    if(windowWidth > item[SRCSET_WINDOW_WIDTH_INDEX]){
                        if(item[SRCSET_WINDOW_WIDTH_INDEX] > maxLower[SRCSET_WINDOW_WIDTH_INDEX]){
                            maxLower = item;
                        }
                    }
                }
                src = maxLower[SRCSET_PATH_INDEX];
            }
            image.attr('data-src',src);
        });

        setImageHeight();

        if(callback) {
            callback();
        }
    };

    var setImageHeight = function (callback) {
        var images = $('[data-computed-height-set]');

        images.each(function(){
            var image = $(this),
                hSet = image.data('computedHeightSet').split(', '),
                windowWidth = parseInt($(window).width()),
                max,
                min,
                height='';

            hSet.forEach(function (item, i) {
                var hSetCase = item.split(' | ');
                if(hSetCase.length >2) return;
                if(i==0){ min = hSetCase; max = hSetCase; return;}

                if(parseInt(hSetCase[SRCSET_WINDOW_WIDTH_INDEX]) < parseInt(min[SRCSET_WINDOW_WIDTH_INDEX])){
                    min = hSetCase;
                }
                if(parseInt(hSetCase[SRCSET_WINDOW_WIDTH_INDEX]) > parseInt(max[SRCSET_WINDOW_WIDTH_INDEX])){
                    max = hSetCase;
                }
            });

            if(windowWidth >= max[SRCSET_WINDOW_WIDTH_INDEX]){
                height = max[SRCSET_PATH_INDEX];
            }

            if(windowWidth <= min[SRCSET_WINDOW_WIDTH_INDEX]){
                height = min[SRCSET_PATH_INDEX];
            }

            if(windowWidth > min[SRCSET_WINDOW_WIDTH_INDEX] && windowWidth < max[SRCSET_WINDOW_WIDTH_INDEX]){
                var higher = [],
                    maxLower = ['',0],
                    minHigher;

                for(var j=0; j < hSet.length; j++){
                    var item = hSet[j].split(' | ');
                    if(windowWidth > item[SRCSET_WINDOW_WIDTH_INDEX]){
                        if(item[SRCSET_WINDOW_WIDTH_INDEX] > maxLower[SRCSET_WINDOW_WIDTH_INDEX]){
                            maxLower = item;
                        }
                    }
                }
                height = maxLower[SRCSET_PATH_INDEX];
            }
            image.attr('data-computed-height',height);
        });

        if(callback) {
            callback();
        }
    };

    window.ImageReplacer = ImageReplacer;

    $(window).load(function(){
        var lazySlideShow;

        document.addEventListener("afterScroll", function(event) {
            sliderResize();
        }, false);

        document.addEventListener("lazyLoadInited", function(event) {
            lazySlideShow = UIkit.slideshow('.lazy-slider', {animation: 'Swipe',autoplay:false});
            sliderResize();
        }, false);

        ImageReplacer(function () {
            lazySizes.init();
        });

        function sliderResize(){
            setTimeout(function () {
                lazySlideShow.resize(function () {
                    $('.car-slider').removeClass('car-slider-init-position');
                    $('.car-slider-preview').hide();
                });
            },250);

            //lazySlideShow.resize();
            //$('.car-slider').removeClass('car-slider-init-position');
            //$('.car-slider-preview').hide();
        }
    });
})();