if (window.matchMedia("(min-width: 768px)").matches) {
    $('.tabservices_box:first-child').addClass('current');
    $(".tabservices_box a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(".tabservices_img").not(tab).css("display", "none");
        $(tab).fadeIn();
    }); 
};

if (window.matchMedia("(max-width: 767px)").matches) {

    
   $('.tabservices_box:first-child').addClass('current');
    $(".tabservices_box a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
    }); 
    

};