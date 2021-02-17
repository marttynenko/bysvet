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


jQuery(document).ready(function($){

  //использование функции табов:
  //вызываем на блоке, содержащем ссылки для переключения блоков
  //в href ссылок указываются id блоков, которые должны переключаться
  $('.tabs-menu a').Tabs();
  //если на странице несколько экземпляров табов, вызываем функцию для каждого
  //$(selector).Tabs();
});