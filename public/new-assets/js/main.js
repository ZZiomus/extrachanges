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

  //copy ------------
  //   $(".copy-btn").on("click", function () {
  //     console.log("hello");
  //     const walletId = document.querySelector("#wallet-id");
  //     navigator.clipboard.writeText(walletId.value);
  //   });

  // Aos initialize
  AOS.init();

  // Show or hide the sticky footer button
  $(window).on("scroll", function (event) {
    if ($(this).scrollTop() > 600) {
      $(".back-to-top").fadeIn(200);
    } else {
      $(".back-to-top").fadeOut(200);
    }
  });

  //Animate the scroll to top
  $(".back-to-top").on("click", function (event) {
    event.preventDefault();

    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
  });

  // flagStrap
  $("#options").flagStrap({
    countries: {
      GB: "En",
      FR: "Fr",
    },
    buttonSize: "btn-sm",
    labelMargin: "10px",
    scrollable: false,
    scrollableHeight: "550px",
    placeholder: {
      value: "",
      text: "",
    },
  });
})(jQuery);
