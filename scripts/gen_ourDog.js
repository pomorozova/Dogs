function generate_ourDog(){
    let cont_breed = $("#container_dog_breed");
    let breed = $("#active_breed").data("actbreed");
    let id_breed = breed.split('_')[1];
    
    let idenf_data = {        
        act: 'our_dog',
        id: id_breed
    }
    
    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: JSON.stringify(idenf_data),
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

                let idenf_data_img = {
                    act: 'our_dog_imgs',
                    id: el.id_breed
                }

                $.ajax({
                    method: "POST",
                    url: "db/datawork.php",
                    data: JSON.stringify(idenf_data_img),
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