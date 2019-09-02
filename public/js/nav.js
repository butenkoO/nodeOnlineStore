function getCategoryList(){
    fetch('/get-category-list',
    {
        method:'POST'
    }
    ).then(function(response){
        return response.text();
        }
    ).then(function(body){

        showCategoryList(JSON.parse(body));
    });
}

function showCategoryList(data){
    let out = '<ul class="category-list"><li><a href="/">Головна</a></li>';
    for(let i = 0; i<data.length;i++){
        out += `<li><a href="/category/${data[i]['class']}">${data[i]['name']}</a></li>`;
    }
    out +='</ul>';
    document.querySelector('#category-list').innerHTML = out;
}

getCategoryList();