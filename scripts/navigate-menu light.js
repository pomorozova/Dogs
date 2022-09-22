$(document).scroll(function(e) {
    $(window).scrollTop() > 20? 
    $('.navigate_menu').addClass('nav_color1') : 
    $('navigate_menu').removeClass('nav_color1');

});

$(document).scroll(function(e) {
    $(window).scrollTop() > 20 ? 
    $('.header_logo').addClass('header_logo2') : 
    $('header_logo').removeClass('header_logo2');

});