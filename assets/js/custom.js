$(document).ready(function(){
	/*Added from Rising13*/
	$(".widget-cars-filter .filters .filter-dropdown .filter-dropdown-el").on("click",function(event) {
		event.preventDefault();
		var el = $(this);
		var sortby  = el.children().attr("sortby");
		var sortdir = el.children().attr("sortdir");
		$("#subcat_sort_params").attr("sortby",sortby);
		$("#subcat_sort_params").attr("sortdir",sortdir);
		$(".tabs-titles-cars .tabs-titles__el_active").click();
	});

	$(".widget-price .filters .filter-dropdown .filter-dropdown-el").on("click",function(event) {
		event.preventDefault();
		var el = $(this);
		var sortby  = el.children().attr("sortby");
		var sortdir = el.children().attr("sortdir");
		var parent = $('#price_sort_params').attr('parent');
		var url = $('#price_sort_params').attr('ajax_url');
		var inProgress = false;
		var dann =  "&parent="+parent+"&sortby="+sortby+"&sortdir="+sortdir,
		beforeSend = function(){
			$(".spinner").show();
			inProgress = true;
		},
			success = function(msg){ 	
			$('.tabs-container').html(msg);
			$(".spinner").hide();
			inProgress = false;
			$(".widget-price").priceTabsWidget();
		},
			error = function (xhr) {
			var error_text = "<span style='color: red;'>Ошибка ";
			error_text = error_text + xhr + "К сожалению, при отправке запроса возникли проблемы.";
			alert(error_text);
		};
		if(!inProgress) {
			$.ajax({
				type: "GET",
				url: url,
				data: dann,
				beforeSend: beforeSend,
				success: success,
				error: error
			});		
		}	
	});
});	