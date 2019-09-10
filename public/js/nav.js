document.getElementById("close-nav").onclick = showNav;

function showNav(){
    if ( document.getElementById("close-nav").classList.contains('close-nav') ){
        document.querySelector('.site-nav').style.left = '-300px';
        document.querySelector('.close-button-div').style.left = '0px';
        document.getElementById("close-nav").classList.remove('close-nav');
        document.getElementById("close-nav").classList.add('show-nav');
    }else{
        document.querySelector('.site-nav').style.left = '0px';
        document.querySelector('.close-button-div').style.left = '300px';
        document.getElementById("close-nav").classList.remove('show-nav');
        document.getElementById("close-nav").classList.add('close-nav');
    }
}

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