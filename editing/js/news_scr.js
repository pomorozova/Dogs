let change_id_news_now = 0;

function AddNewNews(){
    $('#form_news_add').on("submit", function(e){
        let act_form_change = {
            part: 'admin',
            adm:"adm_news_add",
            data: {
                main_data:$(this).serializeArray(),
                img: $('#input__file_add').val()
            }
        }
        console.log(act_form_change);
        
        e.preventDefault();
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                gen_news_table();
            }
        })
    });
}

function ChangeNews(){
    $('#form_news_change').on("submit", function(e){
        let act_form_change = {
            part: 'admin',
            adm:"adm_news_change",
            id: change_id_news_now,
            data: $(this).serializeArray()
        }

        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                gen_news_table();
            }
        })
    });
}

function gen_news_table(){
    let table = $('#news_table_body');
    $(table).empty();

    let idenf_data = {
        part: "main",
        act: 'news'
    }
    
    $.ajax({
        method: "POST",
        url: "../db/datawork.php",
        data: JSON.stringify(idenf_data),
        success: function(data)
        {        
            let i = 1;   
            data.forEach(el => {
                let note = $(`
                    <tr>
                        <td>${i}</td>
                        <td id="data_news_title_${el.id}">${el.title}</td>
                        <td id="data_news_desc_${el.id}">${el.desc_news}</td>
                        <td>${el.img}</td>
                    </tr>
                `);

                let trChange = $(`<td></td>`);
                let contButChange = $(`<div class="table-btn"></div>`);

                let butChange = $(`<button id="news_${el.id}" class="header__button but_change_note">????????????????</button>`);
                $(butChange).on("click", function(e){
                    change_id_news_now = $(e.target).attr('id').split('_')[1];
                    e.preventDefault();
                    $('#modal-2').addClass('modal_active');
                    $('body').addClass('hidden');
                    $('#frm_chg_title').val($(`#data_news_title_${change_id_news_now}`).text());
                    $('#frm_chg_desc').val($(`#data_news_desc_${change_id_news_now}`).text());
                });

                $(contButChange).append(butChange);
                $(trChange).append(contButChange);
                let butContTrDel = $(`<td></td>`);
                let butContDel = $(`<div class="table-btn"></div>`);
                let butDel = $(`<button id="delNews_${el.id}" class="header__button">??????????????</button>`);

                $(butDel).on("click", function(e){
                    e.preventDefault();
                    $('#modal-4').addClass('modal_active');
                    $('body').addClass('hidden');
                    change_id_news_now = $(e.target).attr('id').split('_')[1];
                });

                $(butContDel).append(butDel);
                $(butContTrDel).append(butContDel);

                $(note).append(trChange);
                $(note).append(butContTrDel);
                $(table).append(note);
                i += 1;
            });            
        }            
    })
}

function delete_note(){
    $('#btn-delete-yes').on('click',function(){
        let act_form_del = {
            part: 'admin',
            adm:"adm_news_del",
            id: change_id_news_now
        }

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_del),
            success: function(data){
                gen_news_table();
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
    gen_news_table();
    ChangeNews();
    AddNewNews();
    delete_note();
})