$(document).ready(function() {
		
		$(window).scroll(function() {
			if($(document).scrollTop() >= $(".contact").offset().top - 300) {
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