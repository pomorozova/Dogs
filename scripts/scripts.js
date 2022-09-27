function f1(){
    // Кнопка по которой происходит клик
    let callBackButton = $('#callback-button');
   
    // Модальное окно, которое необходимо открыть
    let modal1 = $('#modal-1');
   
    // Кнопка "закрыть" внутри модального окна
    let closeButton = $('#btn_close_modalAdd');
   
    // Тег body для запрета прокрутки
    let tagBody = $('body');

    $(callBackButton).on("click", function (e) {
      e.preventDefault();
      $(modal1).addClass('modal_active');
      $(tagBody).addClass('hidden');
    })
    
    $(closeButton).on("click", function (e) {
      e.preventDefault();
      $(modal1).removeClass('modal_active');
      $(tagBody).removeClass('hidden');
    })
   
    modal1.onmousedown = function (e) {
      let target = e.target;
      let modalContent = modal1.getElementsByClassName('modal__content')[0];
      if (e.target.closest('.' + modalContent.className) === null) {
        this.classList.remove('modal_active');
        tagBody.classList.remove('hidden');
      }
    };
       
  }

  function f2(){

    // Кнопка по которой происходит клик
    let callBackButton = $('.table-btn .but_change_note');
   
    // Модальное окно, которое необходимо открыть
    let modal_add = $('#modal-2');
   
    
   
    // Тег body для запрета прокрутки
    let tagBody = $('body');
    
    
    $(callBackButton).each(function(index, elem){
      $(elem).on("click", function(e){
        e.preventDefault();
        $(modal_add).addClass('modal_active');
        $(tagBody).addClass('hidden');
      })      
    });
        
    // Кнопка "закрыть" внутри модального окна
    let closeButton = $('#modal-2 .modal__close_button')[0];

    $(closeButton).on("click",function (e) {
        $(modal_add).removeClass('modal_active');
        $(tagBody).removeClass('hidden');
    });
   
    modal_add.onmousedown = function (e) {
      let target = e.target;
      let modalContent = modal_add.getElementsByClassName('modal__content')[0];
      if (e.target.closest('.' + modalContent.className) === null) {
        this.classList.remove('modal_active');
        tagBody.classList.remove('hidden');
      }
    };
  }

  function f3(){

    // Кнопка по которой происходит клик
    let callBackButton = document.getElementById('callback-button3');
   
    // Модальное окно, которое необходимо открыть
    let modal1 = $('modal-3');
   
    // Кнопка "закрыть" внутри модального окна
    let closeButton = $('.modal__close_button')[0];
   
    // Тег body для запрета прокрутки
    let tagBody = document.getElementsByTagName('body');
   
    $(callBackButton).on("click", function (e) {
      e.preventDefault();
      $(modal1).addClass('modal_active');
      $(tagBody).addClass('hidden');
    })
   
    closeButton.onclick = function (e) {
      e.preventDefault();
      $(modal1).removeClass('modal_active');
      $(tagBody).removeClass('hidden');
    }
  }
  

function f5() {
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
}



  function f1_del() {
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
  }
       

  function f2_del() {
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
  }

  function f3_del() {
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
  }

  $(document).ready(function() { 
    f1(); 
    f2();
    f3();
    f5();
    f1_del();
    f2_del();
    f3_del();
  });

