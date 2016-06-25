$(document).ready(function() {

		var $active = $('a.active');
		$active.removeAttr('class');
		$active[0].style.setProperty('color', '#ffffff', 'important');

		var wrapWidthReduction = 150;
		function setCube() {
			var cubeWidth = $("#wrap").parent().width()-wrapWidthReduction, cubeHeight = 400;
			$("#wrap").css({"width": cubeWidth+"px", "height": cubeHeight+"px"});
			$("#cube div").css({"width": cubeWidth+"px", "height": cubeHeight+"px"});
			$("#cube").children().each(function() {
				var ids = ["front", "back", "left", "right"];
				var transformProperty = ["", "rotateY(180deg)", "rotateY(-90deg)", "rotateY(90deg)"];
				var transform = transformProperty[ids.indexOf($(this).attr("id"))]+" translateZ("+cubeWidth/2+"px)";
				$(this).css("transform", transform);
				$(this).html("<img src='http://placehold.it/"+cubeWidth+"x"+cubeHeight+"'>")
			});
		}

		function setMargins() {
			// about
			var marginTop = ($("#about").height()-$("#about .row").height())/2;
			$("#about .row").css("margin-top", marginTop+"px");

			// portfolio
			var marginTop = ($("#portfolio").height()-$("#wrap").height())/2 - 10;
			var marginLeft = wrapWidthReduction/2;
			$("#wrap").css("margin-top", marginTop+"px").css("margin-left", marginLeft+"px");

			// contact
			marginTop = $(".navbar").height() + 100;
			$("#contact h3").css("margin-top", marginTop+"px");
			marginTop = ($("#contact").height()-$("#email").height())/2 - marginTop;
			$("#email").css("margin-top", marginTop+"px");
		}
		
		setCube();
		setMargins();
		$(window).resize(function() {
			setCube();
			setMargins();
		});

		var clicked = false;

		$(".navbar-default .navbar-nav>li>a").on("click", function(e) {
			e.preventDefault();
			clicked = true;
			console.log($active);
			if(typeof $active.removeAttr == 'function') $active.removeAttr('style');
			else $active.removeAttribute('style');	
			$target = $($(this).attr("href"));
			$(this)[0].style.setProperty('color', '#ffffff', 'important');
			$active = $(this);
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 900, function() {clicked=false;console.log(clicked)});
		});

		$(window).scroll(function() {
			if(clicked) return;

			var pageTops = [$('#about').offset().top, $('#portfolio').offset().top, $('#contact').offset().top];
			var top = $(document).scrollTop();

			var elem = $(".navbar-default .navbar-nav>li>a");
			if(typeof $active.removeAttr == 'function') $active.removeAttr('style');
			else $active.removeAttribute('style');

			if(top<pageTops[1]/2) {
				elem[0].style.setProperty('color', "#ffffff", "important");
				$active = elem[0];
			}
			else if(top<pageTops[2]/1.4) {
				elem[1].style.setProperty('color', "#ffffff", "important");
				$active = elem[1];
			}
			else {
				elem[2].style.setProperty('color', "#ffffff", "important");
				$active = elem[2];
			}
		});
	});