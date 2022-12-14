function generate_useful(){
    let cont_dogs = $(".container-exhibition")[0];

    let idenf_data = {
        part: 'main',
        act: 'useful'
    }
    
    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: JSON.stringify(idenf_data),
        success: function(data)
        {                         
            data.forEach(el => {
                $(cont_dogs).append(`
                    <h3>${el.title}</h3>
                    <div class="block-exhibition">
                        <div class = "exhibition">
                            <p>${el.text_1}</p>
                            <p>${el.text_2}</p>
                            <div class= "image-dog">
                                <img class="exhibition_icon" src="image/${el.img}" width="600px">
                            </div>
                        </div>
                    </div>
                `);
            });
            
        }            
    })
}

$(document).ready(function(){
    generate_useful();
})