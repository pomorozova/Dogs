function setting_modal_add(){
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

function setting_modal_add2(){
  // Кнопка по которой происходит клик
  let callBackButton = $('#callback-button2');
 
  // Модальное окно, которое необходимо открыть
  let modal1 = $('#modal-2');
 
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

function setting_modal_change(){

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

function setting_modal_3(){

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
 
  $(closeButton).on("click", function (e) {
    e.preventDefault();
    $(modal1).removeClass('modal_active');
    $(tagBody).removeClass('hidden');
  })
  
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
  setting_modal_add(); 
  setting_modal_add2(); 
  setting_modal_change();
  setting_modal_3();
});

