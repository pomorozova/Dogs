let id_change_breed = 0;
let breed_num = 0;

function gen_infoDogs(){
    breed_num = localStorage.getItem('breed_gallery');

    let data_db = {
        part: "admin",
        adm: 'adm_gallery',
        id_breed: breed_num
    }
    let table = $('#gallery_table_dogDesc_body');
    $(table).empty();
    

    $.ajax({
        method: "POST",
        url: "../db/datawork.php",
        data: JSON.stringify(data_db),
        success: function(data){
            let i = 1;
            let sel_all_dogs = $('#sel_dogs');
            let sel_dog_add = $('#sel_add_dogs');
            $(sel_all_dogs).empty();
            $(sel_dog_add).empty();
            console.log(data);

            data.forEach(el => {                
                let element_table = $(`
                    <tr>
                        <td>${i++}</td>
                        <td id="tbGRtitle_${el.id}">${el.name_dog}</td>
                        <td id="tbGRdesc_${el.id}">${el.desc_dog}</td>
                    </tr>
                `);

                $(sel_dog_add).append(`<option value="dogName_${el.id}">${el.name_dog}</option>`)
                $(sel_all_dogs).append(`<option value="dogName_${el.id}">${el.name_dog}</option>`);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button id="callback-button2_${el.id}" class="header__button">Изменить</button>`);
                
                $(butChange).on('click', function (e) {
                    $('#modal-2').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_breed = $(e.target).attr('id').split('_')[1];
                    $('#gallery_breed_change_desc').val($(`#tbGRdesc_${id_change_breed}`).text());
                });

                $(cont_butChange).append(butChange);
                $(par_cont_butChange).append(cont_butChange);
                $(element_table).append(par_cont_butChange);


                let par_cont_butDel = $(`<td></td>`);
                let cont_butDel = $(`<div class="table-btn"></div>`);
                let butDel = $(`<button id="butDelBreedDog_${el.id}" class="header__button">Удалить</button>`);

                $(butDel).on('click', function (e) {
                    $('#modal-4').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_breed = $(e.target).attr('id').split('_')[1];
                });

                $(cont_butDel).append(butDel);
                $(par_cont_butDel).append(cont_butDel);
                $(element_table).append(par_cont_butDel);

                table.append(element_table);
            });
        }            
    });
    gen_imgs_dogs(breed_num);
}

function gen_imgs_dogs(id_breed){
    let data_db = {
        part: "admin",
        adm: 'adm_gallery_imgs',
        id: id_breed
    }

    let table = $('#gallery_table_imgs_dogs');
    $(table).empty();

    $.ajax({
        method: "POST",
        url: "../db/datawork.php",
        data: JSON.stringify(data_db),
        success: function(data){
            let i = 1;

            data.forEach(el => {                
                let element_table = $(`
                    <tr>
                        <td>${i++}</td>
                        <td>${el.name_dog}</td>
                        <td>${el.img}</td>
                    </tr> 
                `);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button id="callback-button3_${el.id}" class="header__button">Изменить</button>`);
                
                $(butChange).on('click', function (e) {
                    $('#modal-3').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_breed = $(e.target).attr('id').split('_')[1];
                });

                $(cont_butChange).append(butChange);
                $(par_cont_butChange).append(cont_butChange);
                $(element_table).append(par_cont_butChange);


                let par_cont_butDel = $(`<td></td>`);
                let cont_butDel = $(`<div class="table-btn"></div>`);
                let butDel = $(`<button id="butDelImgDog_${el.id}" class="header__button">Удалить</button>`);

                $(butDel).on('click', function (e) {
                    $('#modal_5').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_breed = $(e.target).attr('id').split('_')[1];
                });

                $(cont_butDel).append(butDel);
                $(par_cont_butDel).append(cont_butDel);
                $(element_table).append(par_cont_butDel);

                table.append(element_table);
            });
        }            
    });
}


function form_add_img(){
    $('#form_gallery_add_img').on("submit", function(e){

        let act_form_add = {
            part: 'admin',
            adm:"adm_gallery_add_img",
            id: $('#sel_add_dogs').val().split('_')[1],
            img: $('#input__file_img_add').val()
        }
        console.log(act_form_add);

        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_add),
            success: function(data){
                gen_imgs_dogs(localStorage.getItem('breed_gallery'));
                $('#modal_1').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        });

    });
}

function form_change_infoDog(){
    $('#form_gallery_change_breed').on('submit',function(e){
        let act_form_change = {
            part: 'admin',
            adm:"adm_gallery_change",
            id: id_change_breed,
            data: $(this).serializeArray()
        }
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                gen_infoDogs();
                $('#modal-2').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    })
}

function form_change_imgDog(){
    $('#form_imgDog_change').on('submit',function(e){
        let act_form_change = {
            part: 'admin',
            adm:"adm_gallery_img_change",
            id: id_change_breed,
            img: $('#input__file_chg_imgDog').val()
        }

        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                gen_imgs_dogs(breed_num);
                $('#modal-3').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    })
}

function delete_note_breed(){
    $('#btn-delete-yes').on('click',function(){
        let act_form_del = {
            part: 'admin',
            adm:"adm_gallery_del",
            id: id_change_breed
        }

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_del),
            success: function(data){
                gen_infoDogs();
                $('#modal-4').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        });

    });

    $('#btn-delete-no').on('click',function(){
        $('#modal-4').removeClass('modal_active');
        $('body').removeClass('hidden');
    });
}

function delete_img_dog(){
    $('#btn-img-delete-yes').on('click',function(){
        let act_form_del = {
            part: 'admin',
            adm:"adm_gallery_del_img",
            id: id_change_breed
        }

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_del),
            success: function(data){
                gen_infoDogs();
                $('#modal_5').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        });

    });

    $('#btn-img-delete-no').on('click',function(){
        $('#modal_5').removeClass('modal_active');
        $('body').removeClass('hidden');
    });
}

$(document).ready(function(){  
    gen_infoDogs();
    form_change_infoDog();
    form_add_img();
    form_change_imgDog();
    delete_note_breed();
    delete_img_dog();
});