function generate_dogs(){
    let cont_dogs = $(".container-our_dogs")[0];

    let idenf_data = {
        part: 'main',
        act: 'breeds'
    }
    
    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: JSON.stringify(idenf_data),
        success: function(data)
        {                         
            data.forEach(el => {
                $(cont_dogs).append(`
                    <div class="product-wrap">
                        <div class="product-image">
                            <a href="">
                            <img src="image/${el.img_breed}" width="25%" height="25%">
                            <div class="shadow"></div>
                            </a>
                        </div>
                        <div class="product-list">
                            <h3>${el.name_breed}</h3> 
                            <p class="description">${el.desc_breed}</p>
                            <a class="option" href="ourDogs.html">ПОДРОБНЕЕ</a> 
                        </div>
                    </div>
                `);
            });
            
        }            
    })
}

$(document).ready(function(){
    generate_dogs();
})