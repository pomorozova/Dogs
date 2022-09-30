let id_sel_pup = 0;


function gen_puppies(){
    breed_num = localStorage.getItem('breed_gallery');

    let data_db = {
        part: "admin",
        adm: 'adm_puppies_getAll'
    }
    let table = $('#table_puppies_body');
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
                        <td id="tbPupMom_${el.id}">${el.desc_mom}</td>
                        <td id="tbPupFat_${el.id}">${el.desc_father}</td>
                        <td id="tbPupPup_${el.id}">${el.desc_puppie}</td>
                        <td>../image/Картинка1</td>
                        <td>../image/Картинка1</td>
                    </tr> 
                `);

                let par_cont_butChange = $(`<td></td>`);
                let cont_butChange = $(`<div class="table-btn"></div>`);
                let butChange = $(`<button id="butChgPup_${el.id}" class="header__button">Изменить</button>`);
                
                $(butChange).on('click', function (e) {
                    $('#modal-2').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_sel_pup = $(e.target).attr('id').split('_')[1];
                    $('#pup_desc_mom').val($(`#tbPupMom_${id_sel_pup}`).text());
                    $('#pup_desc_fat').val($(`#tbPupFat_${id_sel_pup}`).text());
                    $('#pup_desc_pup').val($(`#tbPupPup_${id_sel_pup}`).text());
                });

                $(cont_butChange).append(butChange);
                $(par_cont_butChange).append(cont_butChange);
                $(element_table).append(par_cont_butChange);


                let par_cont_butDel = $(`<td></td>`);
                let cont_butDel = $(`<div class="table-btn"></div>`);
                let butDel = $(`<button id="butDelPup_${el.id}" class="header__button">Удалить</button>`);

                $(butDel).on('click', function (e) {
                    $('#modal-4').addClass('modal_active');
                    $('body').addClass('hidden');
                    id_sel_pup = $(e.target).attr('id').split('_')[1];
                });

                $(cont_butDel).append(butDel);
                $(par_cont_butDel).append(cont_butDel);
                $(element_table).append(par_cont_butDel);

                table.append(element_table);
            });
        }            
    });
}

function form_change_puppies(){
    $('#form_pupInfo_change').on('submit',function(e){
        let act_form_change = {
            part: 'admin',
            adm:"adm_puppies_change",
            id: id_sel_pup,
            data: $(this).serializeArray()
        }
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                gen_puppies();
                $('#modal-2').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    })
}


//?
function form_add_pup(){
    $('#form_pup_add').on("submit", function(e){
        let act_form_add = {
            part: 'admin',
            adm:"adm_puppies_add",
            data: $('#form_pup_add').serializeArray()
        }
        console.log(act_form_add)
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_add),
            success: function(data){
                gen_puppies();
                $('#modal_1').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        });

    });
}

function delete_pup(){
    $('#btn_del_pup_yes').on('click',function(){
        let act_form_del = {
            part: 'admin',
            adm:"adm_puppies_del",
            id: id_sel_pup
        }

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_del),
            success: function(data){
                gen_puppies();
                $('#modal-4').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        });

    });

    $('#btn_del_pup_no').on('click',function(){
        $('#modal-4').removeClass('modal_active');
        $('body').removeClass('hidden');
    });
}

$(document).ready(function(){  
    gen_puppies();
    form_add_pup();
    delete_pup();
    form_change_puppies();
});