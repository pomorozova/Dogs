let id_change_exhibition = 0;

function gen_exhibitions(){
    let table = $('#exhibition_table_body');
    $(table).empty();
    let formData = new FormData();

    formData.append("part", "main");
    formData.append("act", "exhibition");

    $.ajax({
        method: "POST",
        url: "../db/datawork.php",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
		dataType : 'json',
        success: function(data){
            let i = 1;
            data.forEach(el => {                
                let element_table = $(`
                    <tr>
                        <td>${i++}</td>
                        <td id="tbExTitle_${el.id}">${el.title}</td>
                        <td id="tbExText1_${el.id}">${el.desc_text_1}</td>
                        <td id="tbExText2_${el.id}">${el.desc_text_2}</td>
                        <td id="exhibImg_${el.id}">${el.img}</td>                      
                    </tr>
                `);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button type="submit" id="callback-button_${el.id}" class="header__button">Изменить</button>`);

                $(butChange).on('click',function (e) {
                    $('#modal-2').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_exhibition = $(e.target).attr('id').split('_')[1];
                    $('#exhibition_chg_title').val($(`#tbExTitle_${id_change_exhibition}`).text());
                    $('#exhibition_chg_desc1').val($(`#tbExText1_${id_change_exhibition}`).text());
                    $('#exhibition_chg_desc2').val($(`#tbExText2_${id_change_exhibition}`).text());
                    $('#input__file_imgEx').val($(`#exhibImg_${id_change_exhibition}`).text());
                });

                $(cont_butChange).append(butChange);
                $(par_cont_butChange).append(cont_butChange);
                $(element_table).append(par_cont_butChange);


                let par_cont_butDel = $(`<td></td>`);
                let cont_butDel = $(`<div class="table-btn"></div>`);
                let butDel = $(`<button  id="butDelExhibition_${el.id}" class="header__button">Удалить</button>`);

                $(butDel).on('click', function (e) {
                    $('#modal-4').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_exhibition = $(e.target).attr('id').split('_')[1];
                });

                $(cont_butDel).append(butDel);
                $(par_cont_butDel).append(cont_butDel);
                $(element_table).append(par_cont_butDel);

                table.append(element_table);
            });
            
        }      
    })
}

function form_add(){
    $('#form_exhib_add').on("submit", function(e){
        e.preventDefault();
        let formData = new FormData(this);

        formData.append("part", "admin");
        formData.append("act", "adm_exhib_add");
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
			dataType : 'json',
            success: function(data){
                gen_exhibitions();
                $('#modal_1').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    });
}

function form_change(){
    $('#form_exhib_change').on('submit',function(e){
        e.preventDefault();
        let formData = new FormData(this);

        formData.append("part", "admin");
        formData.append("act", "adm_exhib_change");
        formData.append("id", id_change_exhibition);

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
			dataType : 'json',
            success: function(data){
                gen_exhibitions();
            }
        })
    })
}

function delete_note(){
    $('#btn-delete-yes').on('click',function(){
        let formData = new FormData();

        formData.append("part", "admin");
        formData.append("act", "adm_exhib_del");
        formData.append("id", id_change_exhibition);

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
			dataType : 'json',
            success: function(data){
                gen_exhibitions();
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

function imageExhib_added(){
    $('#input__file_img1').on('change',function(){
        alert('изображение добавлено');
    })
}

function imageExhib_change(){  
    $('#input__file_imgEx').on('change',function(){
        alert('изображение изменено');
    });
}

$(document).ready(function(){  
    gen_exhibitions();
    form_change();
    form_add();
    delete_note();
    imageExhib_added();
    imageExhib_change();
});