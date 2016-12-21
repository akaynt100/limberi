(function($){
    jQuery.fn.tabs = function(){
        var tabs = this;
        var createTabs = function(){
            var i = 0;
            var showTab = function(i){
                tabs.children("div").children("div").hide();
                tabs.children("div").children("div").eq(i).show();
                tabs.children("ul").children("li").removeClass("tabs-titles__el_active");
                tabs.children("ul").children("li").eq(i).addClass("tabs-titles__el_active");
            };

            showTab(0);

            $(tabs).children("ul").children("li").each(function(index, element){
                $(element).attr("data-tab", i);
                i++;
            });

            $(tabs).children("ul").children("li").click(function(){
                showTab(parseInt($(this).attr("data-tab")));
            });
        };
        return this.each(createTabs);
    };
})(jQuery);