function gen_list_pages(){
    let data_breed = {
        part:"main",
        act:"breeds"
    }

    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: JSON.stringify(data_breed),
        success: function(data){
            let list_pages = $(`#list_breeds_pages`);

            data.forEach(el => {
                let element_link_page = $(`<a id="elListPage_${el.id}" href="editing/gallery.html">${el.name_breed}</a>`);
                
                element_link_page.on("click",function(e){                    
                    localStorage.setItem('breed_gallery', $(e.target).attr('id').split('_')[1])
                });
                
                $(list_pages).append(element_link_page);
            })
        }
    });
}

$(document).ready(function(){
    gen_list_pages();
})