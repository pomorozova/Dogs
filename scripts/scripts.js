$(document).ready(function(){  
 
  // Кнопка по которой происходит клик
  let butShowAddModal = $('#callback_button');
  
  // Модальное окно, которое необходимо открыть
  let modal1 = $('#modal_1');
 
  // Кнопка "закрыть" внутри модального окна
  let closeButton = $('#modal_1 .modal__close_button')[0];
 
  // Тег body для запрета прокрутки
  let tagBody = $('body');
  
  
  $(butShowAddModal).on('click',function (e) {
    e.preventDefault();
    $(modal1).addClass('modal_active');
    $(tagBody).addClass('hidden');
  })
  
  $(closeButton).on("click",function (e) {
    e.preventDefault();
    $(modal1).removeClass('modal_active');
    $(tagBody).removeClass('hidden');
  })
  
 
  modal1.onmousedown = function (e) {
    let target = e.target;
    let modalContent = modal1.getElementsByClassName('modal__content')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      $(this).removeClass('modal_active');
      $(tagBody).removeClass('hidden');
    }
  };
 
});


$(document).ready(function(){  

  // Кнопка по которой происходит клик
  let callBackButton = $('#callback-button2');
 
  // Модальное окно, которое необходимо открыть
  let modal1 = $('#modal-2');
 
  // Кнопка "закрыть" внутри модального окна
  let closeButton = $('#modal-2 .modal__close_button')[0];
 
  // Тег body для запрета прокрутки
  let tagBody = document.getElementsByTagName('body');
  
  $(callBackButton).on('click',function (e) {
    e.preventDefault();
    $(modal1).addClass('modal_active');
    $(tagBody).addClass('hidden');
  })

  $(closeButton).on("click",function (e) {
    e.preventDefault();
    $(modal1).removeClass('modal_active');
    $(tagBody).removeClass('hidden');
  })
 
  modal1.onmousedown = function (e) {
    let target = e.target;
    let modalContent = modal1.getElementsByClassName('modal__content')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      $(this).removeClass('modal_active');
      $(tagBody).removeClass('hidden');
    }
  };
 
});

$(document).ready(function(){  

  // Кнопка по которой происходит клик
  let callBackButton = document.getElementById('callback-button3');
 
  // Модальное окно, которое необходимо открыть
  let modal1 = $('#modal-3');
 
  // Кнопка "закрыть" внутри модального окна
  let closeButton = $('#modal-3 .modal__close_button')[0];
 
 
  $(callBackButton).on('click',function (e) {
    e.preventDefault();
    $(modal1).addClass('modal_active');
    $('body').addClass('hidden');
  })
 
  $(closeButton).on("click",function (e) {
    e.preventDefault();
    $(modal1).removeClass('modal_active');
    $('body').removeClass('hidden');
  })
 
  modal1.onmousedown = function (e) {
    let target = e.target;
    let modalContent = modal1.getElementsByClassName('modal__content')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      $(this).removeClass('modal_active');
      $('body').removeClass('hidden');
    }
  };
 
});

$(document).ready(function(){  

  // Кнопка по которой происходит клик
  let callBackButton = $('#callback-button-delete');
 
  // Модальное окно, которое необходимо открыть
  let modal1 = $('#modal-4');
 
  // Кнопка "закрыть" внутри модального окна
  let closeButton = $('#modal-4 .modal__close_button')[0];
 
  // Тег body для запрета прокрутки
  let tagBody = $('body');
  
  
  $(callBackButton).on('click',function (e) {
    e.preventDefault();
    $(modal1).addClass('modal_active');
    $(tagBody).addClass('hidden');
  })
  
  
  $(closeButton).on('click',function (e) {
    e.preventDefault();
    $(modal1).removeClass('modal_active');
    $(tagBody).removeClass('hidden');
  })
 
  modal1.onmousedown = function (e) {
    let target = e.target;
    let modalContent = modal1.getElementsByClassName('modal__content')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      $(this).removeClass('modal_active');
      $(tagBody).removeClass('hidden');
    }
  };
 
});

$(document).ready(function(){  

  // Кнопка по которой происходит клик
  let callBackButton = $('#callback-button-delete-2');
 
  // Модальное окно, которое необходимо открыть
  let modal1 = $('modal-5');
 
  // Кнопка "закрыть" внутри модального окна
  let closeButton = $('modal-5 .modal__close_button')[0];
 
  // Тег body для запрета прокрутки
  let tagBody = document.getElementsByTagName('body');
 
  $(callBackButton).on('click',function (e) {
    e.preventDefault();
    $(modal1).addClass('modal_active');
    $(tagBody).addClass('hidden');
  })
 
  $(closeButton).on('click',function (e) {
    e.preventDefault();
    $(modal1).removeClass('modal_active');
    $(tagBody).removeClass('hidden');
  })
 
  modal1.onmousedown = function (e) {
    let target = e.target;
    let modalContent = modal1.getElementsByClassName('modal__content')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      $(this).removeClass('modal_active');
      $(tagBody).removeClass('hidden');
    }
  };
 
});

$(document).ready(function(){ 

});


