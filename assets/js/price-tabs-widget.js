(function($){
    jQuery.fn.priceTabsWidget = function(){
        var tabs = $(this),
            tabsContent = tabs.find("[data-tab-content]"),
            tabsBtns = tabs.find("[data-tab]");
        var createTabs = function(){
            //var i = 0;
            var showTab = function(i){
                tabsContent.hide();
                tabsContent.each(function () {
                    if($(this).data("tabContent") == i){
                        $(this).show();
                    }
                });

            };

            //showTab(1);

            tabsBtns.click(function(){
                tabsBtns.removeClass("tabs-titles__el_active");
                $(this).addClass("tabs-titles__el_active");
                showTab(parseInt($(this).data("tab")));
            });

            tabsBtns[0].click();
        };
        return this.each(createTabs);
    };
})(jQuery);