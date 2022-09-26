$(document).scroll(function(e) {
    $(window).scrollTop() > 90? 
    $('.navigate_menu').addClass('nav_color') : 
    $('navigate_menu').removeClass('nav_color');

});

$(document).scroll(function(e) {
    $(window).scrollTop() > 90 ? 
    $('.header_logo').addClass('header_logo2') : 
    $('header_logo').removeClass('header_logo2');
});

