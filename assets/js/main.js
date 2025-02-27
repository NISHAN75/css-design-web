(function ($) {
    $(document).ready(function () {
        // header sticky
        // var windowOn = $(window);
        // windowOn.on('scroll', function () {
        //     if ($("body").hasClass("home")) {
        //         var scroll = windowOn.scrollTop();
        //         if (scroll < 100) {
        //             $(".header-area").removeClass("header-sticky");
        //             $(".header-offcanvas").removeClass("version-2");
        //         } else {
        //             $(".header-area").addClass("header-sticky");
        //             $(".header-offcanvas").addClass("version-2");
        //         }
        //     }
        // });


        // $(".modal-area").on("shown.bs.modal", function () {
        //     OverlayScrollbars($(".modal-body"), {
        //         className: "os-theme-custom",
        //         scrollbars: {
        //             visibility: "auto",
        //             autoHide: "leave",
        //             autoHideDelay: 500,
        //             dragScrolling: true,
        //             clickScrolling: true,
        //         },
        //         scrollBehavior: 'smooth',
        //     });
        // });


        let offcanvasElement = $(".header-offcanvas");
        offcanvasElement.on("show.bs.offcanvas", function () {
            $(".menu-icon").addClass("open");
            $(".close-icon span:nth-child(1)").css({
                transform: "rotate(45deg)"
            });
            $(".close-icon span:nth-child(2)").css({
                transform: "rotate(-45deg)",
                marginTop: "-2px"
            });
        });
        offcanvasElement.on("hide.bs.offcanvas", function () {
            $(".menu-icon").removeClass("open");
            $(".close-icon span:nth-child(1)").css({
                transform: ""
            });
            $(".close-icon span:nth-child(2)").css({
                transform: "",
                marginTop: "-2px"
            });
        });


        // nice select
        $('select').niceSelect();

        // slider

        // banner slider
        var bannerSlider = new Swiper(".banner-slider-wrapper", {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            speed: 1000,
        });
        
        bannerSlider.on("slideChange", function () {
            var activeIndex = bannerSlider.realIndex; 
            $(".slider-navigator ul li").removeClass("active");
            $(".slider-navigator ul li").eq(activeIndex).addClass("active");
        });
        
        // Click event for the navigator dots
        $(".slider-navigator ul li").each(function (index) {
            $(this).on("click", function () {
                bannerSlider.slideToLoop(index); 
            });
        });

        // brand slider 
		let brandSlider = new Swiper(".tp-brand-slider", {
			slidesPerView: "auto",
			loop: true,
			spaceBetween: 56,
			allowTouchMove: false,
			speed: 4000,
			autoplay: {
				delay: 1,
				disableOnInteraction: true,
			}
		});

        // quality slider
        var qualitySlider = new Swiper(".quality-slider-wrapper", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
              },
          });
        // project slider
          var projectSlider = new Swiper(".project-slider-wrapper", {
            slidesPerView: 3,
            spaceBetween: 24,
			keyboard: {
				enabled: true,
			},
			freeMode: true, // Allow smooth dragging
			breakpoints: {
				0: {
					slidesPerView: 1,
                    spaceBetween: 17,
				},
				480: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
                    spaceBetween: 24,
				},
				1200: {
					slidesPerView: 3,
				},
			},
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
              },
          });

       



        



 
        // animation
        gsap.registerPlugin(SplitText, ScrollTrigger);
        let textWrappers = $(".animation-text");

        // Split text into lines and letters
        let mainTitleSplit = new SplitText(textWrappers, {
            type: "lines,chars",
            linesClass: "line-wrapper overflow-hidden",
            charsClass: "letter",
            tag: "span"
        });

        // Animate each line's letters
        $(".line-wrapper").each(function () {
            let letters = $(this).find(".letter");
            gsap.from(letters, {
                scrollTrigger: {
                    trigger: this,
                    start: "top bottom",
                    end: "bottom top",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 0.5,
                stagger: 0.04,
                ease: "power3.inOut"
            });
        });
        // animation line
        gsap.utils.toArray(".animation-line").forEach((element) => {
            gsap.fromTo(
                element,
                {
                    y: 100,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 90%",
                        toggleActions: "play none none reverse",

                    },
                }
            );
        });
        // animation

  












        // OverlayScrollbars
        const {
            OverlayScrollbars,
            ClickScrollPlugin
        } = OverlayScrollbarsGlobal;
        // Initialize the ClickScrollPlugin
        OverlayScrollbars.plugin(ClickScrollPlugin);
        $("body").each(function () {
            OverlayScrollbars(this, {
                scrollbars: {
                    clickScroll: true,
                    autoHide: "leave",
                    dragScrolling: true,
                    clickScrolling: true,
                },
                scrollBehavior: 'smooth',
            });
        });
        // lenis
        // Initialize a new Lenis instance for smooth scrolling
        const lenis = new Lenis();

        // Listen for the 'scroll' event and log the event data to the console
        // lenis.on('scroll', (e) => {
        //     console.log(e);
        // });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);
        // lenis


    });
})(jQuery);