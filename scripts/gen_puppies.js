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
                let cont_imgs_puppies = $(`<div class="block-puppies-img"></div>`);
                let cont_imgs = $(`<div class="block-puppies-left"></div>`);

                let idenf_data_imgs = {
                    act: 'puppies_imgs',
                    id:el.id
                }

                $.ajax({
                    method: "POST",
                    url: "db/datawork.php",
                    data: JSON.stringify(idenf_data_imgs),
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

$(document).ready(function(){
    generate_puppies();
})