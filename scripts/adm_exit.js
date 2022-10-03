function exitAdmin(){
    $('#exitAdmin').on('click',function(e){
        let formData = new FormData();
        
        $.ajax({
            method: "POST",
            url: "../db/logout.php",
            data: formData,
            contentType: false,
            processData: false,
            dataType : 'text',
            success: function(d){
                document.location.href = '../index.html';
            }
        });
    })
}

$(document).ready(function(){
    exitAdmin();
})