let change_id_news_now = 0;

function ChangeNewsCloseModal(){
    // Кнопка "закрыть" внутри модального окна
    let closeButton = $('#modal-2 .modal__close_button')[0];

    $(closeButton).on("click",function (e) {
        $('#modal-2').removeClass('modal_active');
        $('body').removeClass('hidden');
        gen_news_table();
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
        console.log(act_form_change.data);

        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: JSON.stringify(act_form_change),
            success: function(data){
                console.log(data);
                console.log("success change");
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
                        <td id="data_news_title_${i}">${el.title}</td>
                        <td id="data_news_desc_${i}">${el.desc_news}</td>
                        <td>${el.img}</td>
                    </tr>
                `);

                let trChange = $(`<td></td>`);
                let contButChange = $(`<div class="table-btn"></div>`);

                let butChange = $(`<button id="news_${i}" class="header__button but_change_note">Изменить</button>`);
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
                let butDel = $(`<td><div class="table-btn"><button type="submit">Удалить</button></div></td>`);
                
                $(note).append(trChange);
                $(note).append(butDel);
                $(table).append(note);
                i += 1;
            });            
        }            
    })
}

$(document).ready(function(){
    gen_news_table();
    ChangeNews();
    ChangeNewsCloseModal();
})