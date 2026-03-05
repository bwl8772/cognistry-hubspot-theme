
$(window).scroll(function() {
    
    $('.sidebar-section').each(function(){
        var $this = $(this);
        var sectiontop1 = $this.offset().top - 100 ;
        var sectiontop2 = $this.offset().top - 80;
        var scrolltop = $(window).scrollTop() - 100;
        if ( scrolltop > sectiontop1 ){
            $this.addClass('slide');
        } else {
            $this.removeClass('slide');
            $('.sidebar-sec .sidelist').slideUp();
            $('.sidebar-sec a.side-trigger.show').removeClass('show');
        }
        if ( scrolltop > sectiontop2 + $this.outerHeight() ){
            $this.removeClass('slide');
            $('.sidebar-sec .sidelist').slideUp();
            $('.sidebar-sec a.side-trigger.show').removeClass('show');
        }
    });
    
});  

/* Pillar Page SideBar */
    $('.sidebar-sec .sidelist ul li a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('a.side-trigger.show').removeClass('show');
        $(this).parents('.sidelist').slideUp();
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 150
            },
            100,
            'linear'
        )
    });

    var sections = $('.scroll_section'), 
        nav = $('.sidebar-sec .sidelist');
//         topcp = $('.sticky-header').outerHeight();

    $(window).on('scroll', function () {
        var cur_pos = $(this).scrollTop()-100;
        sections.each(function() {
            var top = $(this).offset().top,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                var target = nav.find('a[href="#'+$(this).attr('id')+'"]'),
                    ListText = target.text();
                nav.find('a').removeClass('active');
                sections.removeClass('active');

                $(this).addClass('active');
                target.addClass('active');
            }
        });
    });
    
    $('.side-trigger').on('click',function(){
        $(this).toggleClass('show');
        $(this).next().slideToggle();
    });