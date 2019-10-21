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
	        normalScrollElementTouchThreshold: 5,
	        touchSensitivity: 5,
	        keyboardScrolling: false,
	        sectionSelector: '.section',
	        animateAnchor: false,

			//events
			onLeave: function(index, nextIndex, direction){},
			afterLoad: function(anchorLink, index){},
			afterRender: function(){},
		});
	});

	$('#myModal').modal('toggle')

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
	    buttonFQA: $('.button-FAQ'),
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
	    Menu.el.buttonFQA
	        .on(
	          'click',
	        function(event) {
	        Menu.activateContactsSection(event);
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


	  },
	 activateContactsSection: function() {
	    Menu.el.header.toggleClass('hero-image-content__header--click');
	    Menu.el.contacts.toggleClass('contacts-active');
	    Menu.el.heroImageContent.toggleClass('hero-image-content__text-wrapper--active');
	    Menu.el.buttonFQA.toggleClass('button-FAQ__active');
	  },
	};



	Menu.init();
})(jQuery);
