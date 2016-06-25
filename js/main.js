$(document).ready(function() {

		$(window).load(function() {
			$("#loading").fadeOut("slow");
			$(".navbar").addClass("navbar-fixed-top")
		})

		var $active = $('a.active');
		$active.removeAttr('class');
		$active[0].style.setProperty('color', '#ffffff', 'important');
		var imgs = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.png", "img4.jpg"];
		
		var wrapWidthReduction = 150;
		function setCube() {
			var cubeWidth = $("#wrap").parent().width()-wrapWidthReduction, cubeHeight = cubeWidth/2;
			$("#wrap").css({"width": cubeWidth+"px", "height": cubeHeight+"px"});
			$("#cube div").css({"width": cubeWidth+"px", "height": cubeHeight+"px"});
			$("#cube").children().each(function() {
				var ids = ["front", "back", "left", "right"];
				var transformProperty = ["", "rotateY(180deg)", "rotateY(-90deg)", "rotateY(90deg)"];
				var index = ids.indexOf($(this).attr("id"));
				var transform = transformProperty[index]+" translateZ("+cubeWidth/2+"px)";
				$(this).css("transform", transform);
				$(this).css({"background-image": "url('assets/"+imgs[index]+"')", "background-size": "cover"})
			});
		}

		function setMargins() {
			// about
			var marginTop = ($("#about").height()-$("#about .row").height())/2;
			$("#about .row").css("margin-top", marginTop+"px");

			// portfolio
			marginTop = ($("#portfolio").height()-$("#wrap").height())/2 - 50;
			var marginLeft = wrapWidthReduction/2;
			$("#wrap").css("margin-top", marginTop+"px").css("margin-left", marginLeft+"px");
			var marginBottom = -170;
			marginLeft = ($("#wrap").width()-$("#controls").width())/2;
			$("#controls").css("margin-bottom", marginBottom+"px").css("margin-left", marginLeft+"px");

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

		var rotateY = 0;
		$("#controls").children().each(function() {
			$(this).click(function(e){
				e.preventDefault();
				var elemName = $(this).attr('class');
				var flag = elemName==='prev';
				rotateY += flag?90:-90;
				$("#cube").stop().transition({
					rotateY: rotateY+'deg',
					complete: function() {
						rotateY = Math.abs(rotateY)==360?0:rotateY;
						$(this).css("transform", "rotateY("+rotateY+"deg)");
					}
				})
			});
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
			}, 900, "swing", function() {clicked=false;});
		});

		$(window).scroll(function() {
			var top = $(document).scrollTop();
			if(top>100) {
				$(".navbar").addClass('navbar-scrolled');
			} else {
				$(".navbar").removeClass('navbar-scrolled');
			}

			if(clicked) return;

			var pageTops = [$('#about').offset().top, $('#portfolio').offset().top, $('#contact').offset().top];

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