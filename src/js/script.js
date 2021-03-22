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
		appendArrows: $('.slick-offers-arrows'),
		responsive: [
			{
				breakpoint: 1140,
				settings: {
					slidesToShow: 4,
					arrows: false,
					dots: true
				}
			}, {
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					arrows: false,
					dots: true
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					arrows: false,
					dots: true
				}
			}, {
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true
				}
			}
		]
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
		slidesToShow: 6,
		responsive: [
			{
				breakpoint: 1140,
				settings: {
					slidesToShow: 5
				}
			}, {
				breakpoint: 992,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			}
		]
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
		appendArrows: $('.slick-related-arrows'),
		responsive: [
			{
				breakpoint: 1360,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1140,
				settings: {
					slidesToShow: 4,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true
				}
			}
		]
	})

	
	$('.goods-block').each(function(key,item){
		$(item).find('.goods-block-arrows').attr('id',`goods_arrows_${key}`)
		$(item).find('.slick-goods').attr('id',`goods_slick_${key}`)
		$(`#goods_slick_${key}`).slick({
			infinite: false,
			slidesToShow: 6,
			appendArrows: $(`#goods_arrows_${key}`),
			responsive: [
				{
					breakpoint: 1360,
					settings: {
						slidesToShow: 5
					}
				},{
					breakpoint: 1140,
					settings: {
						slidesToShow: 4,
						arrows: false,
						dots: true
					}
				},{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						arrows: false,
						dots: true
					}
				},{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						arrows: false,
						dots: true
					}
				},{
					breakpoint: 450,
					settings: {
						slidesToShow: 1,
						arrows: false,
						dots: true
					}
				}
			]
		})
	});

	if ($('.slick-card').length) {
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
	}
	

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


	if ($('.gallery').length) {
		lazyLibraryLoad(
			'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.10.0/js/lightgallery.min.js',
			'https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.10.0/css/lightgallery.min.css',
			() => {
				$(".gallery").lightGallery({
					selector: 'a.gallery-link',
					download: false
				});
			}
		)
	}


	if ($('.cart-check').length) {
		$('#wrapper').addClass('no-overflow');
	}


	$(document).on('click','.catalog-toggler',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$('.catalog-menu').toggleClass('opened');
	})

	$(document).on('click','.catalog-menu-childrens-toggler',function(e){
		e.preventDefault();
		const variants = $(this).prev('.catalog-menu-childrens');

		if (this.isCollapsed === undefined) {
			variants.find('li').addClass('visible')
			this.isCollapsed = $(this).text()
			$(this).text('Свернуть')
		} else {
			variants.find('li').removeClass('visible')
			$(this).text(this.isCollapsed)
			this.isCollapsed = undefined
		}
	})

	$(document).on('mouseup',function(e){
    if ($('.h-catalog').has(e.target).length === 0) {
      $('.catalog-menu').removeClass('opened');
      $('.catalog-toggler').removeClass('opened');
    }
	});


	$(document).on('click','.filters-title',function(e){
		e.preventDefault();
		$('.filters-body').toggleClass('opened');
	})

	


	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}

	// backgrounded('.backgrounded');


	



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
						$('.mfp-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});
	


	//стилизация элементов форм
	$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
		// singleSelectzIndex: '1',
	});
	

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