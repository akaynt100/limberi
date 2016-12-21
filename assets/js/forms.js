/*Added Rising13*/

/*form form_order_car (Форма заказать автомобиль)*/

function clos_clear_order_car() {
    $('.widget-discount-form input[name="phone"]').removeClass("error");
    $('.widget-discount-form input[name="phone"]').val('+375 ');
    $('.widget-discount-form input[name="email_back"]').val('');
	$('.popup-cover-wrap .rent-car-form-close-btn-wrap').click();
}


$(document).ready(function () {
	
	$('.popup-cover-wrap .rent-car-form-close-btn-wrap').click(function() {
		$('.widget-discount-form input[name="phone"]').removeClass("error");
		$('.widget-discount-form input[name="phone"]').val('+375 ');
		$('.widget-discount-form input[name="email_back"]').val('');
	});

    $('.widget-discount-form input').focus(function () {
        $(this).removeClass("error");
    });

	$('.widget-discount-form input[name="phone"]').blur(function () {
        var regphone = /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/;
        var s2 = $('.widget-discount-form input[name="phone"]').val();
        $('.widget-discount-form input[name="phone"]').removeClass("error");
        if ((s2.length < 6) || (!regphone.test(s2)) || (s2.length >= 30)) {
            $('.widget-discount-form input[name="phone"]').addClass("error");
        }
    });

    $(".widget-discount-form").submit(function () {
        return false;
    });

    $('.widget-discount-form input[type="submit"]').on("click", function () {
		var regphone = /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/;
        var valid = false;

		$('.widget-discount-form input[name="phone"]').removeClass("error");
		
        var s1 = $('.popup-cover-wrap .rent-car-form__name').html();
		var s2 = window.location.href;
        var s3 = $('.widget-discount-form input[name="phone"]').val();
        var s4 = $('.widget-discount-form input[name="email_back"]').val();
        var s5 = $('.widget-discount-form input[name="type_form"]').val();

        if (((s3.length>=6) && (regphone.test(s3)) && (s3.length<30)) && (s4.length === 0)) {
            valid = true;
        } else {
            if ((s3.length < 6) || (!regphone.test(s3)) || (s3.length >= 30)) {
                $('.widget-discount-form input[name="phone"]').addClass("error");
            }
            if (s4.length !== 0) {
                $('.widget-discount-form .rent-car-form__name').html("Спам!!!");
            }
        }
        if (valid === true) {
            var z = '&auto_name='+s1+'&auto_url='+s2+'&phone='+s3+'&email_back='+s4+'&type_form='+s5;
            var a_url = $('.widget-discount-form').attr('action');
            form_order_car_ajax(z, a_url);
        }
    });
});

function form_order_car_ajax(val, url_ajax) {
    $.ajax({
        type: "POST",
        url: url_ajax,
        data: val,
        error: function (xhr) {
            var error_text = "<span style='color: red;'>Ошибка ";
            error_text = error_text + xhr + "К сожалению, при отправке сообщения возникли проблемы. Попробуйте отправить позже";
			sweetAlert({title:"Ошибка",text:error_text,type:"error",timer:5000});
        },
	success: function (response) {
            switch (response) {
                case "yes":
			sweetAlert({title:"Успешная отправка",text:"Спасибо, ваше сообщение отправлено, наши менеджеры скоро свяжутся с вами",type:"success",timer:5000});
                    break
                case "error":
					sweetAlert({title:"Ошибка",text:"К сожалению, при отправке сообщения возникли проблемы. Попробуйте отправить позже",type:"error",timer:5000});
                    break
                case "resubmission_val":
                    sweetAlert({title:"Повторная отправка",text:"Ваше сообщение уже отправлено, нет нужды отправлять его повторно",type:"error",timer:5000});
                    break

                case "spam":
                   sweetAlert({title:"Спам!!!",text:"Сообщение отправлено спам-ботом",type:"error",timer:5000});
                    break

                default:
                    sweetAlert({title:"Ошибка",text:"К сожалению, при отправке сообщения возникли проблемы. Попробуйте отправить позже",type:"error",timer:5000});	
            }
			setTimeout(function () {
				clos_clear_order_car();
			},5000);	
        }
    });
}


/*form form_review (Форма оставить отзыв)*/

function clos_clear_review_form() {
    $('.reviews-form input[name="name"]').removeClass("error");
	$('.reviews-form textarea[name="message"]').removeClass("error");
	$('.reviews-form input[name="name"]').val('');
	$('.reviews-form textarea[name="message"]').val('');
    $('.reviews-form input[name="email_back"]').val('');
	$('.reviews-form select option').prop('selected',false);
	$('.br-widget > a').removeClass("br-current");
	$('.br-widget > a').removeClass("br-selected");
}


$(document).ready(function () {

    $('.reviews-form input').focus(function () {
        $(this).removeClass("error");
    });
	
	$('.reviews-form textarea').focus(function () {
        $(this).removeClass("error");
    });

    $('.reviews-form input[name="name"]').blur(function () {
        var regname = /^[а-яА-ЯёЁa-zA-Z -]+$/;
        var s1 = $('.reviews-form input[name="name"]').val();
        $('.reviews-form input[name="name"]').removeClass("error");
        if ((s1.length < 2) || (!regname.test(s1)) || (s1.length >= 60)) {
            $('.reviews-form input[name="name"]').addClass("error");
        }
    });
	
	$('.reviews-form textarea[name="message"]').blur(function() {
		var s2=$('.reviews-form textarea[name="message"]').val();
		$('.reviews-form textarea[name="message"]').removeClass("error");
		if(s2.length<2){
			$('.reviews-form textarea[name="message"]').addClass("error");
		}
	});

    $(".reviews-form").submit(function () {
        return false;
    });

    $('.reviews-form input[type="submit"]').on("click", function () {
		var regname = /^[а-яА-ЯёЁa-zA-Z -]+$/;
        var valid = false;

		$('.reviews-form input[name="phone"]').removeClass("error");
		
		var s1 = $('.reviews-form input[name="name"]').val();
		var s2 = $('.reviews-form select[name="rating"]').val();
        var s3 = $('.reviews-form textarea[name="message"]').val();
        var s4 = $('.reviews-form input[name="email_back"]').val();
        var s5 = $('.reviews-form input[name="type_form"]').val();
		
		if (((s1.length >= 2) && (regname.test(s1)) && (s1.length < 60)) && (s3.length>=2) && (s4.length === 0)) {
            valid = true;
        } else {
            if ((s1.length < 2) || (!regname.test(s1)) || (s1.length >= 60)) {
                $('.reviews-form input[name="phone"]').addClass("error");
            }
			if (s3.length < 2) {
                $('.reviews-form textarea[name="message"]').addClass("error");
            }
            if (s4.length !== 0) {
                $('.reviews-form .rent-car-form__name').html("Спам!!!");
            }
        }
        if (valid === true) {
            var z = '&name='+s1+'&rating='+s2+'&message='+s3+'&email_back='+s4+'&type_form='+s5;
            var a_url = $('.reviews-form').attr('action');
            form_order_review(z, a_url);
        }
    });
});

function form_order_review(val, url_ajax) {
    $.ajax({
        type: "POST",
        url: url_ajax,
        data: val,
        error: function (xhr) {
            var error_text = "<span style='color: red;'>Ошибка ";
            error_text = error_text + xhr + "К сожалению, при отправке сообщения возникли проблемы. Попробуйте отправить позже";
			sweetAlert({title:"Ошибка",text:error_text,type:"error",timer:5000});
        },
	success: function (response) {
            switch (response) {
                case "yes":
			sweetAlert({title:"Успешная отправка",text:"Спасибо, ваше сообщение отправлено, наши менеджеры скоро свяжутся с вами",type:"success",timer:5000});
                    break
                case "error":
					sweetAlert({title:"Ошибка",text:"К сожалению, при отправке сообщения возникли проблемы. Попробуйте отправить позже",type:"error",timer:5000});
                    break
                case "resubmission_val":
                    sweetAlert({title:"Повторная отправка",text:"Ваше сообщение уже отправлено, нет нужды отправлять его повторно",type:"error",timer:5000});
                    break

                case "spam":
                   sweetAlert({title:"Спам!!!",text:"Сообщение отправлено спам-ботом",type:"error",timer:5000});
                    break

                default:
                    sweetAlert({title:"Ошибка",text:"К сожалению, при отправке сообщения возникли проблемы. Попробуйте отправить позже",type:"error",timer:5000});	
            }
			setTimeout(function () {
				clos_clear_review_form();
			},5000);	
        }
    });
}


/*form form_feedback (Форма обратной связи)*/

function clos_clear_request() {
    $('.form_feedback input[name="name"]').removeClass("error");
	$('.form_feedback input[name="email"]').removeClass("error");
    $('.form_feedback input[name="phone"]').removeClass("error");
	$('.form_feedback textarea[name="message"]').removeClass("error");

	
    $('.form_feedback input[name="name"]').val('');
	$('.form_feedback input[name="email"]').val('');
    $('.form_feedback input[name="phone"]').val('');
	$('.form_feedback textarea[name="message"]').val('');
    $('.form_feedback input[name="email_back"]').val('');
	$(".form_feedback input:checkbox").removeAttr("checked");
	$('.form_feedback select').prop('selectedIndex',0);
	
	$('.form_feedback input[type="file"]').val('');
	$('.progress2').hide('');
}


$(document).ready(function () {

    $('.form_feedback input').focus(function () {
        $(this).removeClass("error");
    });
	
	$('.form_feedback textarea').focus(function () {
        $(this).removeClass("error");
    });

    $('.form_feedback input[name="name"]').blur(function () {
        var regname = /^[а-яА-ЯёЁa-zA-Z -]+$/;
        var s1 = $('.form_feedback input[name="name"]').val();
        $('.form_feedback input[name="name"]').removeClass("error");
        if ((s1.length < 2) || (!regname.test(s1)) || (s1.length >= 60)) {
            $('.form_feedback input[name="name"]').addClass("error");
        }
    });
	
	$('.form_feedback input[name="email"]').blur(function() {
		var regmail=/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
		var s3=$('.form_feedback input[name="email"]').val();
		$('.form_feedback input[name="email"]').removeClass("error");
		if(!regmail.test(s3) && s3!=""){
			$('.form_feedback input[name="email"]').addClass("error");
		}
	});

	$('.form_feedback input[name="phone"]').blur(function () {
        var regphone = /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/;
        var s2 = $('.form_feedback input[name="phone"]').val();
        $('.form_feedback input[name="phone"]').removeClass("error");
        if ((s2.length < 6) || (!regphone.test(s2)) || (s2.length >= 30)) {
            $('.form_feedback input[name="phone"]').addClass("error");
        }
    });
	
	$('.form_feedback textarea[name="message"]').blur(function() {
		var s3=$('.form_feedback textarea[name="message"]').val();
		$('.form_feedback textarea[name="message"]').removeClass("error");
		if(s3.length<2 && s3!=""){
			$('.form_feedback textarea[name="message"]').addClass("error");
		}
	});


    $('.form_feedback').submit(function (event) {
		event.preventDefault();
		
		var regmail=/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
		var regphone = /(\+)?([-\._\(\) ]?[\d]{2,20}[-\._\(\) ]?){2,10}/;
        var regname = /^[а-яА-ЯёЁa-zA-Z -]+$/;
        var valid = false;


		$('.form_feedback input[name="name"]').removeClass("error");
		$('.form_feedback input[name="email"]').removeClass("error");
		$('.form_feedback input[name="phone"]').removeClass("error");
		$('.form_feedback textarea[name="message"]').removeClass("error");

        var s1 = $('.form_feedback input[name="name"]').val();
		var s2 = $('.form_feedback input[name="email"]').val();
        var s3 = $('.form_feedback input[name="phone"]').val();
        var s4 = $('.form_feedback input[name="email_back"]').val();
		var s5 = $('.form_feedback textarea[name="message"]').val();
        var s6 = $('.form_feedback input[name="type_form"]').val();

        if (((s1.length >= 2) && (regname.test(s1)) && (s1.length < 60)) && ((regmail.test(s2)) || (s2.length === 0)) && ((s3.length>=6) && (regphone.test(s3)) && (s3.length<30)) && (s4.length === 0) && ((s5.length>=2) || (s5.length === 0))) {
            valid = true;
        } else {
            if ((s1.length < 2) || (!regname.test(s1)) || (s1.length >= 60)) {
                $('.form_feedback input[name="name"]').addClass("error");
            }
			
			if ((!regmail.test(s2)) && (s2.length!==0)) {
                $('.form_feedback input[name="email"]').addClass("error");
            }

            if ((s3.length < 6) || (!regphone.test(s3)) || (s3.length >= 30)) {
                $('.form_feedback input[name="phone"]').addClass("error");
            }

            if (s4.length !== 0) {
                $('#request .red p').html("Спам!!!");
            }
			
			if ((s5.length < 2) && (s5.length !== 0)) {
				$('.form_feedback textarea[name="message"]').addClass("error");
			}
        }
        if (valid === true) {
            form_feedback_ajax();
        }
		
    });
});

function form_feedback_ajax() {
	var bar = $('.bar2');
	var percent = $('.percent2');
	var status = $('#status2');
	var maxPercent = -5;
		
   $(".form_feedback").ajaxSubmit({
        error: function (xhr) {
            var error_text = "<span style='color: red;'>Ошибка ";
            error_text = error_text + xhr + "К сожалению, при отправке сообщения возникли проблемы. Попробуйте отправить позже";
			sweetAlert({title:"Ошибка",text:error_text,type:"error",timer:5000});
        },
		beforeSend: function () {
			status.empty();
			var percentVal = '0%';
			bar.width(percentVal)
			percent.html(percentVal);
			$('.progress2').show();
		},
		uploadProgress: function (event, position, total, percentComplete) {
			if (maxPercent < percentComplete) {
				var percentVal = percentComplete + '%';
				bar.width(percentVal)
				percent.html(percentVal);
				maxPercent = percentComplete;
			}
		},
		success: function () {
			var percentVal = '100%';
			bar.width(percentVal)
			percent.html(percentVal);
		},
		success: function (response) {
			var percentVal = '100%';
			bar.width(percentVal)
			percent.html(percentVal);
			console.log(response);
			switch (response) {
                case "yes":
			sweetAlert({title:"Успешная отправка",text:"Спасибо, ваше сообщение отправлено, наши менеджеры скоро свяжутся с вами",type:"success",timer:5000});
                    break
                case "error":
					sweetAlert({title:"Ошибка",text:"К сожалению, при отправке сообщения возникли проблемы. Попробуйте отправить позже",type:"error",timer:5000});
                    break
                case "resubmission_val":
                    sweetAlert({title:"Повторная отправка",text:"Ваше сообщение уже отправлено, нет нужды отправлять его повторно",type:"error",timer:5000});
                    break

                case "spam":
                   sweetAlert({title:"Спам!!!",text:"Сообщение отправлено спам-ботом",type:"error",timer:5000});
                    break

                default:
                    sweetAlert({title:"Ошибка",text:"К сожалению, при отправке сообщения возникли проблемы. Попробуйте отправить позже",type:"error",timer:5000});	
            }
		},
		complete: function (response) {
			maxPercent = -5;
			console.log(response);
			setTimeout(function () {
				clos_clear_request();
			},5000);	
        }
    });
}