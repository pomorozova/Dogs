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
                $(cont_dogs).append(`
                    <div class="container-dog1">
                        <h3>${el.title_dog}</h3>
                        <p><span></span>${el.desc_dog}</p>
                        <div class= "image-gallery"> 
                            <img class="news_icon" src="image/Шпиц.jpg" width="350px">
                            <img class="news_icon" src="image/Шпиц.jpg" width="350px">
                            <img class="news_icon" src="image/Шпиц.jpg" width="350px">
                        </div>
                    </div>
                `);
            });
            
        }            
    })
}

$(document).ready(function(){
    generate_gallery();
})