$(document).ready(function() {
		
		$(window).scroll(function() {
			var contactTop = $(".contact").offset().top;
			contactTop = $(window).width()>700?contactTop-300:contactTop/2;
			if($(document).scrollTop() >= contactTop) {
				$(".social").removeClass("remove");
			} else {
				$(".social").addClass("remove");
			}
		});

		$(".direction").addClass("animated bounceInLeft").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
			$(this).removeClass("bounceInLeft");
			$(this).addClass("pulse").css("animation-iteration-count", "infinite");
		});

		$(".intro a").click(function(e) {
			e.preventDefault();
			var link = this;
			$("html, body").animate({
				scrollTop: $(link.hash).offset().top
			}, 1000, "easeInOutQuad");
		});

});