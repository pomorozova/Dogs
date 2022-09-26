
$(document).ready(function(){
    let table = $('#news_table_body');

    let idenf_data = {
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
                        <td>${el.date} ${el.title}</td>
                        <td>${el.desc_news}</td>
                        <td>${el.img}</td>
                         
                        
                    </tr>
                `)

                let trChange = $(`<td></td>`);
                let contButChange = $(`<div class="table-btn"></div>`);

                let butChange = $(`<button class="header__button but_change_note">Изменить</button>`);
                $(butChange).on("click", function(e){
                    e.preventDefault();
                    $('#modal-2').addClass('modal_active');
                    $('body').addClass('hidden');
                })
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
})