function generate_gallery(){
    let cont_dogs = $("main");

    let idenf_data = {
        act: 'gallery'
    }
    
    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: JSON.stringify(idenf_data),
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
                

                let idenf_data_dog = {
                    act: 'gallery_imgs',
                    id: el.id
                }

                $.ajax({
                    method: "POST",
                    url: "db/datawork.php",
                    data: JSON.stringify(idenf_data_dog),
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