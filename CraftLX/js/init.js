document.addEventListener("DOMContentLoaded", function(){
  
  $(window).on('scroll', function() {
    
      var scroll = $(this).scrollTop();
      var topHeaderBar = $('.header');
    
      if(scroll < 25) {
          topHeaderBar.removeClass('sticky theme-shadow');
      }
      if(scroll >= 25) {
          topHeaderBar.addClass('sticky theme-shadow');
      }
    
      
      console.log( scroll );
  });
  
  
  var allImagesOverflow = document.querySelectorAll('.img-parallax-overflow');
  new simpleParallax(allImagesOverflow, {
    delay: .6,
    transition: 'cubic-bezier(0,0,0,0.5)',
    overflow: true,
    
  });
  
  var allImagesOverflowBackground = document.querySelectorAll('.img-parallax-overflow-background');
  new simpleParallax(allImagesOverflowBackground, {
    delay: .9,
    transition: 'cubic-bezier(0,0,0,1)',
    overflow: true,
    scale: 0.7,
    
  });
  
  var systemImagesOverflowBackground = document.querySelectorAll('.system-img-parallax-overflow-background');
  new simpleParallax(systemImagesOverflowBackground, {
    delay: .9,
    transition: 'cubic-bezier(0,0,0,1)',
    overflow: true,
    scale: 1.3,
    
    
  });
  
  var allImagesOverflowQuote = document.querySelectorAll('.img-parallax-overflow-quote');
  new simpleParallax(allImagesOverflowQuote, {
    delay: .9,
    transition: 'cubic-bezier(0,0,0,1)',
    overflow: false,
    scale: 1,
    
  });
  
  var allImagesOverflowUpLeft = document.querySelectorAll('.img-parallax-overflow-up-left');
  new simpleParallax(allImagesOverflowUpLeft, {
    delay: .9,
    transition: 'cubic-bezier(0,0,0,1)',
    overflow: true,
    scale: 0.8,
    orientation: 'up',
    
  });
  
  var allImagesInfoImages = document.querySelectorAll('.img-parallax-overflow-info');
  new simpleParallax(allImagesInfoImages, {
    delay: .9,
    transition: 'cubic-bezier(0,0,0,1)',
    overflow: true,
    scale: 0.8,
    orientation: 'up',
  });
  
  
  var allImagesHoriz = document.querySelectorAll('.img-parallax-horiz');
  new simpleParallax(allImagesHoriz, {
    delay: .6,
    transition: 'cubic-bezier(0,0,0,1)',
    orientation: 'up right',
    
    
  });
  
  var allImages = document.querySelectorAll('.img-parallax');
  new simpleParallax(allImages, {
    delay: .6,
    transition: 'cubic-bezier(0,0,0,1)',
    scale: 1,
    overflow: true,
    
  });
  
  var allVideos = document.querySelectorAll('.vid-parallax');
  new simpleParallax(allVideos, {
    delay: .6,
    transition: 'cubic-bezier(0,0,0,1)',
    
  });

  // Wrap every letter in a span
//   var textWrapper = document.querySelector('.ml11 .letters');
//   textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

//   anime.timeline({loop: false})
//     .add({
//       targets: '.ml11 .line',
//       scaleY: [0,1],
//       opacity: [0.5,1],
//       easing: "easeOutExpo",
//       duration: 700
//     })
//     .add({
//       targets: '.ml11 .line',
//       translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 50],
//       easing: "easeOutExpo",
//       duration: 700,
//       delay: 100
//     }).add({
//       targets: '.ml11 .letter',
//       opacity: [0,1],
//       easing: "easeOutExpo",
//       duration: 600,
//       offset: '-=775',
//       delay: (el, i) => 32 * (i+1)
//     }).add({
//       targets: '.line',
//       opacity: 0,
//       duration: 1000,
//       easing: "easeOutExpo",
//       delay: 500
//     });


  // build scenes
  var revealElements = document.getElementsByClassName("theme-scroll-reveal");
  for (var i=0; i<revealElements.length; i++) { // create a scene for each element
      new ScrollMagic.Scene({
        triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
        offset: 50,												 // start a little later
        triggerHook: 0.9,
      })
        .setClassToggle(revealElements[i], "visible") // add class toggle
//         .addIndicators({name: "Reveal " + (i+1) }) // add indicators (requires plugin)
        .addTo(controller);
  }
  
  $('.testimonial-container').slick({
    dots: true,
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [ 
      { breakpoint: 768, settings: { arrows: false, dots: false, slidesToShow: 1, centerMode: false, variableWidth: false, centerPadding: '0px' } },
      { breakpoint: 481, settings: { arrows: false, dots: false, slidesToShow: 1, centerMode: false, variableWidth: false, centerPadding: '0px' } } 
    ]
  });
  
  if($('.row-fluid .icon-slider').length > 0){
        $('.row-fluid .icon-slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            focusOnSelect:true,
            arrows: false,
            dots: true, 
            autoplay: true,
            autoplaySpeed: 10000,
            centerMode: true,
            variableWidth: true,
            centerPadding: '50px',
//             autoplay: true,
//             autoplaySpeed: 2000,
            responsive: [ 
                { breakpoint: 768, settings: { arrows: false, slidesToShow: 1, centerMode: false, variableWidth: false, centerPadding: '0px' } },
                { breakpoint: 481, settings: { arrows: false, slidesToShow: 1, centerMode: false, variableWidth: false, centerPadding: '0px' } } 
            ]
        });
    }
  
  // Slick Slider
    if( $('.logo-slider').length > 0 ){
        $('.logo-slider').slick({
            dots: false,
            arrows:false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 10000,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [
                {
                    breakpoint: 1230,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 481,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    }
  
    // Click Listeners
    
    
    $("#nav-toggle").click(function() {
        $('.header').toggleClass('mobile-nav-open');
        console.log('nav toggle clicked');
    }); 
    
  
  // Counter
//     if($('.count_down span').length > 0) {
//         $('.count_down span').counterUp({
//             delay: 10,
//             time: 2000
//         });
//     }
  
    function animateValue(id, start, end, duration) {
        // assumes integer values for start and end

        var obj = document.getElementById(id);
        var range = end - start;
        // no timer shorter than 50ms (not really visible any way)
        var minTimer = 50;
        // calc step time to show all interediate values
        var stepTime = Math.abs(Math.floor(duration / range));

        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer);

        // get current time and calculate desired end time
        var startTime = new Date().getTime();
        var endTime = startTime + duration;
        var timer;

        function run() {
            var now = new Date().getTime();
            var remaining = Math.max((endTime - now) / duration, 0);
            var value = Math.round(end - (remaining * range));
            obj.innerHTML = value;
            if (value == end) {
                clearInterval(timer);
            }
        }

        timer = setInterval(run, stepTime);
        run();
    }

//     animateValue("value", 100, 25, 5000);
  
  
});


