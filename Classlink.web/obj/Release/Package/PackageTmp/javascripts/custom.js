// Sets the min-height of #wrapper-scope to window size
;(function($, window, document, undefined) {
   //Right Body height setting
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;

        height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#wrapper-scope").css("min-height", (height - 90) + "px");
        }
		//Login
		loginHeight	=	$('.login-scope').height() + topOffset;
		$(".login-scope").css("margin-top", "0px");
		
		if(height > loginHeight){
			$(".login-scope").css("margin-top", parseInt( (height - loginHeight) / 2) + "px");
		}
		//Login
		loginHeight	=	$('.registration-section').height() + topOffset;
		
		$(".registration-section").css("margin-top", "0px");
		if(height > loginHeight){
			$(".registration-section").css("margin-top", parseInt( (height - loginHeight) / 2) + "px");
		}
		
    })
})(jQuery, window, document);

// custom Scroll
  (function($){
	var $elm = $(".loadScrollbar").length;
		if($elm > 0){
		$(window).load(function(){
			$(".loadScrollbar").mCustomScrollbar({
				axis:"y",
				scrollInertia:500,
				//theme:"dark-thin",
				autoExpandScrollbar:true,
				advanced:{autoExpandHorizontalScroll:true}
			});
			
		});
	}
})(jQuery);

// Slider JavaScript Document
  $(document).ready(function() {
	$('#Carousel-1').carousel({ interval: 3000 });
  });