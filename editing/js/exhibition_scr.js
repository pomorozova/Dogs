let id_change_exhibition = 0;

function gen_exhibitions(){
    let data_db = {
        part: "main",
        act: 'exhibition'
    }
    let table = $('#exhibition_table_body');
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
                        <td id="tbExTitle_${el.id}">${el.title}</td>
                        <td id="tbExText1_${el.id}">${el.desc_text_1}</td>
                        <td id="tbExText2_${el.id}">${el.desc_text_2}</td>
                        <td>../image/Картинка1</td>
                        <td>../image/Картинка1</td>                         
                    </tr>
                `);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button type="submit" id="callback-button_${el.id}" class="header__button">Изменить</button>`);

                $(butChange).on('click',function (e) {
                    console.log('aff')
                    $('#modal-2').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_exhibition = $(e.target).attr('id').split('_')[1];
                    $('#exhibition_chg_title').val($(`#tbExTitle_${id_change_exhibition}`).text());
                    $('#exhibition_chg_desc1').val($(`#tbExText1_${id_change_exhibition}`).text());
                    $('#exhibition_chg_desc2').val($(`#tbExText2_${id_change_exhibition}`).text());
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
        let act_form_add = {
            part: 'admin',
            adm:"adm_exhib_add",
            data: {
                main_data:$(this).serializeArray(),
                img1: $('#input__file_img1').val(),
                img2: $('#input__file_img2').val()
            }
        }
        
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_add),
            success: function(data){
                gen_exhibitions();
            }
        })
    });
}

function form_change(){
    $('#form_exhib_change').on('submit',function(e){
        let act_form_change = {
            part: 'admin',
            adm:"adm_exhib_change",
            id: id_change_exhibition,
            data: $(this).serializeArray()
        }
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                gen_exhibitions();
            }
        })
    })
}

function delete_note(){
    $('#btn-delete-yes').on('click',function(){
        let act_form_del = {
            part: 'admin',
            adm:"adm_exhib_del",
            id: id_change_exhibition
        }

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_del),
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

$(document).ready(function(){  
    gen_exhibitions();
    form_change();
    form_add();
    delete_note();
});