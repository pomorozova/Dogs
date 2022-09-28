let id_change_note = 0;

function gen_useful(){
    let data_db = {
        part: "main",
        act: 'useful'
    }
    let table = $('#table_useful_body');
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
                        <td id="tbUFtitle_${el.id}">${el.title}</td>
                        <td id="tbUFdesc1_${el.id}">${el.text_1}</td>
                        <td id="tbUFdesc2_${el.id}">${el.text_2}</td>
                        <td>${el.img}</td>
                    </tr> 
                `);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button id="callback-button_${el.id}" class="header__button">Изменить</button>`);

                $(butChange).on('click',function (e) {
                    
                    $('#modal-2').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_change_note = $(e.target).attr('id').split('_')[1];
                    $('#inp_chg_title').val($(`#tbUFtitle_${id_change_note}`).text());
                    $('#inp_chg_text1').val($(`#tbUFdesc1_${id_change_note}`).text());
                    $('#inp_chg_text2').val($(`#tbUFdesc2_${id_change_note}`).text());
                });

                $(cont_butChange).append(butChange);
                $(par_cont_butChange).append(cont_butChange);
                $(element_table).append(par_cont_butChange);

                let par_cont_butDel = $(`<td></td>`);
                let cont_butDel = $(`<div class="table-btn"></div>`);
                let butDel = $(`<button  id="butDelUseful_${el.id}" class="header__button">Удалить</button>`);

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


function form_add(){
    $('#form_useful_add').on("submit", function(e){
        let act_form_add = {
            part: 'admin',
            adm:"adm_useful_add",
            data: {
                main_data:$(this).serializeArray(),
                img: $('#input__file_img').val()
            }
        }
        
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_add),
            success: function(data){
                gen_useful();
                $('#modal_1').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    });
}


function form_change(){
    $('#form_useful_change').on('submit',function(e){
        let act_form_change = {
            part: 'admin',
            adm:"adm_useful_change",
            id: id_change_note,
            img: $('#input__file_img').val(),
            data: $(this).serializeArray()
        }
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                gen_useful();
                $('#modal-2').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    })
}


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
    gen_useful();
    form_add();
    delete_note();
});