let change_id_news_now = 0;

function AddNewNews(){
    $('#form_news_add').on("submit", function(e){
        e.preventDefault();
        let formData = new FormData(this);
        
        formData.append("part","admin");
        formData.append("act","adm_news_add");

        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
			dataType : 'json',
            success: function(data){
                gen_news_table();
                $('#modal_1').removeClass('modal_active');
                $('body').removeClass('hidden');
            },
            error: function(e){
                gen_news_table();
                $('#modal_1').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    });
}

function ChangeNews(){
    $('#form_news_change').on("submit", function(e){
        let formData = new FormData(this);

        formData.append("part", "admin");
        formData.append("act", "adm_news_change");
        formData.append("id", change_id_news_now);

        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
			dataType : 'json',
            success: function(data){
                gen_news_table();
                $('#modal-2').removeClass('modal_active');
                $('body').removeClass('hidden');
            },
            error: function(){
                gen_news_table();
                $('#modal-2').removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        })
    });
}

function gen_news_table(){
    let table = $('#news_table_body');
    $(table).empty();

    let formData = new FormData();
    formData.append("part","main");
    formData.append("act","news");

    $.ajax({
        method: "POST",
        url: "../db/datawork.php",
        data: formData,
        contentType: false,
        processData: false,
		dataType : 'json',
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

                let butChange = $(`<button id="news_${el.id}" class="header__button but_change_note">Изменить</button>`);
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
                let butDel = $(`<button id="delNews_${el.id}" class="header__button">Удалить</button>`);

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
        let formData = new FormData();

        formData.append("part", "admin");
        formData.append("act", "adm_news_del");
        formData.append("id", change_id_news_now);
        
        $.ajax({
            method: "POST",
            url: "../db/datawork.php",
            data: formData,
            contentType: false,
            processData: false,
			dataType : 'json',
            success: function(data){
                gen_news_table();
                $('#modal-4').removeClass('modal_active');
                $('body').removeClass('hidden');
            },
            error: function(e){
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

function imageNews_added(){
    $('#input__file_add').on('change',function(){
        alert('изображение добавлено');
    })
}

function imageNews_change(){  
    $('#input__file_change').on('change',function(){
        alert('изображение изменено');
    });
}

$(document).ready(function(){
    gen_news_table();
    ChangeNews();
    AddNewNews();
    delete_note();
    imageNews_added();
    imageNews_change();
})