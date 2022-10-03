function exitAdmin(){
    $('#exitAdmin').on('click',function(e){
        e.preventDefault();
        let formData = new FormData();
        
        $.ajax({
            method: "POST",
            url: "db/logout.php",
            data: formData,
            contentType: false,
            processData: false,
            dataType : 'json',
            success: function(){

            }
        });
    })
}

$(document).ready(function(){
    exitAdmin();
})