// Initialize menu item states
var currentActiveMenu = 1;

$(document).ready(function() {
  setNewActiveMenu(currentActiveMenu);

  // Add listener to scroll event
  $(window).scroll(function(event) {
    removeIcon();
  });

  // Typewrite hero text
  $('#typewrite').typeIt({
    strings: 'print description',
    cursor: false,
    callback: function() {
      setTimeout(function() {
        $('#typewrite').append(' <i class="fa fa-level-down" aria-hidden="true"></i>');
        $('#typewrite').addClass('hide-pseudo');
        $('#print').html('cs student; tech enthusiast;');
        $('#cursor').append('<i class="fa fa-terminal" aria-hidden="true"></i>');
        $('#cursor').typeIt({
          strings: ' ',
          cursor:true,
          callback: function() {

            $('.fa-arrow-circle-o-down').addClass('animated fadeInDown');
            setTimeout(function() {
              $('.fa-arrow-circle-o-down').css({
                'display': 'block',
                '-webkit-animation-duration': '3s',
                '-moz-animation-duration': '3s',
                'animation-duration': '3s',
              });
              $('.fa-arrow-circle-o-down').removeClass('fadeInDown');
              $('.fa-arrow-circle-o-down').addClass('infinite bounce');
            }, 2000);
          }
        });
      }, 1000);
    }
  });

  // Activate tooltips
  $('body').tooltip({selector: '[data-toggle=tooltip]'});
});

// Gets the current active menu
function getCurrentActiveMenu() {
  return currentActiveMenu;
}

// Sets a new active menu
function setNewActiveMenu(newActiveMenu) {
  var oldActiveMenu = getCurrentActiveMenu();
  var oldActiveSelector = '.menu-parent:nth-of-type(' + oldActiveMenu + ')';
  var newActiveSelector = '.menu-parent:nth-of-type(' + newActiveMenu + ')';
  $(oldActiveSelector).removeClass('active');
  $(newActiveSelector).addClass('active');
  currentActiveMenu = newActiveMenu;
}

function removeIcon() {
  if ($(window).scrollTop() > 240 && $('.fa-arrow-circle-o-down').hasClass('bounce')) {
    $('.fa-arrow-circle-o-down').removeClass('infinite');
    $('.fa-arrow-circle-o-down').removeClass('bounce');
    $('.fa-arrow-circle-o-down').addClass('fadeOutUp');
  }
  else if ($(window).scrollTop() <= 240 && !$('.fa-arrow-circle-o-down').hasClass('bounce')) {
    if ($('.fa-arrow-circle-o-down').hasClass('fadeOutUp')) {
      $('.fa-arrow-circle-o-down').removeClass('fadeOutUp');
    }

    $('.fa-arrow-circle-o-down').addClass('animated fadeInDown');
    setTimeout(function() {
      $('.fa-arrow-circle-o-down').removeClass('fadeInDown');
      $('.fa-arrow-circle-o-down').addClass('infinite bounce');
    }, 2000);

  }
}
