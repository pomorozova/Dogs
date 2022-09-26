function create_menu_our_dogs(){
    let menu_breeds = $('.dropdown-content')[0];

    let idenf_data = {
        act: 'menu_breeds'
    }
    
    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: JSON.stringify(idenf_data),
        success: function(data)
        {   
            data.forEach(el => {
                let menu_breed_element = $(`<a href="${el.page_breed}" id="breed_${el.id}">${el.name_breed}</a>`);
                $(menu_breeds).append(menu_breed_element);
            });
            
        }            
    })
}

$(document).ready(function(){
    create_menu_our_dogs();
})