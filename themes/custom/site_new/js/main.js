/* ---------
This file "main.js" has been created by Simon Tofteby.
Uncompressed version. jQuery needed in order to function.
Created: 8th of March 2017.
------------*/


// --------- Navigationbar --------- // 


// Adding solid bg to the top of navbar on click 

jQuery(document).ready(function($){
  $('.navbar-toggle').click(function(){
    $('.navbar-transparent').toggleClass('solid');
});
});


// Disabling scroll when responsive menu is called

jQuery(document).ready(function($){
  $('.navbar-toggle').click(function(){
    $('body').toggleClass('noscroll');
});
});

// Adding solid bg to the ul menu 


jQuery(document).ready(function($){
  $('.navbar-toggle').click(function(){
    $('.navbar-nav').toggleClass('solid');
});
});



// Fixing problem with ul menu is slow 


jQuery(document).ready(function($){
  $('.navbar-toggle').click(function(){
    $('.navbar-nav').toggleClass('show');
});
});

// --------- Some other $h!t --------- // 

// preloader
jQuery(document).ready(function($){
    $('html').addClass('reveal');
    $(window).load(function(){
        if ($('.number').hasClass('bottom-offset fixed')) {
            $('.number').removeClass('fixed');
        };
        $('#preloader').delay(300).fadeOut('slow',function(){
            $(this).remove();
        });
    });
});

// ------- Google Maps Prevent Zooming When Scrolling ----- //

jQuery(document).ready(function($){

        // you want to enable the pointer events only on click;

        $('#googlemaps').addClass('scrolloff'); // set the pointer events to none on doc ready
        $('#gmap-container').on('click', function () {
            $('#googlemaps').removeClass('scrolloff'); // set the pointer events true on click
        });

    });


// ------ Hide/Show Footer Fix for Safari ------ //


// ------ YouTube ------ //

// YouTube

jQuery(document).ready(function($){

  var Modal = function() {
    this.Selector = {
      overlay: '.modal-overlay',
      box: '.modal-box',
      button: '[data-modal=button]'
    };

    this.Markup = {
      close: '<div class="modal-close">&times;</div>',
      overlay: '<div class="modal-overlay"></div>',
      box: '<div class="modal-box"></div>'
    };

    this.youtubeID = false;
  };

  Modal.prototype = {

    toggleOverflow: function() {
      $('body').toggleClass('modal-cancel-overflow');
    },

    videoContainer: function() {
      return '<div class="video-container"><iframe id="player" frameborder="0" allowfullscreen="1" title="YouTube video player" width="640" height="390" src="http://www.youtube.com/embed/' + this.youtubeID + '?autoplay=1&rel=0" frameborder="0"></iframe></div>';
    },

    addOverlay: function() {
      var self = this;
      $(this.Markup.overlay).appendTo('body').fadeIn('slow', function() {
        self.toggleOverflow();
      });
      $(this.Selector.overlay).on('click touchstart', function() {
        self.closeModal();
      });
    },

    addModalBox: function() {
      $(this.Markup.box).appendTo(this.Selector.overlay);
    },

    buildModal: function(youtubeID) {
      this.addOverlay();
      this.addModalBox();
      $(this.Markup.close).appendTo(this.Selector.overlay);
      $(this.videoContainer(youtubeID)).appendTo(this.Selector.box);
    },

    closeModal: function() {
      this.toggleOverflow();
      $(this.Selector.overlay).fadeOut().detach();
      $(this.Selector.box).empty();
    },

    getYoutubeID: function() {
      return this.youtubeID;
    },

    setYoutubeID: function(href) {
      var id = '';
      if (href.indexOf('youtube.com') > -1) {
        // full Youtube link
        id = href.split('v=')[1];
      } else if (href.indexOf('youtu.be') > -1) {
        // shortened Youtube link
        id = href.split('.be/')[1];
      } else {
        // in case it's not a Youtube link, send them on their merry way
        document.location = href;
      }
      // If there's an ampersand, remove it and return what's left, otherwise return the ID
      // this.youtubeID = (id.indexOf('&') != -1) ? id.substring(0, amp) : id;
      this.youtubeID = id;
    },

    startup: function(href) {
      this.setYoutubeID(href);
      if (this.youtubeID) {
        this.buildModal();
      }
    }
  };

  jQuery(document).ready(function($){
    var modal = new Modal();
    $(modal.Selector.button).on('click touchstart', function(e) {
      e.preventDefault();
      modal.startup(this.href);
    });
  });

});

// ------ Footer Show/Hide --------- //
jQuery(document).ready(function($){
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 500) {
        $(".footer-hideshow").addClass("footer-show");
    } else {
        $(".footer-hideshow").removeClass("footer-show");
    }
});
});

// ------ Contact Box -------- //

jQuery(document).ready(function($){

$('.contact-box-label').click(function(){
  $('.contact-box').toggleClass('open');
});
    });


// ----- Parallax Effect ----- //

    const imageFronts = Array.from(document.querySelectorAll('.image--front'))
        .map(wrapElement);
    const imageBacks = Array.from(document.querySelectorAll('.image--back'))
        .map(wrapElement);

    imageBacks.shift();

    document.addEventListener('scroll', function () {
        requestAnimationFrame(animate);
    });

    animate();

    function wrapElement(elt) {
        var clientRect = elt.getBoundingClientRect();
        return {
            element: elt,
            yCenter: clientRect.top + (clientRect.top-clientRect.bottom)/2 + window.pageYOffset
        }
    }

    function animate() {
        imageFronts.forEach(function (frontImage) {
            var dist = frontImage.yCenter - (window.pageYOffset - window.screen.height/2);

            frontImage.element.style.transform = `translate3d(0, ${40 * Math.atan(dist / 100)}px, 0)`;
        });
        imageBacks.forEach(function (imageBack) {
            var dist = imageBack.yCenter - window.pageYOffset;

            imageBack.element.style.transform = `translate3d(0, ${40 * Math.atan(-dist / 100)}px, 0)`;
        });
    }


