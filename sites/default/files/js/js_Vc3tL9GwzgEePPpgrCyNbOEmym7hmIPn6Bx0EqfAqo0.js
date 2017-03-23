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




// ------ Contact Box -------- //

jQuery(document).ready(function($){

$('.contact-box').click(function(){
  $('.contact-box ').toggleClass('open');
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


;
/**
 * @file
 * Bootstrap Popovers.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Popover plugin constructor class.
   */
  Bootstrap.extendPlugin('popover', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.popover_animation,
        html: !!settings.popover_html,
        placement: settings.popover_placement,
        selector: settings.popover_selector,
        trigger: settings.popover_trigger,
        triggerAutoclose: !!settings.popover_trigger_autoclose,
        title: settings.popover_title,
        content: settings.popover_content,
        delay: parseInt(settings.popover_delay, 10),
        container: settings.popover_container
      }
    };
  });

  /**
   * Bootstrap Popovers.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapPopovers = {
    attach: function (context) {

      // Popover autoclose.
      if ($.fn.popover.Constructor.DEFAULTS.triggerAutoclose) {
        var $currentPopover = null;
        $(document)
          .on('show.bs.popover', '[data-toggle=popover]', function () {
            var $trigger = $(this);
            var popover = $trigger.data('bs.popover');

            // Only keep track of clicked triggers that we're manually handling.
            if (popover.options.originalTrigger === 'click') {
              if ($currentPopover && !$currentPopover.is($trigger)) {
                $currentPopover.popover('hide');
              }
              $currentPopover = $trigger;
            }
          })
          .on('click', function (e) {
            var $target = $(e.target);
            var popover = $target.is('[data-toggle=popover]') && $target.data('bs.popover');
            if ($currentPopover && !$target.is('[data-toggle=popover]') && !$target.closest('.popover.in')[0]) {
              $currentPopover.popover('hide');
              $currentPopover = null;
            }
          })
        ;
      }

      var elements = $(context).find('[data-toggle=popover]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.popover.Constructor.DEFAULTS, $element.data());

        // Store the original trigger.
        options.originalTrigger = options.trigger;

        // If the trigger is "click", then we'll handle it manually here.
        if (options.trigger === 'click') {
          options.trigger = 'manual';
        }

        // Retrieve content from a target element.
        var $target = $(options.target || $element.is('a[href^="#"]') && $element.attr('href')).clone();
        if (!options.content && $target[0]) {
          $target.removeClass('visually-hidden hidden').removeAttr('aria-hidden');
          options.content = $target.wrap('<div/>').parent()[options.html ? 'html' : 'text']() || '';
        }

        // Initialize the popover.
        $element.popover(options);

        // Handle clicks manually.
        if (options.originalTrigger === 'click') {
          // To ensure the element is bound multiple times, remove any
          // previously set event handler before adding another one.
          $element
            .off('click.drupal.bootstrap.popover')
            .on('click.drupal.bootstrap.popover', function (e) {
              $(this).popover('toggle');
              e.preventDefault();
              e.stopPropagation();
            })
          ;
        }
      }
    },
    detach: function (context) {
      // Destroy all popovers.
      $(context).find('[data-toggle="popover"]')
        .off('click.drupal.bootstrap.popover')
        .popover('destroy')
      ;
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Bootstrap Tooltips.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Tooltip plugin constructor class.
   */
  Bootstrap.extendPlugin('tooltip', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.tooltip_animation,
        html: !!settings.tooltip_html,
        placement: settings.tooltip_placement,
        selector: settings.tooltip_selector,
        trigger: settings.tooltip_trigger,
        delay: parseInt(settings.tooltip_delay, 10),
        container: settings.tooltip_container
      }
    };
  });

  /**
   * Bootstrap Tooltips.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapTooltips = {
    attach: function (context) {
      var elements = $(context).find('[data-toggle="tooltip"]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, $element.data());
        $element.tooltip(options);
      }
    },
    detach: function (context) {
      // Destroy all tooltips.
      $(context).find('[data-toggle="tooltip"]').tooltip('destroy');
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
