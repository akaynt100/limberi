var TabsAjax = function(el){
    var url = $("#subcat_sort_params").attr("ajax_url"),
        tabs = el.find("[data-category]"),
        container = el.find(".tabs-container"),
        self = this,
        mobileBtn = $(".tabs-titles__el-mobile-selected"),
        ratings = new RatingWidget();

    var init = function(){

        bindSettings();

        tabs[0].click();
        return self;
    };

    var bindSettings = function () {
        tabs.on("click",tabClick);
        if($(window).width() <= 768){
            mobileBtn.on("click",mobileTabsDrop);
            tabs.on("click",mobileTabsSelect);
        }
    };

    var tabClick = function (e) {
        var el = $(this),
			sort_params_id = $("#subcat_sort_params"),
			pr = sort_params_id.attr("parent"),
			sortby = sort_params_id.attr("sortby"),
			sortdir = sort_params_id.attr("sortdir"),
            param = el.data("category");
		var dann =  "&parent="+pr+"&group="+param+"&sortby="+sortby+"&sortdir="+sortdir,
			beforeSend = function(){
				$(".spinner").show();
			};
			
		/*dann.data="&parent="+pr+"&group="+param+"&sortby="+sortby+"&sortdir="+sortdir;
		dann.beforeSend = function(){
			$(".spinner").show();
		};*/
        var promise = http(url,dann,beforeSend);
		
        promise.success(function(data){
            cleanContainer();
            tabs.removeClass("tabs-titles__el_active");
            el.addClass("tabs-titles__el_active");
			$(".spinner").hide();
            data.forEach(function (item,i) {
                createElems(item);
            });
            ratings.setElements($('.rating-wrap-async'));
            ratings.init();
        });

        e.preventDefault();
    };

    var mobileTabsDrop = function () {
        var el = $(this).parent();
        el.find(".tabs-titles__el:not(.tabs-titles__el-mobile-selected)").toggle();

    };
    var mobileTabsSelect = function () {
        var el = $(this),
            parent = el.parent();
        parent.find(".tabs-titles__el-mobile-text").text(el.text());
        parent.find(".tabs-titles__el:not(.tabs-titles__el-mobile-selected)").hide();
    };

    var createElems = function (data) {
        var widget = container.find(".tmpl-for-cloning").clone().removeClass('tmpl-for-cloning').appendTo(container);

        widget.find("a.widget-content").attr({"href": data.url});
		widget.find(".auto__image").attr({"src": data.image , "data-lg-img": data.image});
        widget.find(".auto__title").text(data.title);
        widget.find(".rating-wrap-async").attr("data-rating-value",data.rating);
        widget.find(".rating__value-text").text(data.rating);
        widget.find(".rating__reviews-count").text(data.reviews_count);
        widget.find(".auto-sits-count").text(data.sits + " мест");
        widget.find(".auto-price").text("от " + data.price +" $");

        return widget;
    };

    var cleanContainer = function () {
        container.find(".widget:not(.tmpl-for-cloning)").remove();
        ratings.destroy();
    };

    return init();

};