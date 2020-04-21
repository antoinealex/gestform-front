(function($, document, window){
	
	$(document).ready(function(){
		$(".slider").flexslider({
			controlNav: true,
			directionNav: false
		});
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		$(".more-student").height( $(".more-student").innerWidth() );

		$(".accordion-toggle").click(function(){
			var current = $(this).parent();
			if( !current.hasClass("expanded") ){
				current.siblings(".accordion").removeClass("expanded").find(".accordion-content").slideUp();
				current.addClass("expanded").find(".accordion-content").slideDown();
			} else {
				current.removeClass("expanded");
				current.find(".accordion-content").slideUp();
			}
		});

		if( $(".map").length ){
			$('.map').gmap3({
				map: {
					options: {
						maxZoom: 14,
						scrollwheel: false
					}  
				},
				marker:{
					address: "40 Sibley St, Detroit",
				}
			},
			"autofit" );
	    }
	});

	$(window).resize(function(){
		$(".more-student").height( $(".more-student").innerWidth() );
	});

	$(window).load(function(){

	});

})(jQuery, document, window);

//Afficher les TrainingById
$(document).ready(function(){
    $(document).on('click', ".btn-success", function(){
        $('.modal-content').animate({'opacity': 1}, 800)
        $('.modal-close').animate({'opacity': 1}, 800)
        $('.modal-content').css('display', 'flex')
    })
    $(document).on('click', ".modal-close", function(){
        $('.modal-content').animate({'opacity': 0}, 400)
        $('.modal-close').animate({'opacity': 0}, 400)
        $('.modal-content').css('display', 'none')
    })
})

//Afficher les updateTraining
$(document).ready(function(){
    $(document).on('click', ".btn-primary", function(){
        $('.modal-content').animate({'opacity': 1}, 400)
        $('.modal-close').animate({'opacity': 1}, 400)
        $('.modal-content').css('display', 'flex')
    })
    $(document).on('click', ".modal-close", function(){
        $('.modal-content').animate({'opacity': 0}, 400)
        $('.modal-close').animate({'opacity': 0}, 400)
        $('.modal-content').css('display', 'none')
    })
})