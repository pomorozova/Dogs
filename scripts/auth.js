
function authorization(){
    $('#form_auth').on("submit",function(e){
        e.preventDefault();
        let formData = new FormData(this);
        formData.append("part","auth");
        formData.append("act","authorization");

        $.ajax({
            method: "POST",
            url: "db/datawork.php",
            data: formData,
            contentType: false,
            processData: false,
		    dataType : 'json',
            success: function(data){
                console.log(data);
            }
        });
    })
}

$(document).ready(function(){
    authorization();
})