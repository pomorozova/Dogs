function generate_ourDog(){
    let cont_breed = $("#container_dog_breed");
    let id_breed = $("#active_breed").data("actbreed");
    let dataForm = new FormData();
    dataForm.append("part","main");
    dataForm.append("act","our_dog");
    dataForm.append("id",id_breed);
    
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
                $(cont_breed).append(`
                    <div class="main-title-ourDogs">
                        <h1 class="title">${el.breed}</h1>
                    </div>                    
                `);

                let cont_dog = $(`
                    <div class="container-dog1">
                        <h3>${el.title}</h3>
                        <p><span></span>${el.text_desc}</p>                        
                    </div>
                `)
                

                let block_breed = $(`<div class="block-news"></div>`);
                let dataFormImg = new FormData();
                dataFormImg.append("part","main");
                dataFormImg.append("act","our_dog_imgs");
                dataFormImg.append("id",el.id_breed);

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
                            let block_dog = $(`
                            <div class="block-news-left">
                                <img class="news_icon" src="image/${el.img}" width="320px">
                                <p class="content-ourDogs">${el.name_dog}</p>
                            </div>
                            `)
                            $(block_breed).append(block_dog);
                        });            
                    }            
                })
                
                $(cont_dog).append(block_breed);
                $(cont_breed).append(cont_dog);              
            });            
        }            
    })
    
}

$(document).ready(function(){
    generate_ourDog();
})