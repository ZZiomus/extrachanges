(function ($) {
  "use strict";

  $(window).on("load", function () {
    // Prealoder
    $("#preloader").delay(500).fadeOut();
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    //>=, not <=
    if (scroll >= 1) {
      //clearHeader, not clearheader - caps H
      $(".header-area").addClass("is-stick");
    } else {
      $(".header-area").removeClass("is-stick");
    }
  });

  // Hamburger-menu
  $(".hamburger-menu").on("click", function () {
    $(".hamburger-menu, #menu").toggleClass("current");
  });

  $(".bar").click(function () {
    $(".offcanvas-wrapper, .overlay").addClass("active");
  });
  $(".close, .overlay").click(function () {
    $(".offcanvas-wrapper, .overlay").removeClass("active");
  });

  $(".team-slider-active").owlCarousel({
    loop: true,
    margin: 0,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      767: {
        items: 3,
        nav: true,
      },
      1000: {
        items: 5,
        nav: true,
        loop: false,
      },
    },
  });

  $(".countdown").each(function () {
    var $this = $(this),
      finalDate = $(this).data("countdown");
    $this.countdown(finalDate, function (event) {
      $this.html(
        event.strftime(
          '<span class="time-count">%D</span>:<span class="time-count">%H</span>:<span class="time-count">%M</span>:<span class="time-count">%S</span>'
        )
      );
    });
  });

  $(".faq-single .collapsed-content").on("show.bs.collapse", function () {
    let thisIs = $(this);
    thisIs.parents(".faq-single").addClass("a-active");
  });
  $(".faq-single .collapsed-content").on("hide.bs.collapse", function () {
    let thisIs = $(this);
    thisIs.parents(".faq-single").removeClass("a-active");
  });

  // scroll up
  $(function () {
    $.scrollUp();
  });
  const btn = document.querySelector(".copy-btn");
  $(btn).on("click", () => {
    navigator.clipboard.writeText("0x11Fd618748569cc6FDc9e641Fe306D20F988150a");
  });
  // nice select
  $("select").niceSelect();
})(jQuery);
