function generate_gallery(){
    let cont_dogs = $("main");
    let dataForm = new FormData();

    dataForm.append("part","main");
    dataForm.append("act","gallery");
    
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
                let cont_imgs = $(`<div class= "image-gallery"></div>`);
                let cont_dog = $(`
                    <div class="container-dog1">
                        <h3>${el.name_dog}</h3>
                        <p><span></span>${el.desc_dog}</p>                    
                    </div>
                `);    
                let dataFormImg = new FormData();

                dataFormImg.append("part","main");
                dataFormImg.append("act","gallery_imgs");
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
                            $(cont_imgs).append(`<img class="news_icon" src="image/${el.img}" width="350px">`);
                        });
                        
                    }            
                });
                $(cont_dog).append(cont_imgs);
                $(cont_dogs).append(cont_dog);
            });
            
        }            
    })
}

$(document).ready(function(){
    generate_gallery();
})