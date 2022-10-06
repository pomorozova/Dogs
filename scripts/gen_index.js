function generate_dogs(){
    let cont_dogs = $(".container-our_dogs")[0];
    let dataForm = new FormData();
    dataForm.append("part","main");
    dataForm.append("act","breeds");

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
                $(cont_dogs).append(`
                    <div class="product-wrap">
                        <div class="product-image">
                            <a href="">
                            <img src="image/${el.img_breed}" width="25%" height="25%">
                            <div class="shadow"></div>
                            </a>
                        </div>
                        <div class="product-list">
                            <h3>${el.name_breed}</h3> 
                            <p class="description">${el.desc_breed}</p>
                            <a class="option" href="${el.page_breed}">ПОДРОБНЕЕ</a> 
                        </div>
                    </div>
                `);
            });
            
        }            
    })
}

function generate_news(){
    let cont_news = $(".container-news-1")[0];
    let dataForm = new FormData();
    dataForm.append("part","main");
    dataForm.append("act","index_news");

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

function all_set_btn(){
    $('#btnTitleExhib').on('click',function(){
        document.location.href = 'useful.html';
    })

    $('#btnShowAllNews').on('click',function(){
        document.location.href = 'news.html';
    })
}



$(document).ready(function(){
    generate_news();
    generate_dogs();
    all_set_btn();
})