let id_change_breed = 0;

//!!!!!!!!!!!!!! дополнить id-породы
function gen_breeds(){
    let data_db = {
        part: "admin",
        adm: 'adm_gallery'
    }
    let table = $('#gallery_table_breeds_body');
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
                        <td id="tbGRtitle_${el.id}">${el.breed}</td>
                        <td id="tbGRdesc_${el.id}">${el.desc_dog}</td>
                    </tr>
                `);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button type="submit" id="callback-button2_${el.id}" class="header__button">Изменить</button>`);
                
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
    gen_imgs_dogs(1);
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
                        <td>${el.img}</td>
                    </tr> 
                `);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button id="callback-button3_${el.id}" class="header__button">Изменить</button>`);
                
                $(butChange).on('click', function (e) {
                    $('#modal-3').addClass('modal_active');
                    $('body').addClass('hidden');
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

//!!!!!!!!!!!!!!! дополнить id-породы
function form_add_img(){
    $('#form_gallery_add_img').on("submit", function(e){
        let act_form_add = {
            part: 'admin',
            adm:"adm_gallery_add_img",
            id: 1,
            img: $('#input__file_img_add').val()
        }
        
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_add),
            success: function(data){
                gen_imgs_dogs(1);
            }
        });

    });
}

function form_change_breed(){
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
                gen_breeds();
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
                gen_breeds();
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
                gen_breeds();
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
    gen_breeds();
    form_change_breed();
    form_add_img();
    delete_note_breed();
    delete_img_dog();
});