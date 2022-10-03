let id_change_note = 0;

function gen_ourBreed_desc(){
    let table = $('#table_ourdog_desc_body');
    $(table).empty();
    let sel_breeds_dog_add = $('#dog_breeds_add');
    let sel_breeds_dog_change = $('#dog_breeds_change');
    $(sel_breeds_dog_add).empty();
    $(sel_breeds_dog_change).empty();
    let formData = new FormData();
    formData.append("part","admin");
    formData.append("act","adm_dogs_breed");

    $.ajax({
        method: "POST",
        url: "../db/datawork.php",
        data: formData,
        contentType: false,
        processData: false,
		dataType : 'json',
        success: function(data){
            let i = 1;
            
            data.forEach(el => {                
                let element_table = $(`
                    <tr>
                        <td>${i++}</td>
                        <td id="tbDescTitle_${el.id}">${el.title}</td>
                        <td id="tbDescText_${el.id}">${el.text_desc}</td>
                    </tr>
                `);

                $(sel_breeds_dog_add).append(`<option value="breedDog_${el.id_breed}">${el.breed}</option>`);
                $(sel_breeds_dog_change).append(`<option value="breedDog_${el.id_breed}">${el.breed}</option>`);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button id="btnChangeDesc_${el.id}" class="header__button">Изменить</button>`);
                
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
                let butDel = $(`<button id="btnDelDesc_${el.id}" class="header__button">Удалить</button>`);

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
    let table = $('#table_ourdog_breed_body');
    $(table).empty();
    let formData = new FormData();
    formData.append("part","admin");
    formData.append("act","adm_dogs");

    $.ajax({
        method: "POST",
        url: "../db/datawork.php",
        data: formData,
        contentType: false,
        processData: false,
		dataType : 'json',
        success: function(data){
            let i = 1;
            data.forEach(el => {                
                let element_table = $(`
                    <tr>
                        <td>${i++}</td>
                        <td id="tbDogsBreed_${el.id}">${el.breed}</td>
                        <td id="tbDogsName_${el.id}">${el.name_dog}</td>
                        <td id="imgOurDogs_${el.id}">картинка</td>
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
                    $(`#dog_breeds_change option[value='breedDog_${el.dog_breed}']`).prop('selected', true);
                });

                $(cont_butChange).append(butChange);
                $(par_cont_butChange).append(cont_butChange);
                $(element_table).append(par_cont_butChange);

                let par_cont_butDel = $(`<td></td>`);
                let cont_butDel = $(`<div class="table-btn"></div>`);
                let butDel = $(`<button id="btnDelBreed_${el.id}" class="header__button">Удалить</button>`);

                $(butDel).on('click', function (e) {
                    $('#modal_5').addClass('modal_active');
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


function form_add_new_dog(){
    $('#form_dog_add').on("submit", function(e){
        e.preventDefault();
        let formData = new FormData(this);
        formData.append("part","admin");
        formData.append("act","adm_dog_add");
        formData.append("breed",$('#dog_breeds_add').val().split('_')[1]);
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            contentType: false,
            processData: false,
		    dataType : 'json',
            success: function(data){
                gen_ourDogs();
                $('#modal_1').removeClass('modal_active');
                $('body').removeClass('hidden');
            },
            error: function(data){
                gen_ourDogs();
                $('#modal_1').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    });
}


function form_change_info_breed(){
    $('#form_breed_change').on('submit',function(e){
        e.preventDefault();
        let formData = new FormData(this);
        formData.append("part","admin");
        formData.append("act","adm_ourDogs_change_breed");
        formData.append("id", id_change_note);

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            contentType: false,
            processData: false,
		    dataType : 'json',
            success: function(data){
                gen_ourBreed_desc();
                $('#modal-3').removeClass('modal_active');
                $('body').removeClass('hidden');
            },
            error: function(data){
                gen_ourBreed_desc();
                $('#modal-3').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    })
}


function form_change_dog(){
    $('#form_dogs_change').on('submit',function(e){
        e.preventDefault();
        let formData = new FormData(this);
        formData.append("part","admin");
        formData.append("act","adm_ourDogs_change_dogs");
        formData.append("id",id_change_note);
        formData.append("breed",$('#dog_breeds_change').val().split('_')[1]);
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            contentType: false,
            processData: false,
		    dataType : 'json',
            success: function(data){
                gen_ourDogs();
                $('#modal-2').removeClass('modal_active');
                $('body').removeClass('hidden');
            },
            error: function(data){
                gen_ourDogs();
                $('#modal-2').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    })
}


function delete_dog(){
    $('#btn_del_dog_yes').on('click',function(){
        let formData = new FormData();
        formData.append("part","admin");
        formData.append("act","adm_dog_del");
        formData.append("id",id_change_note);

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            contentType: false,
            processData: false,
		    dataType : 'json',
            success: function(data){
                gen_ourDogs();
                $('#modal_5').removeClass('modal_active');
                $('body').removeClass('hidden');
            },
            error: function(data){
                gen_ourDogs();
                $('#modal_5').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        });

    });

    $('#btn_del_dog_no').on('click',function(){
        $('#modal_5').removeClass('modal_active');
        $('body').removeClass('hidden');
    });
}


function delete_info_breed(){
    $('#btn_del_breedInfo_yes').on('click',function(){
        let formData = new FormData();
        formData.append("part","admin");
        formData.append("act","adm_breedInfo_del");
        formData.append("id",id_change_note);

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            contentType: false,
            processData: false,
		    dataType : 'json',
            success: function(data){
                gen_ourBreed_desc();
                $('#modal-4').removeClass('modal_active');
                $('body').removeClass('hidden');
            },
            error: function(data){
                gen_ourBreed_desc();
                $('#modal-4').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        });

    });

    $('#btn_del_breedInfo_no').on('click',function(){
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
    delete_dog();
    delete_info_breed();
});