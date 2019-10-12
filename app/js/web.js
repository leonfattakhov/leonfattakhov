$(document).ready(function() {
  var navStart = $(".intro-text").offset().top,
    scrollToElement = function($el) {
      var offset = $el.offset();
      offset.left -= 20;
      offset.top -= $("h2").outerHeight();
      $("html, body").animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
      });
    };
  $(".navbar").hide(),
    $("#scrollDown").click(function() {
      scrollToElement($("#projects"));
    }),
    $(window).scroll(function() {
      !$(".navbar").is(":visible") && $(this).scrollTop() > navStart
        ? $(".navbar").fadeIn()
        : $(".navbar").is(":visible") &&
          $(this).scrollTop() < navStart &&
          ($(".navbar").fadeOut(), $(".navbar-collapse").collapse("hide"));
    }),
    $(".emb-video").click(function() {
      $(".image-container").hide();
      $("#vid-id").attr("src", $(this).attr("data-target"));
      $("#displayBox").modal("show");
      $("video")[0].load();
      $(".video-container").show();
    }),
    $(".modal").click(function() {
      var v = $("video")[0];
      v && v.pause(),
        $("#vid-id").attr("src", ""),
        $("#img-id").attr("src", "");
    }),
    $(".vid-stop").click(function() {
      $("video")[0].pause();
    }),
    $(".nav-link, .custom-navbrand").click(function() {
      $(".navbar-collapse").collapse("hide");
      var result = $($(this).attr("target"));
      result[0]
        ? scrollToElement(result)
        : (scrollToElement($("#intro")),
          $("#linkedin").removeClass("active"),
          $("#linkedin")[0].offsetWidth,
          $("#linkedin").addClass("active"));
    }),
    $(".redirect").click(function() {
      scrollToElement($($(this).attr("target")));
    }),
    $(".gallery-image").click(function() {
      $("#img-id").attr("src", $(this).attr("src"));
      $(".image-container").show();
      $(".video-container").hide();
      $("#displayBox").modal("show");
    });
});
