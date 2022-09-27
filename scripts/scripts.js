$(function f4() {
  $('#callback-button-delete').click(function () {
    $('.modal-delete').addClass('modal_active');
    $('body').addClass('hidden');
  });
 
  $('.modal__close-button').click(function () {
    $('.modal-delete').removeClass('modal_active');
    $('body').removeClass('hidden');
  });
 
  $('.modal-delete').mouseup(function (e) {
    let modalContent = $(".modal__content");
    if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
      $(this).removeClass('modal_active');
      $('body').removeClass('hidden');
    }
  });
});

$(function f5() {
  $('#callback-button-delete-2').click(function () {
    $('.modal-delete').addClass('modal_active');
    $('body').addClass('hidden');
  });
 
  $('.modal__close-button').click(function () {
    $('.modal-delete').removeClass('modal_active');
    $('body').removeClass('hidden');
  });
 
  $('.modal-delete').mouseup(function (e) {
    let modalContent = $(".modal__content");
    if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
      $(this).removeClass('modal_active');
      $('body').removeClass('hidden');
    }
  });
});



  $(function f1() {
    $('#callback-button').click(function () {
      $('.modal').addClass('modal_active');
      $('body').addClass('hidden');
    });
   
    $('.modal__close-button').click(function () {
      $('.modal').removeClass('modal_active');
      $('body').removeClass('hidden');
    });
   
    $('.modal').mouseup(function (e) {
      let modalContent = $(".modal__content");
      if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
        $(this).removeClass('modal_active');
        $('body').removeClass('hidden');
      }
    });
  });
       

  $(function f2() {
    $('#callback-button2').click(function () {
      $('.modal-2').addClass('modal_active');
      $('body').addClass('hidden');
    });
   
    $('.modal__close-button').click(function () {
      $('.modal-2').removeClass('modal_active');
      $('body').removeClass('hidden');
    });
   
    $('.modal-2').mouseup(function (e) {
      let modalContent = $(".modal__content");
      if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
        $(this).removeClass('modal_active');
        $('body').removeClass('hidden');
      }
    });
  });

  $(function f3() {
    $('#callback-button3').click(function () {
      $('.modal-3').addClass('modal_active');
      $('body').addClass('hidden');
    });
   
    $('.modal__close-button').click(function () {
      $('.modal-3').removeClass('modal_active');
      $('body').removeClass('hidden');
    });
   
    $('.modal-3').mouseup(function (e) {
      let modalContent = $(".modal__content");
      if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
        $(this).removeClass('modal_active');
        $('body').removeClass('hidden');
      }
    });
  });

  $(document).ready(function() { 
    f1(); 
    f2();
    f3();
    f4();
    f5();
  });

