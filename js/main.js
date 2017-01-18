// Initialize menu item states
var currentActiveMenu = 1;
var menuColor = 'red-menu';
var tabsInitialized = false;

$(document).ready(function() {
  setNewActiveMenu(currentActiveMenu);

  // Add listener to scroll event
  $(window).scroll(function(event) {
    setMenuBar();
    setIconDisplay();
    initTabDisplay();
  });

  $('#top-menu-item').click(function() {
    $('html, body').animate({
      scrollTop: 0
    });
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
            $('.fa-arrow-circle-o-down').css({'display': 'block'});
            setTimeout(function() {
              $('.fa-arrow-circle-o-down').css({
                '-webkit-animation-duration': '3s',
                '-moz-animation-duration': '3s',
                'animation-duration': '3s',
              });
              $('.fa-arrow-circle-o-down').removeClass('fadeInDown');
              $('.fa-arrow-circle-o-down').addClass('infinite bounce');
            }, 1000);
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

// Gets the current active menu color
function getCurrentActiveMenuColor() {
  return menuColor;
}

// Sets a new active menu
function setNewActiveMenu(newActiveMenu) {
  var oldActiveMenu = getCurrentActiveMenu();
  var oldActiveMenuColor = getCurrentActiveMenuColor();

  var oldActiveSelector = '.menu-parent:nth-of-type(' + oldActiveMenu + ')';
  var newActiveSelector = '.menu-parent:nth-of-type(' + newActiveMenu + ')';

  var color = '';
  switch (newActiveMenu) {
    case 1:
      color = 'blue';
      break;
    case 2:
      color = 'purple';
      break;
    case 3:
      color = 'pink';
      break;
    case 4:
      color = 'orange';
      break;
    case 5:
      color = 'green';
      break;
  }
  color += '-menu';

  $(oldActiveSelector).removeClass('active');
  $(oldActiveSelector).removeClass(oldActiveMenuColor);
  $(newActiveSelector).addClass('active ' + color);

  menuColor = color;
  currentActiveMenu = newActiveMenu;

  changeTabDisplay(oldActiveMenu, newActiveMenu);
}

function setIconDisplay() {
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

function initTabDisplay() {
  if (!isSmallScreen()) {
    if ($(window).scrollTop() > 145
        && !$('#about-info').hasClass('fadeInUp')) {
      $('#about-info').css({
        'display': 'flex',
      });
      $('#about-info').addClass('animated fadeInUp');
    }
    if ($(window).scrollTop() > 350 
        && menuColor == 'blue-menu'
        && !$('#about-career .about-tabs:nth-of-type(1)').hasClass('fadeInUp')) {
      $('#about-career .about-tabs:nth-of-type(1)').css({
          'display': 'flex',
      });
      $('#about-career .about-tabs:nth-of-type(1)').addClass('animated fadeInUp');
    }
    $('#about-career .about-tabs:nth-of-type(1) ~ .about-tabs').addClass('animated fadeInUp');
    // else {
    //   $('#about-career .about-tabs').removeClass('animated');
    //   $('#about-career .about-tabs').removeClass('fadeInUp');
    // }

    tabsInitialized = true;
  }  
}

function changeTabDisplay(oldActiveMenu, newActiveMenu) {
  if (tabsInitialized) {
    var oldActiveSelector = '#about-career .about-tabs:nth-of-type(' + oldActiveMenu + ')';
    var newActiveSelector = '#about-career .about-tabs:nth-of-type(' + newActiveMenu + ')';
    $(oldActiveSelector).css('display', 'none');
    $(newActiveSelector).css({
      'display': 'flex',
    });
  }
}

function setMenuBar() {
  if ($(window).scrollTop() > 190) {
    $('#top-menu').css('display', 'block');
    $('#top-menu-item').css('display', 'inline-block');
    $('#top-menu').removeClass('slideOutUp');
    $('#top-menu-item').removeClass('slideOutUp');
    $('#top-menu').addClass('slideInDown');
    $('#top-menu-item').addClass('slideInDown');
  }
  else {
    $('#top-menu').removeClass('slideInDown');
    $('#top-menu-item').removeClass('slideInDown');
    $('#top-menu').addClass('slideOutUp');
    $('#top-menu-item').addClass('slideOutUp');
  }
}

function isSmallScreen() {
  var isMobile = false; 

  var width = $(window).width();
  if (width <= 600) {
    isMobile = true;
  }

  return isMobile;
}
