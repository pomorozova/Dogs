function generate_news(){
    let cont_news = $(".container-news-1")[0];
    let idenf_data = {
        act: "news"
    }
    
    $.ajax({
        method: "POST",
        url: "db/datawork.php",
        data: JSON.stringify(idenf_data),
        success: function(data)
        {            
            data.forEach(el => {
                $(cont_news).append(`
                    <div class="block-news">
                        <div class="block-news-left">
                            <img class="news_icon" src="image/${el.img}" width="400px">
                        </div>
                        <div class="adapt_news_icon">
                            <div class="block-news-right">
                                <h2>${el.date} ${el.title}</h2>
                                <p class="content-news">${el.desc_news}</p>
                                <div class="line"></div>
                            </div>
                        </div>        
                    </div>
                `);
            });
            
        }            
    })
    
}

$(document).ready(function(){
    generate_news();
})