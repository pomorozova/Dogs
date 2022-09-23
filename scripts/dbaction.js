function form_test(){
    
    $("#form_puppies").submit(function(e) {
        e.preventDefault();
        var form = $(this);
        var actionUrl = form.attr('action');
        
        $.ajax({
            method: "POST",
            url: actionUrl,
            data: form.serialize(),
            success: function(data)
            {
                alert(data);
            }
        });
        
    });
}

$(document).ready(function(){
    form_test();
    
});