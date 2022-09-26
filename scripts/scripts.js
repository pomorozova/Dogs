

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
    let modal1 = $('#modal-2');
   
    // Кнопка "закрыть" внутри модального окна
    let closeButton = $('#modal-2 .modal__close_button')[0];
   
    // Тег body для запрета прокрутки
    let tagBody = $('body');
    
    console.log(callBackButton)
    $(callBackButton).each(function(index, elem){
      $(elem).on("click", function(e){
        e.preventDefault();
        $(modal1).addClass('modal_active');
        $(tagBody).addClass('hidden');
      })      
    });
    
    
    $(closeButton).on("click",function (e) {
      e.preventDefault();
      $(modal1).removeClass('modal_active');
      $(tagBody).removeClass('hidden');
    });
   
    modal1.onmousedown = function (e) {
      let target = e.target;
      let modalContent = modal1.getElementsByClassName('modal__content')[0];
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
    
    $(modal1).on("onmousedown",function (e) {
      let target = e.target;
      let modalContent = modal1.getElementsByClassName('modal__content')[0];
      if (e.target.closest('.' + modalContent.className) === null) {
        this.classList.remove('modal_active');
        tagBody.classList.remove('hidden');
      }
    });
  }

  $(document).ready(function() { 
    f1(); 
    f2();
    f3();
  });

