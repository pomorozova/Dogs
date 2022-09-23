function generate_puppies(){
    let cont_puppies = $("#puppies_container");

    let idenf_data = {
        act: 'puppies'
    }
    
    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: JSON.stringify(idenf_data),
        success: function(data)
        {            
            data.forEach(el => {
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
                    <div class="block-puppies-img">
                        <div class="block-puppies-left">
                            <img class="puppies_icon" src="image/News.jpg" width="400px">
                            <img class="puppies_icon" src="image/News.jpg" width="400px">
                        </div>
                    </div>
                `);
            });
            
        }            
    })
    
}

$(document).ready(function(){
    generate_puppies();
})