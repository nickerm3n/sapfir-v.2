'use strict';

(function($){
	$(document).ready(function() {
		$('#pagepiling').pagepiling({
			menu: null,
			direction: 'vertical',
			verticalCentered: true,
			sectionsColor: [],
			anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
			scrollingSpeed: 700,
			easing: 'swing',
			loopBottom: true,
			loopTop: true,
			css3: true,
			navigation: {
				'textColor': '#000',
				'bulletsColor': '#000',
				'position': 'right',
				'tooltips': ['Главная страница', 'Сотрудничество', 'Наш опыт', 'Коллекции']
			},
			normalScrollElements: null,
			normalScrollElementTouchThreshold: 10,
			touchSensitivity: 5,
			keyboardScrolling: false,
			sectionSelector: '.section',
			animateAnchor: false,

			//events
			onLeave: function(index, nextIndex, direction){
                //fading out the txt of the leaving section
                $('.section').eq(index -1).find('h1, p').fadeOut(700, 'easeInQuart');

                //fading in the text of the destination (in case it was fadedOut)
                $('.section').eq(nextIndex -1).find('h1, p').fadeIn(700, 'easeInQuart');
               // console.log('!!!', $('.content-section').eq(index +))
               console.log(index)

            },
            afterLoad: function(anchorLink, index) {
            	if ($(window).width() <= 414 || $(window).height() <= 747 ) {
            		if (index !== 1 ) {
            			scrollingFunc(anchorLink);
            		} else {
            			$.fn.pagepiling.setAllowScrolling(true);
            		}
            	} else {
            		
            	}
            	if (index === 1) {
            		$('.content-section').removeAttr('style').scrollTop(0)
            	}
            },
            afterRender: function(){

            },
        });

		function scrollingFunc(anchorLink) {
			$.fn.pagepiling.setAllowScrolling(false);
			const contentSection = $(`[data-anchor='${anchorLink}']`)
			  .find('.content-section')
			contentSection.css({'overflow': 'scroll'})
			  .on('scroll', function(e) {
				checkHeight(this)
			  })
		}

		function checkHeight(section) {
			if ($(section).scrollTop() + $(section).innerHeight() > $(section)[0].scrollHeight - 1) {
				$(section).off('scroll')
				$.fn.pagepiling.setAllowScrolling(true);
				return true;

			}
		}
	});

	const Menu = {
		el: {
			ham: $('.menu'),
			menuTop: $('.menu-top'),
			menuMiddle: $('.menu-middle'),
			menuBottom: $('.menu-bottom'),
			header: $('.hero-image-content__header'),
			headerList: $('.hero-image-content__header ul'),
			heroImageContent: $('.hero-image-content__text-wrapper'),
			logo: $('.contacts__logo'),
			contacts: $('.contacts'),
			feedbackSubmit: $('.feedback-submit')
		},

		init: function() {
			Menu.bindUIactions();
		},

		bindUIactions: function() {
			Menu.el.ham
			.on(
				'click',
				function(event) {
					Menu.activateMenu(event);
					event.preventDefault();
				}
				);
		},

		activateMenu: function() {
			Menu.el.menuTop.toggleClass('menu-top-click');
			Menu.el.menuMiddle.toggleClass('menu-middle-click');
			Menu.el.menuBottom.toggleClass('menu-bottom-click');
			Menu.el.headerList.toggleClass('show-navigation');
			Menu.el.header.toggleClass('hero-image-content__header--layout');
			Menu.el.header.toggleClass('hero-image-content__header--click');
			Menu.el.contacts.toggleClass('contacts-active');
			Menu.el.heroImageContent.toggleClass('hero-image-content__text-wrapper--active');
		},
	};

	Menu.init();

	$('#form-1').on('submit', function(e) {
		e.preventDefault();
		clearFields(this)
		validateFields(this);
		$.ajax({
			url: 'send.php',
			type: 'POST',
			contentType: false,
			processData: false,
			data: new FormData(this),
			success: function(msg) {
				console.log(msg);
				if (msg == 'ok') {
					alert('Сообщение отправлено');
		          $('#form').trigger('reset'); // очистка формы
		      } else {
		      	alert('Ошибка');
		    }
  		}
		});
	});
	$('#form-2').on('submit', function(e) {
		e.preventDefault();
		clearFields(this)
		validateFields(this);
		$.ajax({
			url: 'send2.php',
			type: 'POST',
			contentType: false,
			processData: false,
			data: new FormData(this),
			success: function(msg) {
				console.log(msg);
				if (msg == 'ok') {
					alert('Сообщение отправлено');
		          $('#form').trigger('reset'); // очистка формы
		      } else {
		      	alert('Ошибка');
		    }
	  		}
		});
	});

	function CreateLinks(number, path, parentNode) {
		console.log(parentNode)
		for (let i = 2; i < number; i++) {
			let link = $(`<a href="./images/${path}/${i}.jpg" data-fancybox="${path}"></a>`);
			$(parentNode).append(link);
		}
	}

	const galleries = $('.gallery-images');
	galleries.each(function(inx, gallery) {
		CreateLinks(48, `gallery-${inx+1}`, this)
	})

})(jQuery);

function clearFields(form) {
	$(form).find('input, select').removeClass('is-invalid')
}

function validateFields(form) {
	let fields = $(form).find('input, select')
	fields.each(function (inx, element) {
		if (!$(element).val() || $(element).val() === 'Выбрать...') {
			$(element).addClass('is-invalid');
			return false;
		} else {
			$(element).addClass('is-valid');
			return true;
		}
	})
}