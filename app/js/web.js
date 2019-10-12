/* requires:
bootstrap.bundle.js
jquery.js
*/
$(document).ready(function() {
  // var captchaResponse;
  var myGCap = grecaptcha.render("recaptcha", {
    sitekey: "6Le8dawUAAAAAKnwid_cgJ7DAu6eRRHeVS4GMoDe"
  });
  var navStart = $(".intro-text").offset().top;
  var scrollToElement = function($el) {
    var offset = $el.offset();
    offset.left -= 20;
    offset.top -= $("h2").outerHeight();
    $("html, body").animate({
      scrollTop: offset.top,
      scrollLeft: offset.left
    });
    // $el[0].scrollIntoView({
    //     behavior: "smooth", // or "auto" or "instant"
    //     block: "start" // or "end"
    // });
  };
  // hide .navbar first
  $(".navbar").hide();
  $("#scrollDown").click(function() {
    scrollToElement($("#projects"));
  });

  // $('.wh-100, .carousel-control-prev, .carousel-control-next').hover(
  //     function () {
  //         $('.carousel-control-prev-icon').show();
  //         $('.carousel-control-next-icon').show();
  //     },
  //     function () {
  //         $('.carousel-control-prev-icon').hide();
  //         $('.carousel-control-next-icon').hide();

  //     }
  // );

  $(window).scroll(function() {
    // set distance user needs to scroll before we fadeIn navbar
    if (!$(".navbar").is(":visible") && $(this).scrollTop() > navStart) {
      $(".navbar").fadeIn();
    } else if ($(".navbar").is(":visible") && $(this).scrollTop() < navStart) {
      $(".navbar").fadeOut();
      $(".navbar-collapse").collapse("hide");
    }
  });
  $(".emb-video").click(function() {
    $(".image-container").hide();
    $("#vid-id").attr("src", $(this).attr("data-target"));
    $("#displayBox").modal("show");
    $("video")[0].load();
    $(".video-container").show();
  });
  $(".modal").click(function() {
    var v = $("video")[0];
    if (v) {
      v.pause();
    }
    $("#vid-id").attr("src", "");
    $("#img-id").attr("src", "");
  });
  $(".vid-stop").click(function() {
    $("video")[0].pause();
  });
  $(".nav-link, .custom-navbrand").click(function() {
    $(".navbar-collapse").collapse("hide");
    var result = $($(this).attr("target"));
    if (result[0]) {
      scrollToElement(result);
    }
    // must be the contact button
    else {
      scrollToElement($("#footer"));
      // $("#linkedin").removeClass("active");
      // void $("#linkedin")[0].offsetWidth;
      // $("#linkedin").addClass("active");
    }
  });
  $(".redirect").click(function() {
    scrollToElement($($(this).attr("target")));
  });
  $(".gallery-image").click(function() {
    $("#img-id").attr("src", $(this).attr("src"));
    $(".image-container").show();
    $(".video-container").hide();

    $("#displayBox").modal("show");
  });
});
