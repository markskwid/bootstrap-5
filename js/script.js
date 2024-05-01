$(document).ready(function () {
  let navbarOrigPos = false;
  const navbar = $("#top-navbar");
  const icons_navbar = document.querySelectorAll(".icon-wrapper ul li a");
  const collapsiveSearchBar = $("#collapse-search");

  // API KEYS
  const api_key =
    "live_JHEDOORWcKF8jbvLzgW2TmTkm3N2K5Xjo4tGM8mWlvmwKP4seqwRCKzkZhd7DY1V";
  const api_url = "https://api.thecatapi.com/v1/images/search?limit=16";

  $(window).scroll(function () {
    const scrollY = $(window).scrollTop();

    if (scrollY > 0 || !navbarOrigPos) {
      // if window scrollbar is not on original position
      navbarOrigPos = true;
      $(navbar)
        .removeClass("navbar-dark bg-dark")
        .addClass("navbar-lght bg-light");
      $(collapsiveSearchBar).removeClass("bg-dark").addClass("bg-light");
      $(".navbar-brand img").css("filter", `brightness(0%)`);
      icons_navbar.forEach((element) =>
        $(element).removeClass("text-white").addClass("text-dark")
      );
    } else if (scrollY === 0 && navbarOrigPos) {
      // if window scrollbar on original position
      navbarOrigPos = false;
      $(navbar)
        .removeClass("navbar-lght bg-light")
        .addClass("navbar-dark bg-dark");
      $(".navbar-brand img").css("filter", `brightness(100%)`);

      $(collapsiveSearchBar).removeClass("bg-light").addClass("bg-dark");

      icons_navbar.forEach((element) =>
        $(element).removeClass("text-dark").addClass("text-white")
      );
    }
  });

  $.ajax({
    type: "get",
    url: api_url,
    dataType: "json",
    headers: {
      "x-api-key": api_key,
    },
    success: function (response) {
      // console.log(response);
      response.map((element, index) => {
        const cat_img_wrapper = $("<div></div>").addClass(
          "cat-wrapper col-lg-3 col-6 p-0"
        );
        const cat_img = $("<img>").attr("src", element.url);
        $(cat_img_wrapper).append(cat_img);

        $("#cat-container").append(cat_img_wrapper);
      });
    },

    error: function (xhr, status, error) {
      console.log(status, error);
    },
  });
});
