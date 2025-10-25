/* Theme JS */

(function ($) {
  "use strict";

  jQuery(document).mouseup(function (e) {
    var container = jQuery(".header-search .product-categories");

    if (
      !container.is(e.target) &&
      container.has(e.target).length === 0 &&
      !jQuery(".cate-toggler").is(e.target)
    ) {
      /* if the target of the click isn't the container nor a descendant of the container */
      if (jQuery(".header-search .product-categories").hasClass("open")) {
        jQuery(".header-search .product-categories").removeClass("open");
      }
    }

    container = jQuery(".atc-notice-wrapper");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      jQuery(".atc-notice-wrapper").fadeOut();
    }

    //hide search input if need
    container = jQuery("#searchform");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      jQuery("#ws").removeClass("show");
    }
  });

  jQuery(document).ready(function () {
    // Show/hide search input
    jQuery("#wsearchsubmit").on("click", function () {
      if (jQuery("#ws").width() == 0) {
        if (jQuery("#ws").hasClass("show")) {
          jQuery("#ws").removeClass("show");
        } else {
          jQuery("#ws").addClass("show");
          return false;
        }
      }
    });

    // Search Top
    jQuery(".search-dropdown .widget_product_search").on(
      "mouseover",
      function () {
        jQuery(this).find("#searchform").stop(true, true).slideDown();
      }
    );
    jQuery(".search-dropdown .widget_product_search").on(
      "mouseleave",
      function () {
        jQuery(this).find("#searchform").stop(true, true).slideUp();
      }
    );

    jQuery(".search-dropdown .widget_search").on("mouseover", function () {
      jQuery(this).find("#blogsearchform").stop(true, true).slideDown();
    });
    jQuery(".search-dropdown .widget_search").on("mouseleave", function () {
      jQuery(this).find("#blogsearchform").stop(true, true).slideUp();
    });

    //Vertical dropdown menu
    jQuery(".vmenu-toggler").on("mouseover", function () {
      jQuery(this).find(".vmenu-content").stop(true, true).slideDown();
    });
    jQuery(".vmenu-toggler").on("mouseleave", function () {
      jQuery(this).find(".vmenu-content").stop(true, true).slideUp();
    });

    //Horizontal dropdown menu
    //default, not selected locations
    jQuery(".horizontal-menu .nav-menu > ul").superfish({
      delay: 100,
      speed: "fast",
    });
    //default, selected locations
    jQuery(".primary-menu-container ul.nav-menu").superfish({
      delay: 100,
      speed: "fast",
    });

    //Mobile Menu
    var mobileMenuWrapper = jQuery(".mobile-menu-container");
    mobileMenuWrapper.find(".menu-item-has-children").each(function () {
      var linkItem = jQuery(this).find("a").first();
      linkItem.after('<i class="fa fa-angle-right"></i>');
    });
    //calculate the init height of menu
    var totalMenuLevelFirst = jQuery(
      ".mobile-menu-container .nav-menu > li"
    ).length;
    var mobileMenuH = totalMenuLevelFirst * 40 + 30; //40 is height of one item, 10 is padding-top + padding-bottom;

    jQuery(".mbmenu-toggler").on("click", function () {
      if (mobileMenuWrapper.hasClass("open")) {
        mobileMenuWrapper.removeClass("open");
        mobileMenuWrapper.animate({ height: 0 }, "fast");
      } else {
        mobileMenuWrapper.addClass("open");
        mobileMenuWrapper.animate({ height: mobileMenuH }, "fast");
      }
    });
    //set the height of all li.menu-item-has-children items
    jQuery(".mobile-menu-container li.menu-item-has-children").each(
      function () {
        jQuery(this).css({ height: 40, overflow: "hidden" });
      }
    );
    //process the parent items
    jQuery(".mobile-menu-container li.menu-item-has-children").each(
      function () {
        var parentLi = jQuery(this);
        var dropdownUl = parentLi.find("ul.sub-menu").first();

        parentLi
          .find("> .fa")
          .first()
          .on("click", function () {
            //set height is auto for all parents dropdown
            parentLi.parents("li.menu-item-has-children").css("height", "auto");
            //set height is auto for menu wrapper
            mobileMenuWrapper.css({ height: "auto" });

            var dropdownUlheight = dropdownUl.outerHeight() + 40;

            if (parentLi.hasClass("opensubmenu")) {
              parentLi.removeClass("opensubmenu");
              parentLi.animate({ height: 40 }, "fast", function () {
                //calculate new height of menu wrapper
                mobileMenuH = mobileMenuWrapper.outerHeight();
              });
              parentLi.find("> .fa").first().removeClass("fa-angle-down");
              parentLi.find("> .fa").first().addClass(" fa-angle-right");
            } else {
              parentLi.addClass("opensubmenu");
              parentLi.animate(
                { height: dropdownUlheight },
                "fast",
                function () {
                  //calculate new height of menu wrapper
                  mobileMenuH = mobileMenuWrapper.outerHeight();
                }
              );
              parentLi.find("> .fa").first().addClass("fa-angle-down");
              parentLi.find("> .fa").first().removeClass(" fa-angle-right");
            }
          });
      }
    );

    //Mini Cart
    if (jQuery(window).width() > 1024) {
      jQuery(".widget_shopping_cart").on("mouseover", function () {
        var mCartHeight = jQuery(".mini_cart_inner").outerHeight();
        var cCartHeight = jQuery(".mini_cart_content").outerHeight();

        if (cCartHeight < mCartHeight) {
          jQuery(".mini_cart_content")
            .stop(true, false)
            .animate({ height: mCartHeight });
        }
      });
      jQuery(".widget_shopping_cart").on("mouseleave", function () {
        jQuery(".mini_cart_content").animate({ height: "0" });
      });
    }
    //For tablet & mobile
    jQuery(".widget_shopping_cart").on("click", function (event) {
      if (jQuery(window).width() < 1025) {
        var closed = false;
        var mCartHeight = jQuery(".mini_cart_inner").outerHeight();
        var mCartToggler = jQuery(".cart-toggler");
        if (jQuery(".mini_cart_content").height() == 0) {
          closed = true;
        }
        if (
          mCartToggler.is(event.target) ||
          mCartToggler.has(event.target).length != 0 ||
          mCartToggler.is(event.target)
        ) {
          event.preventDefault();
          if (closed) {
            jQuery(".mini_cart_content").animate({ height: mCartHeight });
            closed = false;
          } else {
            jQuery(".mini_cart_content").animate({ height: "0" }, function () {
              closed = true;
            });
          }
        }
      }
    });

    //Header Search by category
    var cateToggler = jQuery(".cate-toggler");

    jQuery(".header-search .product-categories").prepend(
      '<li><a href="' +
        jQuery("#searchform").attr("action") +
        '">' +
        cateToggler.html() +
        "</a></li>"
    );

    cateToggler.on("click", function () {
      jQuery(".header-search .product-categories").toggleClass("open");
    });

    /* Init values */
    var searchCat = ""; //category to search, set when click on a category
    var currentCat = RoadgetParameterByName(
      "product_cat",
      jQuery(".header-search .product-categories .current-cat a").attr("href")
    ); /* when SEO off */
    var currentCatName = jQuery(".current-cat a").html();

    if (currentCatName != "") {
      cateToggler.html(currentCatName);

      //change form action when click submit
      jQuery("#wsearchsubmit").on("click", function () {
        if (searchCat == "") {
          jQuery("#searchform").attr(
            "action",
            jQuery(".header-search .product-categories .current-cat a").attr(
              "href"
            )
          );
        }
      });
    }
    if (currentCat != "") {
      /* when SEO off, we need product_cat */
      if (!(jQuery("#product_cat").length > 0)) {
        jQuery("#searchform").append(
          '<input type="hidden" id="product_cat" name="product_cat" value="' +
            currentCat +
            '" />'
        );
      }
      jQuery("#product_cat").val(currentCat);
    }

    jQuery(".header-search .product-categories a").each(function () {
      jQuery(this).on("click", function (event) {
        event.preventDefault();

        jQuery(".header-search .product-categories a.active").removeClass(
          "active"
        );
        jQuery(this).addClass("active");
        jQuery(".header-search .product-categories").removeClass("open");
        jQuery("#searchform").attr("action", jQuery(this).attr("href"));
        cateToggler.html(jQuery(this).html());
        searchCat = jQuery(this).attr("href");

        /* when SEO off, we need product_cat */
        if (
          !(jQuery("#product_cat").length > 0) &&
          RoadgetParameterByName("product_cat", jQuery(this).attr("href")) != ""
        ) {
          jQuery("#searchform").append(
            '<input type="hidden" id="product_cat" name="product_cat" value="" />'
          );
        }
        jQuery("#product_cat").val(
          RoadgetParameterByName("product_cat", jQuery(this).attr("href"))
        );
      });
    });

    //footer

    if (jQuery(window).width() < 992) {
      var elementClick = ".footer .footer-middle .current";
      var elementSlide = ".toogle-content";
      var activeClass = "active";

      jQuery(elementClick).on("click", function (e) {
        e.stopPropagation();
        var subUl = jQuery(this).next(elementSlide);
        if (subUl.is(":hidden")) {
          subUl.slideDown();
          jQuery(this).addClass(activeClass);
        } else {
          subUl.slideUp();
          jQuery(this).removeClass(activeClass);
        }
        jQuery(elementClick).not(this).next(elementSlide).slideUp();
        jQuery(elementClick).not(this).removeClass(activeClass);
        e.preventDefault();
      });

      jQuery(elementSlide).on("click", function (e) {
        e.stopPropagation();
      });

      jQuery(document).on("click", function (e) {
        e.stopPropagation();
        var elementHide = jQuery(elementClick).next(elementSlide);
        jQuery(elementHide).slideUp();
        jQuery(elementClick).removeClass("active");
      });
    }

    //add to cart callback
    jQuery("body").append(
      '<div class="atc-notice-wrapper"><div class="atc-notice"></div><div class="close"><i class="fa fa-times-circle"></i></div></div>'
    );

    jQuery(".atc-notice-wrapper .close").on("click", function () {
      jQuery(".atc-notice-wrapper").fadeOut();
      jQuery(".atc-notice").html("");
    });
    var ajaxPId = 0;
    jQuery("body").on("adding_to_cart", function (event, button, data) {
      ajaxPId = button.attr("data-product_id");
    });
    jQuery("body").on("added_to_cart", function (event, fragments, cart_hash) {
      //get product info by ajax
      jQuery.post(
        ajaxurl,
        {
          action: "get_productinfo",
          data: { pid: ajaxPId },
        },
        function (response) {
          jQuery(".atc-notice").html(response);
          //show product info after added
          jQuery(".atc-notice-wrapper").fadeIn();
        }
      );
    });
    jQuery("body").on("added_to_cart", function (event, fragments, cart_hash) {
      //show product info after added
      jQuery(".atc-notice-wrapper").fadeIn();
    });

    //Product images on details page
    jQuery(".single-images").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      fade: true,
      asNavFor: ".single-thumbnails",
    });
    jQuery(".single-thumbnails").slick({
      asNavFor: ".single-images",
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
    });

    //Thumbnails click
    jQuery("a.yith_magnifier_thumbnail").live("click", function () {
      jQuery("a.yith_magnifier_thumbnail").removeClass("active");
      jQuery(this).addClass("active");
    });

    // Shop toolbar sort
    jQuery(".toolbar .orderby").chosen({ disable_search: true, width: "auto" });

    //currency switcher
    jQuery(".wcml_currency_switcher").chosen({
      disable_search: true,
      width: "auto",
    });

    //Brand logos
    jQuery(".brands-logo .brands-carousel").each(function () {
      var huytuan_brandcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        infinite: true,
        slideSpeed: huytuan_brandanimate,
        autoPlay: huytuan_brandscroll,
        items: 6,
        itemsDesktop: [1199, 6],
        itemsDesktopSmall: [992, 6],
        itemsTablet: [767, 6],
        itemsTabletSmall: false,
        itemsMobile: [479, 6],
        addClassActive: true,
        navigation: false,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
          this.$owlItems.removeClass("first-active");
          this.$owlItems.eq(this.currentItem).addClass("first-active");
        },
      });
    });

    //Brand logos vertical
    jQuery(".brands-logo1 .brands-carousel").each(function () {
      var huytuan_brandcols = jQuery(this).attr("data-col");
      jQuery(this).slick({
        infinite: true,
        easing: "linear",
        slidesToShow: 5,
        vertical: true,
        dots: false,
        arrows: true,
        autoplay: huytuan_brandscroll,
        autoplaySpeed: huytuan_brandanimate,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              vertical: false,
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              vertical: false,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              vertical: false,
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      });
    });

    //Brand logos 2
    jQuery(".brands-logo2 .brands-carousel").each(function () {
      var huytuan_brandcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        infinite: true,
        slideSpeed: huytuan_brandanimate,
        autoPlay: huytuan_brandscroll,
        items: 2,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [992, 2],
        itemsTablet: [767, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 2],
        addClassActive: true,
        navigation: false,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
          this.$owlItems.removeClass("first-active");
          this.$owlItems.eq(this.currentItem).addClass("first-active");
        },
      });
    });

    //Categories carousel
    jQuery(".categories-carousel").each(function () {
      var huytuan_categoriescols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        infinite: true,
        autoPlay: false,
        slideSpeed: huytuan_categoriesanimate,

        items: 6,
        itemsDesktop: [1199, 5],
        itemsDesktopSmall: [992, 4],
        itemsTablet: [767, 3],
        itemsTabletSmall: false,
        itemsMobile: [479, 2],
        addClassActive: true,
        navigation: false,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
          this.$owlItems.removeClass("first-active");
          this.$owlItems.eq(this.currentItem).addClass("first-active");
        },
      });
    });

    jQuery(".countbox.hastime").each(function () {
      var countTime = jQuery(this).attr("data-time");

      jQuery(this).countdown(countTime, function (event) {
        jQuery(this).html(
          '<span class="timebox day"><strong>' +
            event.strftime("%D") +
            '</strong>days</span><span class="timebox hour"><strong>' +
            event.strftime("%H") +
            '</strong>hrs</span><span class="timebox minute"><strong>' +
            event.strftime("%M") +
            '</strong>mins</span><span class="timebox second"><strong>' +
            event.strftime("%S") +
            "</strong>secs</span>"
        );
      });
      //jQuery(this).countdown('stop');
    });

    //Product Tabs
    window.setTimeout(function () {
      var tabCount = 1;
      var tabTotal = jQuery(".home-tabs .wpb_content_element").length;
      jQuery(".home-tabs").prepend(
        '<div class="title-container"><ul class="home-tabs-title"></ul></div>'
      );
      var tabTitle = jQuery(".home-tabs .home-tabs-title");
      jQuery(".home-tabs .wpb_content_element").each(function () {
        var tabClass = "";
        var tabLinkClass = "";
        var tabWidget = jQuery(this).next(".woocommerce");
        tabWidget.addClass("product-tabs");
        var widgetTitle = jQuery(this).find("h3").html();
        tabWidget.attr("id", "wpb_content_element-" + tabCount);

        if (tabCount == 1) {
          tabClass = "first";
          tabLinkClass = "active";

          tabWidget.addClass("active");

          //first tab carousel
          roadtabCarousel(
            "#wpb_content_element-" + tabCount + " .shop-products",
            5,
            4,
            3,
            2,
            1
          );
        } else {
          tabWidget.addClass("heightzero");
        }
        if (tabCount == tabTotal) {
          tabClass = "last";
        }

        tabTitle.append(
          '<li class="' +
            tabClass +
            '"><a class="tab-link ' +
            tabLinkClass +
            '" href="#" rel="wpb_content_element-' +
            tabCount +
            '">' +
            widgetTitle +
            "</a></li>"
        );

        tabCount++;

        //tab click
        jQuery(".home-tabs .tab-link").each(function () {
          jQuery(this).on("click", function (event) {
            event.preventDefault();
            var tabRel = jQuery(this).attr("rel");

            jQuery(".home-tabs .tab-link").removeClass("active");
            jQuery(this).addClass("active");

            jQuery(".home-tabs .product-tabs.active").fadeOut(300, function () {
              jQuery(".home-tabs .product-tabs").addClass("heightzero");
              jQuery("#" + tabRel).removeClass("heightzero");
              jQuery(this).fadeIn(300);
            });
            jQuery(".home-tabs .product-tabs").removeClass("active");
            jQuery("#" + tabRel).addClass("active");

            //make carousel
            roadtabCarousel("#" + tabRel + " .shop-products", 5, 4, 3, 2, 1);
          });
        });
      });
    }, 1000);

    //Products carousel
    jQuery(".products-carousel .wpb_wrapper > h3").each(function () {
      var pwidgetTitle = jQuery(this).html();
      jQuery(this).html("<span>" + pwidgetTitle + "</span>");
    });
    jQuery(".products-carousel .shop-products").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 4,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [991, 4],
        itemsTablet: [768, 4],
        itemsTabletSmall: [680, 4],
        itemsMobile: [479, 4],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
          this.$owlItems.removeClass("first-active");
          this.$owlItems.eq(this.currentItem).addClass("first-active");
        },
      });
    });
    //Products carousel2
    jQuery(".products-carousel2 .wpb_wrapper > h3").each(function () {
      var pwidgetTitle = jQuery(this).html();
      jQuery(this).html("<span>" + pwidgetTitle + "</span>");
    });
    jQuery(".products-carousel2 .shop-products").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [980, 2],
        itemsTablet: [768, 2],
        itemsTabletSmall: [680, 1],
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
        },
      });
    });

    //products carousel1

    jQuery(".products-carousel1 .shop-products").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [992, 2],
        itemsTablet: [768, 2],
        itemsTabletSmall: [600, 1],
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
        },
      });
    });

    jQuery(".products-slick1 .shop-products").slick({
      autoplay: false,
      arrows: true,
      dots: false,
      slidesToShow: 3,
      draggable: false,
      infinite: true,
      pauseOnHover: false,
      swipe: false,
      touchMove: false,
      vertical: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            vertical: false,
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            vertical: false,
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    });
    jQuery(".products-slick2 .shop-products").slick({
      autoplay: false,
      arrows: true,
      dots: false,
      slidesToShow: 6,
      draggable: false,
      infinite: true,
      pauseOnHover: false,
      swipe: false,
      touchMove: false,
      vertical: true,
      speed: 1000,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            vertical: false,
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            vertical: false,
            slidesToShow: 5,
            slidesToScroll: 1,
          },
        },
      ],
    });

    //products carousel3
    jQuery(".products-carousel3 .shop-products").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [992, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: [600, 1],
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
        },
      });
    });
    //products carousel4
    jQuery(".products-carousel4 .shop-products").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [992, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: [600, 1],
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
        },
      });
    });

    //products carousel3
    jQuery(".products-carousel5 .shop-products").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 3,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [992, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: [600, 1],
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
        },
      });
    });

    //Sale Products layout1

    jQuery(".sale-products .shop-products").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 2,
        itemsDesktop: [1199, 2],
        itemsDesktopSmall: [992, 2],
        itemsTablet: [767, 2],
        itemsTabletSmall: [600, 2],
        itemsMobile: [479, 2],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
        },
      });
    });

    //featured tabs

    jQuery(".deal-off-day-tabs .shop-products").prepend(
      '<div class="thumbs-image"><ul></ul></div>'
    );
    var tabTotal = jQuery(".deal-off-day-tabs .shop-products .item-col").length;
    var tabTitle = jQuery(".deal-off-day-tabs .shop-products .thumbs-image ul");
    var ftabscount = 1;
    jQuery(".deal-off-day-tabs .shop-products .item-col").each(function () {
      var thumbs_image = jQuery(this).find(".product-image a").html();
      var tabClass = "";
      var tabLinkClass = "";
      var tabItem = jQuery(this);
      tabItem.addClass("product-tabs").attr("id", "tabs-" + ftabscount);

      if (ftabscount == 1) {
        tabClass = "first";
        tabLinkClass = "active";

        tabItem.addClass("active");
      } else {
        tabItem.addClass("heightzero");
      }
      if (ftabscount == tabTotal) {
        tabClass = "last";
      }

      tabTitle.append(
        '<li class="' +
          tabClass +
          '"><a class="tab-link ' +
          tabLinkClass +
          '" href="#" rel="tabs-' +
          ftabscount +
          '"><span>' +
          thumbs_image +
          "</span></a></li>"
      );
      ftabscount++;

      //tab click
      jQuery(".deal-off-day-tabs .tab-link").each(function () {
        jQuery(this).on("click", function (event) {
          event.preventDefault();
          var tabRel = jQuery(this).attr("rel");

          jQuery(".deal-off-day-tabs .tab-link").removeClass("active");
          jQuery(this).addClass("active");

          jQuery(".deal-off-day-tabs .product-tabs.active").fadeOut(
            300,
            function () {
              jQuery(".deal-off-day-tabs .product-tabs").addClass("heightzero");
              jQuery("#" + tabRel).removeClass("heightzero");
              jQuery(this).fadeIn(300);
            }
          );
          jQuery(".deal-off-day-tabs .product-tabs").removeClass("active");
          jQuery("#" + tabRel).addClass("active");
        });
      });
    });

    //Latest posts carousel - layout 1
    jQuery(".latest-posts .wpb_wrapper > h3").each(function () {
      var pwidgetTitle = jQuery(this).html();
      jQuery(this).html("<span>" + pwidgetTitle + "</span>");
    });
    //Latest posts carousel
    jQuery(".latest-posts .posts-carousel").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [992, 3],
        itemsTablet: [768, 3],
        itemsTabletSmall: [600, 3],
        itemsMobile: [479, 3],
        addClassActive: true,
        navigation: true,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
        },
      });
    });

    // latest posts1

    jQuery(".latest-posts1 .posts-carousel").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [992, 1],
        itemsTablet: [768, 1],
        itemsTabletSmall: [600, 1],
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: false,
        autoPlay: true,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
        },
      });
    });

    //Testimonials carousel
    jQuery(".box-testimonial .wpb_wrapper > h3").each(function () {
      var pwidgetTitle = jQuery(this).html();
      jQuery(this).html("<span>" + pwidgetTitle + "</span>");
    });

    jQuery(".testimonials-list").each(function () {
      var huytuan_postcols = jQuery(this).attr("data-col");
      jQuery(this).owlCarousel({
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [992, 1],
        itemsTablet: [768, 1],
        itemsTabletSmall: [600, 1],
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: true,
        autoPlay: huytuan_testiscroll,
        slideSpeed: huytuan_testianimate,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
        },
      });
    });

    //Cross-sells Products carousel
    jQuery(".cross-carousel .shop-products").each(function () {
      jQuery(this).owlCarousel({
        items: 5,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [992, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
          this.$owlItems.removeClass("first-active");
          this.$owlItems.eq(this.currentItem).addClass("first-active");
        },
      });
    });

    //Image zoom
    jQuery(".zoom_in_marker").on("click", function () {
      jQuery.fancybox({
        href: jQuery(".woocommerce-main-image").attr("href"),
        openEffect: "elastic",
        closeEffect: "elastic",
      });
    });

    //Upsells Products carousel
    jQuery(".upsells .shop-products").each(function () {
      jQuery(this).owlCarousel({
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [992, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
          this.$owlItems.removeClass("first-active");
          this.$owlItems.eq(this.currentItem).addClass("first-active");
        },
      });
    });

    //Related Products carousel

    jQuery(".related .shop-products").each(function () {
      jQuery(this).owlCarousel({
        items: 5,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [992, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: false,
        itemsMobile: [479, 1],
        addClassActive: true,
        navigation: true,
        pagination: false,
        afterAction: function (el) {
          this.$owlItems.removeClass("last-active");
          this.$owlItems
            .eq(this.currentItem + (this.owl.visibleItems.length - 1))
            .addClass("last-active");
          this.$owlItems.removeClass("first-active");
          this.$owlItems.eq(this.currentItem).addClass("first-active");
        },
      });
    });

    //Category view mode
    jQuery(".view-mode").each(function () {
      jQuery(this)
        .find(".grid")
        .on("click", function (event) {
          event.preventDefault();

          jQuery(".view-mode").find(".grid").addClass("active");
          jQuery(".view-mode").find(".list").removeClass("active");

          jQuery("#archive-product .shop-products").removeClass("list-view");
          jQuery("#archive-product .shop-products").addClass("grid-view");

          jQuery("#archive-product .list-col4").removeClass(
            "col-xs-12 col-sm-4"
          );
          jQuery("#archive-product .list-col8").removeClass(
            "col-xs-12 col-sm-8"
          );
        });
      jQuery(this)
        .find(".list")
        .on("click", function (event) {
          event.preventDefault();

          jQuery(".view-mode").find(".list").addClass("active");
          jQuery(".view-mode").find(".grid").removeClass("active");

          jQuery("#archive-product .shop-products").addClass("list-view");
          jQuery("#archive-product .shop-products").removeClass("grid-view");

          jQuery("#archive-product .list-col4").addClass("col-xs-12 col-sm-4");
          jQuery("#archive-product .list-col8").addClass("col-xs-12 col-sm-8");
        });
    });

    //Tooltip
    jQuery(".yith-wcwl-add-to-wishlist a").each(function () {
      huytuantip(jQuery(this), "html");
    });
    var compareText = jQuery(".single-product-info .compare").html();
    jQuery(".single-product-info .compare").html(
      '<span class="comparetip">' + compareText + "</span>"
    );
    jQuery(".comparetip").each(function () {
      huytuantip(jQuery(this), "html");
    });
    jQuery(".compare-button a").each(function () {
      huytuantip(jQuery(this), "html");
    });
    jQuery(".add_to_cart_inline a").each(function () {
      huytuantip(jQuery(this), "html");
    });
    jQuery(".quickviewbtn .quickview").each(function () {
      huytuantip(jQuery(this), "html");
    });
    jQuery(".sharefriend a").each(function () {
      huytuantip(jQuery(this), "html");
    });
    jQuery(".social-icons a").each(function () {
      huytuantip(jQuery(this), "title");
    });

    //Quickview
    jQuery(".product-wrapper").each(function () {
      jQuery(this).on("mouseover click", function () {
        jQuery(this).addClass("hover");
      });
      jQuery(this).on("mouseleave", function () {
        jQuery(this).removeClass("hover");
      });
    });
    //Add quick view box
    jQuery("body").append(
      '<div class="quickview-wrapper"><span class="qvbtn qvprev"><i class="fa fa-caret-left"></i></span><span class="qvbtn qvnext"><i class="fa fa-caret-right"></i></span><div class="quick-modal"><span class="qvloading"></span><span class="closeqv"><i class="fa fa-times"></i></span><div id="quickview-content"></div><div class="clearfix"></div></div></div>'
    );

    //quick view id array
    var arrIdx = 0;
    var quickviewArr = Array();
    var nextArrID = 0;
    var prevArrID = 0;

    //show quick view
    jQuery(".quickview").each(function () {
      var quickviewLink = jQuery(this);
      var productID = quickviewLink.attr("data-quick-id");

      if (quickviewArr.indexOf(productID) == -1) {
        quickviewArr[arrIdx] = productID;
        arrIdx++;
      }
      quickviewLink.on("click", function (event) {
        event.preventDefault();

        prevArrID = quickviewArr[quickviewArr.indexOf(productID) - 1];
        nextArrID = quickviewArr[quickviewArr.indexOf(productID) + 1];

        jQuery(".qvprev").attr("data-quick-id", prevArrID);
        jQuery(".qvnext").attr("data-quick-id", nextArrID);

        showQuickView(productID, quickviewArr);
      });
    });
    jQuery(".qvprev").on("click", function () {
      showQuickView(jQuery(this).attr("data-quick-id"), quickviewArr);
    });
    jQuery(".qvnext").on("click", function () {
      showQuickView(jQuery(this).attr("data-quick-id"), quickviewArr);
    });

    jQuery(".closeqv").on("click", function () {
      hideQuickView();
    });

    //Fancy box
    jQuery(".fancybox").fancybox({
      openEffect: "elastic",
      closeEffect: "fade",
      beforeShow: function () {
        if (this.title) {
          // New line
          this.title += '<div class="fancybox-social">';

          // Add tweet button
          this.title +=
            '<a href="https://twitter.com/share" class="twitter-share-button" data-count="none" data-url="' +
            this.href +
            '">Tweet</a> ';

          // Add FaceBook like button
          this.title +=
            '<iframe src="//www.facebook.com/plugins/like.php?href=' +
            this.href +
            '&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:110px; height:23px;" allowTransparency="true"></iframe></div>';
        }
      },
      afterShow: function () {
        // Render tweet button
        twttr.widgets.load();
      },
      helpers: {
        title: {
          type: "inside",
        },
        overlay: {
          showEarly: false,
        },
      },
    });

    //Fancy box for single project
    jQuery(".prfancybox").fancybox({
      openEffect: "fade",
      closeEffect: "elastic",
      nextEffect: "fade",
      prevEffect: "fade",
      helpers: {
        title: {
          type: "inside",
        },
        overlay: {
          showEarly: false,
        },
        buttons: {},
        thumbs: {
          width: 100,
          height: 100,
        },
      },
    });

    //Counter up
    jQuery(".counter-number span").counterUp({
      delay: 10,
      time: 1000,
    });

    //Go to top
    jQuery("#back-top").on("click", function () {
      jQuery("html, body").animate({ scrollTop: 0 }, "slow");
    });

    //Vertical menu on home 6
    jQuery(".collapse-menu .menu li.menu-item-has-children > a").each(
      function () {
        jQuery(this).after('<i class="fa fa-chevron-right"></i>');
      }
    );
    jQuery(".collapse-menu .menu li.menu-item-has-children > .fa").each(
      function () {
        jQuery(this).on("click", function () {
          var element = jQuery(this).parent("li");

          if (element.hasClass("open")) {
            element.removeClass("open");
            element.find("li").removeClass("open");
            element.find("ul").slideUp();
          } else {
            element.addClass("open");
            element.children("ul").slideDown();
            element.siblings("li").children("ul").slideUp();
            element.siblings("li").removeClass("open");
            element.siblings("li").find("li").removeClass("open");
            element.siblings("li").find("ul").slideUp();
          }
        });
      }
    );
    //end - vertical menu on home 6

    //Landing tabs
    jQuery(".landing-link a").each(function () {
      var menulinkID = jQuery(this).attr("href");

      if (jQuery(menulinkID).length > 0) {
        var targetOffset = jQuery(menulinkID).offset().top;

        jQuery(this).on("click", function (event) {
          event.preventDefault();

          jQuery("html, body").animate({ scrollTop: targetOffset }, "slow");
        });
      }
    });

    //Sticky header
    //add a space for header
    if (huytuan_sticky_header == true && jQuery(".header-sticky").length > 0) {
      var headerSpaceH = jQuery(".header-sticky").height();
      jQuery(".header-sticky").after(
        '<div class="headerSpace" style="height: ' +
          headerSpaceH +
          'px;"></div>'
      );
    }
  });

  // Scroll
  var currentP = 0;
  var stickyOffset = 0;
  if (huytuan_sticky_header == true && jQuery(".header-sticky").length > 0) {
    stickyOffset = jQuery(".header-sticky").offset().top;
    stickyOffset += jQuery(".header-sticky").outerHeight();
  }
  jQuery(window).scroll(function () {
    var headerH = jQuery(".header-container").height();
    var scrollP = jQuery(window).scrollTop();

    if (jQuery(window).width() > 1024) {
      if (scrollP != currentP) {
        //Back to top
        if (scrollP >= headerH) {
          jQuery("#back-top").addClass("show");
        } else {
          jQuery("#back-top").removeClass("show");
        }
        //Sticky header
        if (huytuan_sticky_header == true) {
          if (scrollP >= stickyOffset) {
            jQuery("#back-top").addClass("show");
            jQuery(".header-sticky").addClass("ontop");
            jQuery(".headerSpace").addClass("show");
            jQuery(".logo-scroll").show();
            jQuery(".hide-scroll").hide();
          } else {
            jQuery("#back-top").removeClass("show");
            jQuery(".header-sticky").removeClass("ontop show");
            jQuery(".headerSpace").removeClass("show");
            jQuery(".hide-scroll").show();
            jQuery(".logo-scroll").hide();
          }
          if (scrollP >= stickyOffset + 20) {
            jQuery(".header-sticky").addClass("show");
          }
        }
        currentP = jQuery(window).scrollTop();
      }
    }
  });

  //For categories menu
  var oldCateMenuH, realMMH, realCateMenuH;

  jQuery(document).ready(function () {
    //Hide more button on default wp menu
    if (
      jQuery(".categories-menu-container").length > 0 ||
      jQuery(".categories-menu > ul").length > 0
    ) {
      jQuery(".morelesscate").css("display", "none");
      jQuery(".morelesscate").addClass("alwayshide");
    }
    //Hide button if number of menu is not bigger then number menu in options
    if (
      jQuery("#mega_main_menu ul.mega_main_menu_ul > li.menu-item").length <
      huytuan_menu_number
    ) {
      jQuery(".morelesscate").css("display", "none");
      jQuery(".morelesscate").addClass("alwayshide");
    }
  });

  jQuery(window).load(function () {
    //Projects filter with shuffle.js
    jQuery(".list_projects #projects_list").shuffle({
      itemSelector: ".project",
    });

    jQuery(".filter-options .btn").on("click", function () {
      var filterBtn = jQuery(this),
        isActive = filterBtn.hasClass("active"),
        group = isActive ? "all" : filterBtn.data("group");

      // Hide current label, show current label in title
      if (!isActive) {
        jQuery(".filter-options .active").removeClass("active");
      }

      filterBtn.toggleClass("active");

      // Filter elements
      jQuery(".list_projects #projects_list").shuffle("shuffle", group);
    });
  });
})(jQuery);

("use strict");

function RoadgetParameterByName(name, string) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(string);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
//Product tabs carousel
function roadtabCarousel(
  element,
  itemnumbers1,
  itemnumbers2,
  itemnumbers3,
  itemnumbers4,
  itemnumbers5
) {
  //jQuery(element).unslick();
  var huytuan_postcols = jQuery(element).attr("data-col");
  jQuery(element).owlCarousel({
    items: itemnumbers1,
    itemsDesktop: [1199, itemnumbers2],
    itemsDesktopSmall: [980, itemnumbers3],
    itemsTablet: [768, itemnumbers4],
    itemsTabletSmall: false,
    itemsMobile: [479, itemnumbers5],
    navigation: true,
    addClassActive: true,
    afterAction: function (el) {
      this.$owlItems.removeClass("last-active");
      this.$owlItems
        .eq(this.currentItem + (this.owl.visibleItems.length - 1))
        .addClass("last-active");
    },
  });
}

//remove item from mini cart by ajax
function roadMiniCartRemove(url, itemid) {
  jQuery(".mini_cart_content").addClass("loading");
  jQuery(".cart-form").addClass("loading");

  jQuery.get(url, function (data, status) {
    if (status == "success") {
      //update mini cart info
      jQuery.post(
        ajaxurl,
        {
          action: "get_cartinfo",
        },
        function (response) {
          var cartinfo = response.split("|");
          var itemAmount = cartinfo[0];
          var cartTotal = cartinfo[1];
          var orderTotal = cartinfo[2];

          jQuery(".cart-quantity").html(itemAmount);
          jQuery(".cart-total .amount").html(cartTotal);
          jQuery(".total .amount").html(cartTotal);

          jQuery(".cart-subtotal .amount").html(cartTotal);
          jQuery(".order-total .amount").html(orderTotal);
        }
      );
      //remove item line from mini cart & cart page
      jQuery("#mcitem-" + itemid).animate({
        height: "0",
        "margin-bottom": "0",
        "padding-bottom": "0",
        "padding-top": "0",
      });
      setTimeout(function () {
        jQuery("#mcitem-" + itemid).remove();
        jQuery("#lcitem-" + itemid).remove();
        //set new height
        var mCartHeight = jQuery(".mini_cart_inner").outerHeight();
        jQuery(".mini_cart_content").animate({ height: mCartHeight });
      }, 1000);

      jQuery(".mini_cart_content").removeClass("loading");
      jQuery(".cart-form").removeClass("loading");
    }
  });
}
function huytuantip(element, content) {
  if (content == "html") {
    var tipText = element.html();
  } else {
    var tipText = element.attr("title");
  }
  element.on("mouseover", function () {
    if (jQuery(".huytuantip").length == 0) {
      element.before(
        '<span class="huytuantip" style="display: none;">' + tipText + "</span>"
      );

      var tipWidth = jQuery(".huytuantip").outerWidth();
      var tipPush = -(tipWidth / 2 - element.outerWidth() / 2);
      jQuery(".huytuantip").css("margin-left", tipPush);
      jQuery(".huytuantip").fadeIn();
    }
  });
  element.on("mouseleave", function () {
    jQuery(".huytuantip").fadeOut();
    jQuery(".huytuantip").remove();
  });
}
function showQuickView(productID, quickviewArr) {
  //jQuery('#quickview-content').html(''); /*clear content*/

  //change id for next/prev buttons
  prevArrID = quickviewArr[quickviewArr.indexOf(productID) - 1];
  nextArrID = quickviewArr[quickviewArr.indexOf(productID) + 1];

  jQuery(".qvprev").attr("data-quick-id", prevArrID);
  jQuery(".qvnext").attr("data-quick-id", nextArrID);

  jQuery("body").addClass("quickview");

  window.setTimeout(function () {
    jQuery(".quickview-wrapper").addClass("open");
    jQuery(".qvloading").fadeIn();

    jQuery.post(
      ajaxurl,
      {
        action: "product_quickview",
        data: productID,
      },
      function (response) {
        jQuery("#quickview-content").html(response);

        jQuery(".qvloading").fadeOut();
        /*variable product form*/
        jQuery(".variations_form").wc_variation_form();
        jQuery(".variations_form .variations select").change();

        /*thumbnails carousel*/
        jQuery(".quick-thumbnails");
        jQuery(".quick-thumbnails").slick({
          slidesToScroll: 1,
          slidesToShow: 4,
          arrows: false,
          dots: true,
        });
        /*thumbnail click*/
        jQuery(".quick-thumbnails a").each(function () {
          var quickThumb = jQuery(this);
          var quickImgSrc = quickThumb.attr("href");

          quickThumb.on("click", function (event) {
            event.preventDefault();

            jQuery(".main-image").find("img").attr("src", quickImgSrc);
          });
        });
        /*review link click*/

        jQuery(".woocommerce-review-link").on("click", function (event) {
          event.preventDefault();
          var reviewLink = jQuery(".see-all").attr("href");

          window.location.href = reviewLink + "#reviews";
        });
      }
    );
  }, 300);
}
function hideQuickView() {
  jQuery(".quickview-wrapper").removeClass("open");

  window.setTimeout(function () {
    jQuery("body").removeClass("quickview");
  }, 500);
}

function scrollToTop() {
  // Cách 1: Dùng thuộc tính CSS `scroll-behavior: smooth` (đã thêm ở trên)
  // window.scrollTo(0, 0);

  // Cách 2: Dùng JS để đảm bảo hoạt động trên mọi trình duyệt
  window.scrollTo({ top: 0, behavior: "smooth" });
}
