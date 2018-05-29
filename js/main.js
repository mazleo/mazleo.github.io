// Load particles animation
/*
particlesJS.load('particles-js', 'js/particles.json', function() {
  console.log('callback - particles.js config loaded');
});
*/

$(document).ready(function() {
  // Get section locations
  var aboutSectionTop = $("#about-section").offset().top;
  var educationSectionTop = $("#education-section").offset().top;
  var experienceSectionTop = $("#experience-section").offset().top;
  var skillsSectionTop = $("#skills-section").offset().top;
  var projectsSectionTop = $("#projects-section").offset().top;

  // Add fade in and out animations on top bar
  $(window).scroll(function() {
    if ($(window).scrollTop() > 550) {
      $(".top-color").addClass("important-rule");
      $(".top-color").removeClass("animated fadeOut");
      $(".top-color").addClass("animated fadeIn");
    }
    else {
      $(".top-color").removeClass("animated fadeIn");
      $(".top-color").addClass("animated fadeOut");
    }

    // Add active buttons upon scroll
    if ($(window).scrollTop() > projectsSectionTop - 100) {
      $("#projects-button").addClass("active-button");
      $("#about-button").removeClass("active-button");
      $("#education-button").removeClass("active-button");
      $("#experience-button").removeClass("active-button");
      $("#skills-button").removeClass("active-button");
    }
    else if ($(window).scrollTop() > skillsSectionTop - 100) {
      $("#skills-button").addClass("active-button");
      $("#about-button").removeClass("active-button");
      $("#education-button").removeClass("active-button");
      $("#experience-button").removeClass("active-button");
      $("#projects-button").removeClass("active-button");
    }
    else if ($(window).scrollTop() > experienceSectionTop - 100) {
      $("#experience-button").addClass("active-button");
      $("#about-button").removeClass("active-button");
      $("#education-button").removeClass("active-button");
      $("#skills-button").removeClass("active-button");
      $("#projects-button").removeClass("active-button");
    }
    else if ($(window).scrollTop() > educationSectionTop - 100) {
      $("#education-button").addClass("active-button");
      $("#about-button").removeClass("active-button");
      $("#experience-button").removeClass("active-button");
      $("#skills-button").removeClass("active-button");
      $("#projects-button").removeClass("active-button");
    }
    else if ($(window).scrollTop() > aboutSectionTop - 100) {
      $("#about-button").addClass("active-button");
      $("#education-button").removeClass("active-button");
      $("#experience-button").removeClass("active-button");
      $("#skills-button").removeClass("active-button");
      $("#projects-button").removeClass("active-button");
    }
    else {
      $("#about-button").removeClass("active-button");
      $("#education-button").removeClass("active-button");
      $("#experience-button").removeClass("active-button");
      $("#skills-button").removeClass("active-button");
      $("#projects-button").removeClass("active-button");
    }
  });

    // Add scroll to section upon button onclick
    $("#about-button").click(function() {
      $("html, body").animate({
        scrollTop: aboutSectionTop - 50
      }, 750);
    });
    $("#education-button").click(function() {
      $("html, body").animate({
        scrollTop: educationSectionTop - 50
      }, 750);
    });
    $("#experience-button").click(function() {
      $("html, body").animate({
        scrollTop: experienceSectionTop - 50
      }, 750);
    });
    $("#skills-button").click(function() {
      $("html, body").animate({
        scrollTop: skillsSectionTop - 50
      }, 750);
    });
    $("#projects-button").click(function() {
      $("html, body").animate({
        scrollTop: projectsSectionTop - 50
      }, 750);
    });

    // Add typewriter effect
    $("#typewrite").typeIt({
      strings: "print description",
      cursor: false,
      lifeLike: true,
      callback: function() {
        $("#typewrite").append(" <i class='fas fa-level-down-alt'></i>");
        $("#popup-info").html("cs student; aspiring programmer;");
        $("#popup-terminal-prompt").append("<i class='fas fa-terminal'></i>");
        $("#popup-terminal-prompt").typeIt({
          strings: " ",
          cursor: true
        })
      }
    })

    $("i").tooltip();
});
