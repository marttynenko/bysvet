$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

$.fn.Tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};


 jQuery.validator.setDefaults({
  errorClass: 'invalid',
	successClass: 'valid',
	focusInvalid: false,
	errorElement: 'span',
	errorPlacement: function (error, element) {
    if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
      element.closest('label').after(error);
      
    } else if (element.parent().hasClass('jq-selectbox')) {
      element.closest('.jq-selectbox').after(error);
    } else {
      error.insertAfter(element);
    }
  },
  highlight: function(element, errorClass, validClass) {
    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().addClass(errorClass).removeClass(validClass);
    } else {
    	$(element).addClass(errorClass).removeClass(validClass);
    }
  },
  unhighlight: function(element, errorClass, validClass) {
  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().removeClass(errorClass).addClass(validClass);
    } else {
    	$(element).removeClass(errorClass).addClass(validClass);
    }
  }
});
//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  email: "Некорректный email адрес",
  url: "Некорректный URL",
  number: "Некорректный номер",
  digits: "Это поле поддерживает только числа",
  equalTo: "Поля не совпадают",
  maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
  minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});
//кастомные методы валидатора
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
}, "Только буквы");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
}, "Некорректный формат"); 


//функция для навешивания изображений фоном
function backgrounded (selector) {
	$(selector).each(function(){
		var $this = $(this),
		$src = $this.find('.bg').attr('src');
		if($this.find('.bg').length) {
			$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
		}
	});
}


//lazy load для сторонних либ
function lazyLibraryLoad(scriptSrc,linkHref,callback) {
  let script = document.createElement('script');
  script.src = scriptSrc;
	document.querySelector('#wrapper').after(script);

  if (linkHref !== '') {
    let style = document.createElement('link');
    style.href = linkHref;
    style.rel = 'stylesheet';
    document.querySelector('link').before(style);
  }

  script.onload = callback
}

const Store = {
	files: [],
	removeFile: function(index) {
	  this.files.splice(index, 1);
	},
	addFiles: function(files) {
	  this.files = this.files.concat(files);
	},
	readURL: function(e,input,block) {
		const that = this;
		if (!e.target.files.length) { return }
	  const files = Object.keys(e.target.files).map((i) => e.target.files[i]);
	  that.addFiles(files);

	  for (var i = 0; i < that.files.length; i++) {
			var reader = new FileReader();
			$(block).find('.ui-files-preview').remove();
			reader.onload = function (e) {
				var image = document.createElement('img');
				var span = document.createElement('span');
				image.setAttribute('src',e.target.result);
				span.setAttribute('class','ui-files-preview');
				span.setAttribute('data-index',i);
				span.appendChild(image);
				$(span).append('<i class="ui-files-preview-delete"></i>');
				$(block).append(span);
			};
			reader.readAsDataURL(that.files[i]);
		}
	  e.target.value = '';
	},
	generateFormData: function(formData) {
		// const formData = new FormData();
		this.files.map((file, index) => {
				formData.append(`file${index + 1}`, file);
		});
		// return formData;
	}
}


jQuery(document).ready(function($){

	$('.slick-top').slick({
		arrows: false,
		dots: true
	})

	let slickOffers = $('.slick-offers').slick({
		slidesToShow: 5,
		infinite: false,
		appendArrows: $('.slick-offers-arrows')
	})

	$('.slick-offers-filter').on('click',function(e){
		e.preventDefault()
		const value = $(this).data('filter');
		if (value != 'all') {
			slickOffers
			.slick('slickUnfilter')
			.slick('slickFilter', $(`[data-filter=${value}]`).closest('.slick-slide'));
		} else {
			slickOffers.slick('slickUnfilter')
		}
		$('.slick-offers-filter').removeClass('active')
		$(this).addClass('active')
	});


	$('.slick-partners').slick({
		arrows: false,
		// variableWidth: true,
		slidesToShow: 6
	})


	$('.slick-card').slick({
		arrows: false,
		dots: true
	})


	$(document).on('click','.ui-variants-toggler',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$(this).next('.ui-variants-drop').slideToggle(50);
	})
	$(document).on('change','.ui-variants-item input',function(e){
		const name = $(this).attr('data-name') || '';
		const img = $(this).attr('data-img') || '';
		$('.ui-variants-toggler-img img').attr('src',img)
		$('.ui-variants-toggler-name').text(name);
	});


	$('.pr-card-table-toggler a').on('click',function(e){
		e.preventDefault();
		const text = $(this).text();
		if (text === 'Показать все характеристики') {
			$('.pr-card-table').addClass('collapsed');
			$(this).text('Скрыть подробные характеристики');
		} else {
			$('.pr-card-table').removeClass('collapsed');
			$(this).text('Показать все характеристики');
		}
	})


	$('.slick-related').slick({
		slidesToShow: 4,
		infinite: false,
		appendArrows: $('.slick-related-arrows')
	})

	
	$('.goods-block').each(function(key,item){
		$(item).find('.goods-block-arrows').attr('id',`goods_arrows_${key}`)
		$(item).find('.slick-goods').attr('id',`goods_slick_${key}`)
		$(`#goods_slick_${key}`).slick({
			infinite: false,
			slidesToShow: 6,
			appendArrows: $(`#goods_arrows_${key}`)
		})
	});

	lazyLibraryLoad(
		'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.10.0/js/lightgallery.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.10.0/css/lightgallery.min.css',
		() => {
			$(".slick-card").lightGallery({
				selector: 'a.lightgallery',
				download: false
			});
			
		}
	)


	//увеличиваем значение
	$(document).on('click', '.ui-amount-plus', function(){
		var thisInput = $(this).prev('input'),
				thisInputVal = parseInt(thisInput.val(), 10);

		if (isNaN(thisInputVal)) {
			thisInput.val(1);
		} else {
			thisInput.val(parseInt(thisInput.val(), 10) + 1);
		}
	});
	//уменьшаем значение
	$(document).on('click', '.ui-amount-minus', function(){
		var thisInput = $(this).next('input'),
				thisInputVal = parseInt(thisInput.val(), 10);

		if (isNaN(thisInputVal)) {
			thisInput.val(0);
		} else {
		 if (thisInputVal < 1) {
			 thisInput.val(0);
		 } else {
			 thisInput.val(parseInt(thisInput.val(), 10) - 1);
		 }
		}
	});
	$(document).on('change','.ui-amount-input',function(e){
		let val = parseInt($(this).val(),10);
		if (val < 0) {
			$(this).val(0);
		}
	});


	//отображаем скрытые фильтры
	$(document).on('click','.filters-variants-toggler',function(e){
		e.preventDefault();
		e.stopPropagation();
		const variants = $(this).prev('.filters-variants');

		if (this.isCollapsed === undefined) {
			variants.find('.hidden-variant').addClass('visible')
			this.isCollapsed = $(this).find('a').text()
			$(this).find('a').text('Свернуть')
		} else {
			variants.find('.hidden-variant').removeClass('visible')
			$(this).find('a').text(this.isCollapsed)
			this.isCollapsed = undefined
		}
	})


	//переключаем режимы отображения каталога
	$(document).on('click','.catalog-style-link',function(e) {
		e.preventDefault();
		if ($(this).hasClass('active')) {return}

		const style = $(this).attr('data-style') || 'grid';
		$('.catalog-style-link').removeClass('active');
		$(this).addClass('active');
		$('.catalog-list').attr('data-style',style)
		localStorage.setItem('catalogStyle',style)
	})
	if (localStorage.getItem('catalogStyle') && $('.catalog-settings').length) {
		const style = localStorage.getItem('catalogStyle')
		$('.catalog-list').attr('data-style',style)
		$('.catalog-style-link').removeClass('active');
		$('.catalog-style-link[data-style="'+style+'"]').addClass('active');
	}



	//добавляем файлы в хранилище и отображаем превью
	$(".bid input[type=file]").on('change', function(e){
		Store.readURL(e, this, '.ui-files');
	});
	//удаляем файлы из хранилища
	$(document).on('click','.ui-files-preview-delete',function(e){
		e.preventDefault();
		const index = parseInt($(this).attr('data-index'),10);
		Store.removeFile(index);
		$(this).parent().fadeOut(100).remove();
	})
	$(document).on('click','.bid-field-toggler',function(e){
		e.preventDefault();
		const fieldId = $(this).attr('data-id') || '';
		$('.bid .ui-field[data-id="'+fieldId+'"]').removeClass('hidden');
		$(this).parent().fadeOut(100).remove();
	});


	

	//
	//Склеиваем данные формы с изображениями и отправляем обработчику
	//
	$(document).on('submit','#offer_form',function(e){
		e.preventDefault();
		let form_data = new FormData($(this)[0]);
		if (Store.files.length) {
			Store.generateFormData(form_data);
		}
		/* $.ajax({
			url: '',
			method: 'POST',
			data: form_data
			...
		}) */
	})

	$(document).on('click','.scroll-to',function(e){
		e.preventDefault();
		const target = $(this).attr('data-target') || null;
		if (target !== null) {
			let offset = $(target).offset().top;
			$('html,body').animate({
				scrollTop:offset
			},300)
		}
	})


	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}

	// backgrounded('.backgrounded');


	


	// $(".gallery-group").lightGallery({
	// 	selector: 'a.gallery-item',
	// 	download: false
	// });


	// $(document).on('click','.gallery-loader',function(e){
	// 	e.preventDefault();
	// 	const btn = $(this);
	// 	const href = this.dataset.href || null;
	// 	const gallery = $(this).closest('.gallery-group').find('.gallery-items');
	// 	if (href) {
	// 		$.ajax({
	// 			type: "GET",
	// 			url: href,
	// 			success: function(data) {
	// 				btn.hide();
	// 				gallery.append(data);
	// 				$(".gallery-group").data('lightGallery').destroy(true);
	// 				$(".gallery-group").lightGallery({
	// 					selector: 'a.gallery-item',
	// 					download: false
	// 				});
	// 			},
	// 			error: function() {
	// 				btn.hide();
	// 				gallery.append('<div class="col-12"><div class="alert">Произошла непредвиденная ошибка. Попробуйте позже или обратитесь в поддержку сайта</div></div>');
	// 				setTimeout(function(){
	// 					btn.show();
	// 					gallery.find('.alert').remove();
	// 				},5500);
	// 			}
	// 		})
	// 	}
	// })
	


	if ( $('.ya-share2').length ) {
		var shareScript = document.createElement('script');
		shareScript.src = '//yastatic.net/share2/share.js';
		document.body.appendChild(shareScript);
	}


	$('main table').wrap('<div class="responsive-table"></div>');


	//mfp для видео
  $('.mfp-video').magnificPopup({
    type: 'iframe',
    mainClass: 'magnific-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
	});
	

	$(document).on('click','.mfp-custom-close',function(e){
		e.preventDefault();
		$.magnificPopup.close();
	});
   

	//инициализация MFP popup для форм
	$(document).on('click','.ajax-mfp',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
			},
			callbacks: {
				open: function () {
					setTimeout(function(){
						$('.mfp-wrap').addClass('not_delay');
						$('.white-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});


	//мобильное меню
	const mobileMenu = {
		cats: $('.main-menu ul').clone().removeAttr('class').addClass('mm-cats'),
		links: $('.h-top-menu ul').clone().addClass('mm-links'),
		contacts: $('.h-top-contacts').clone().removeAttr('class').addClass('mm-contacts'),
		html: '<!--noindex--><div class="mobile-menu"></div><!--/noindex-->',
		parseMenu() {
			$('body').append(this.html);
			$('.mobile-menu').prepend(this.contacts, this.cats, this.links);
			$('.mobile-menu a').attr('rel','nofollow');
		},
		toggleMenu(toggler) {
			$(toggler).on('click',function(e){
				e.preventDefault();
				$(this).toggleClass('opened');
				$('.mobile-menu').toggleClass('opened');
			})
		}
	}
	mobileMenu.parseMenu();
	mobileMenu.toggleMenu('.mm-toggler');


	function createMobileContacts() {
		var contacts = $('.h-top-contact-link').clone().removeClass('h-top-contact-link').addClass('mm-contact-link');
		if (!contacts && contacts.length < 2) { return;}

		var mail = contacts[0];
		var phone = contacts[1];
		$(mail).addClass('mm-mail').text('');
		$(phone).addClass('mm-phone').text('');
		$('.mm-toggler').after(mail,phone);
	}
	createMobileContacts();


	//стилизация элементов форм
	$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
		// singleSelectzIndex: '1',
	});


	// document.querySelectorAll('a').addEventListener('click',clickHandler)
	

	//подгружаем библиотеку и иниц. маску
	if ($('.mask-phone').length) {
		lazyLibraryLoad(
			'https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/5.0.5/jquery.inputmask.min.js',
			'',
			function() {
				$('.mask-phone').inputmask('+999 (99) 999-99-99',{
				})
				$('.mask-phone').on('focus',function(){
					if (this.value == '') {
						this.value = '+375'
					}
				})
			}
		)
	}
	

});//ready close