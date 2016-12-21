var RatingWidget = function(){
    var elements = $('.rating-wrap');

    var setRatings = function () {
        elements.each(function(i){
            var initRating = $(this).data("ratingValue");
            $(this).find('.rating').barrating({
                theme: 'fontawesome-stars-o',
                initialRating: initRating,
                showSelectedRating: false,
                readonly: true
            }).addClass("rating-font-size");

        });
    };

    this.destroy = function(){
        elements.each(function(){
            $(this).find('.rating').barrating("destroy");
        });
    };

    this.init = function () {
        setRatings();
        return this;
    };

    this.setElements = function (elements_) {
        elements = elements_;
    };
};