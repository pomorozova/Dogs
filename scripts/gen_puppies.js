function generate_puppies(){
    let cont_puppies = $("#puppies_container");
    let dataForm = new FormData();
    dataForm.append("part","main");
    dataForm.append("act","puppies");

    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: dataForm,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function(data)
        {            
            data.forEach(el => {
                let cont_imgs_puppies = $(`<div class="block-puppies-img"></div>`);
                let cont_imgs = $(`<div class="block-puppies-left"></div>`);
                
                let dataFormImg = new FormData();
                dataFormImg.append("part","main");
                dataFormImg.append("act","puppies_imgs");
                dataFormImg.append("id",el.id);

                $.ajax({
                    method: "POST",
                    url: "db/datawork.php",
                    data: dataFormImg,
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                    success: function(data)
                    {
                        data.forEach(el => {
                            cont_imgs.append(`<img class="puppies_icon" src="image/${el.img}" width="400px">`)
                        })
                    }
                });

                $(cont_imgs_puppies).append(cont_imgs);

                $(cont_puppies).append(`
                    <div class="block-puppies">
                        <div class="block-puppies-left">
                            <h3>Мать</h3>
                            <p class="content-puppies">${el.desc_mom}</p>
                        </div>
                        <div class="block-puppies-right">
                            <h3>Отец</h3>
                            <p class="content-puppies">${el.desc_father}</p>
                        </div>                        
                    </div>                    
                    <div class="description-puppies">
                        <h3>Описание щенков</h3>
                        <p>${el.desc_puppie}</p>
                    </div>
                `);

                $(cont_puppies).append(cont_imgs_puppies);
            });
            
        }            
    })
    
}

function book_puppies(){
    $('#form_puppies').on("submit", function(){
        let formData = new FormData(this);
        
        formData.append('part','main');
        formData.append('act','block_puppies');

        $.ajax({
            url:'db/datawork',
            method:'',
            data: formData,
            processData: false,
            contentType: false,
            dataType:'text',
            success: function(d){

            }
        })

    })
}

$(document).ready(function(){
    generate_puppies();
    book_puppies();
})