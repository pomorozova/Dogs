function create_menu_our_dogs(){
    let menu_breeds = $('.dropdown-content')[0];
    let dataForm = new FormData();
    dataForm.append("part","main");
    dataForm.append("act","menu_breeds");

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
                let menu_breed_element = $(`<a href="${el.page_breed}" id="breed_${el.id}">${el.name_breed}</a>`);
                $(menu_breeds).append(menu_breed_element);
            });
            
        }            
    })
}

$(document).ready(function(){
    create_menu_our_dogs();
})