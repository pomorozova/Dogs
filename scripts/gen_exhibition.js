function generate_exhibition(){
    let cont_dogs = $(".container-exhibition")[0];

    let idenf_data = {
        act: 'exhibition'
    }
    
    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: JSON.stringify(idenf_data),
        success: function(data)
        {
            data.forEach(el => {
                $(cont_dogs).append(`
                    <div class="block-exhibition">
                        <div class = "exhibition">
                            <h2>${el.title}</h2>
                            <p>${el.desc_text_1}</p>
                            <p>${el.desc_text_2}</p>
                            <div class= "image-dog">
                                <img class="exhibition_icon" src="image/${el.img}" width="500px">
                                <img class="exhibition_icon" src="image/${el.img}" width="500px">
                            </div>                            
                        </div>                        
                    </div>
                `);
            });            
        }            
    })
}

$(document).ready(function(){
    generate_exhibition();
})