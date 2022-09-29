let id_change_note = 0;

function gen_ourBreed_desc(){
    let data_db = {
        part: "admin",
        adm: 'adm_dogs_breed'
    }
    let table = $('#table_ourdog_desc_body');
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
                        <td id="tbDescTitle_${el.id_breed}">${el.title}</td>
                        <td id="tbDescText_${el.id_breed}">${el.text_desc}</td>
                    </tr>
                `);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button id="btnChangeDesc_${el.id_breed}" class="header__button">Изменить</button>`);

                $(butChange).on('click',function (e) {                    
                    $('#modal-3').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_note = $(e.target).attr('id').split('_')[1];
                    $('#inpDescBreed_title').val($(`#tbDescTitle_${id_change_note}`).text());
                    $('#inpDescBreed_desc').val($(`#tbDescText_${id_change_note}`).text());
                });

                $(cont_butChange).append(butChange);
                $(par_cont_butChange).append(cont_butChange);
                $(element_table).append(par_cont_butChange);

                let par_cont_butDel = $(`<td></td>`);
                let cont_butDel = $(`<div class="table-btn"></div>`);
                let butDel = $(`<button  id="btnDelDesc_${el.id}" class="header__button">Удалить</button>`);

                $(butDel).on('click', function (e) {
                    $('#modal-4').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_note = $(e.target).attr('id').split('_')[1];
                });

                $(cont_butDel).append(butDel);
                $(par_cont_butDel).append(cont_butDel);
                $(element_table).append(par_cont_butDel);

                table.append(element_table);
            });
        }            
    })
}


function gen_ourDogs(){
    let data_db = {
        part: "admin",
        adm: 'adm_dogs'
    }
    let table = $('#table_ourdog_breed_body');
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
                        <td id="tbDogsBreed_${el.id}">${el.breed}</td>
                        <td id="tbDogsName_${el.id}">${el.name_dog}</td>
                        <td>../image/Картинка1</td>
                    </tr>
                `);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button id="btnChangeBreed_${el.id}" class="header__button">Изменить</button>`);

                $(butChange).on('click',function (e) {                    
                    $('#modal-2').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_note = $(e.target).attr('id').split('_')[1];
                    $('#inpNameDog_chg').val($(`#tbDogsName_${id_change_note}`).text());
                    $('#inpBreedDog_chg').val($(`#tbDogsBreed_${id_change_note}`).text());
                });

                $(cont_butChange).append(butChange);
                $(par_cont_butChange).append(cont_butChange);
                $(element_table).append(par_cont_butChange);

                let par_cont_butDel = $(`<td></td>`);
                let cont_butDel = $(`<div class="table-btn"></div>`);
                let butDel = $(`<button id="btnDelBreed_${el.id}" class="header__button">Удалить</button>`);

                $(butDel).on('click', function (e) {
                    $('#modal-5').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_note = $(e.target).attr('id').split('_')[1];
                });

                $(cont_butDel).append(butDel);
                $(par_cont_butDel).append(cont_butDel);
                $(element_table).append(par_cont_butDel);

                table.append(element_table);
            });
        }            
    })
}

//
function form_add_new_dog(){
    $('#form_dog_add').on("submit", function(e){
        let act_form_add = {
            part: 'admin',
            adm:"adm_dog_add",
            data: {
                main_data:$(this).serializeArray(),
                img: $('#input__file_dog_img').val()
            }
        }
        
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_add),
            success: function(data){
                gen_ourDogs();
                $('#modal_1').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    });
}


function form_change_info_breed(){
    $('#form_breed_change').on('submit',function(e){
        let act_form_change = {
            part: 'admin',
            adm:"adm_ourDogs_change_breed",
            id: id_change_note,
            data: $(this).serializeArray()
        }
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                gen_ourBreed_desc();
                $('#modal-3').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    })
}

//?
function form_change_dog(){
    $('#form_dogs_change').on('submit',function(e){
        let act_form_change = {
            part: 'admin',
            adm:"adm_ourDogs_change_dogs",
            id: id_change_note,
            data: $(this).serializeArray(),
            img: 'dog3.jpg'
        }
        e.preventDefault();
        console.log(act_form_change.data);
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                gen_ourDogs();
                $('#modal-2').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    })
}

//
function delete_note(){
    $('#btn-delete-yes').on('click',function(){
        let act_form_del = {
            part: 'admin',
            adm:"adm_useful_del",
            id: id_change_note
        }

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_del),
            success: function(data){
                gen_useful();
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

$(document).ready(function(){  
    gen_ourBreed_desc();
    gen_ourDogs();
    form_change_info_breed();
    form_change_dog();
    form_add_new_dog();
});