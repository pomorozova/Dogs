
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
            console.log(data);

            data.forEach(el => {
                $(menu_breeds).append(`<a href="ourDogs.html" id="breed_${el.id}">${el.name_breed}</a>`);
            });
            
        }            
    })
}

$(document).ready(function(){
    create_menu_our_dogs();
})