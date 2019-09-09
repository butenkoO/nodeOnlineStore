let cart = {};

document.querySelectorAll('.add-to-cart').forEach(function(element){
    element.onclick = addToCart;
});

if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
    ajaxGetGoodInfo();
}

function addToCart(){
    let goodsId = this.dataset.goods_id;
    if(cart[goodsId]){
        cart[goodsId]++;
        }else{
            cart[goodsId] = 1;
        }
    ajaxGetGoodInfo();
}

function ajaxGetGoodInfo(){
    updateLocalStorage();
    fetch('/get-goods-info',{
        method: 'POST',
        body: JSON.stringify({key:Object.keys(cart)}),
        headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    })
    .then(function(response){
        return response.text();
    })
    .then(function(body){
        showCart(JSON.parse(body));
    });
}

function showCart(data){
    let out= '<table class="table table-striper table-cart"><tbody>';
    let total = 0;
    for(let key in cart){
        out += `<tr><td colspan="4"><a href="/goods?id=${key}">${data[key]['name']}</a></tr>`;
        out += `<tr><td><i class='far fa-minus-square cart-minus' data-goods_id="${key}"></i></td>`;
        out += `<td>${cart[key]}</td>`;
        out += `<td><i class='far fa-plus-square cart-plus' data-goods_id="${key}"></i></td>`;
        out += `<td>${data[key]['cost']*cart[key]} грн </td>`;
        out += `</<tr>`;
        total += cart[key]*data[key]['cost'];
    }
        out += `<tr><td colspan = "3">Всього: </td><td>${total} грн</td></tr>`;
        out += '</tbody></table>';
    document.querySelector('#cart-nav').innerHTML = out;
    document.querySelectorAll('.cart-plus').forEach(function(element){
        element.onclick = cartPlus;
    });
    document.querySelectorAll('.cart-minus').forEach(function(element){
        element.onclick = cartMinus;
    });
}

function cartPlus(){
    let goodsId = this.dataset.goods_id;
    cart[goodsId]++;
    ajaxGetGoodInfo();
}
function cartMinus(){
    let goodsId = this.dataset.goods_id;
    if(cart[goodsId] -1 > 0 ){
        cart[goodsId]--;
        }
        else{
            delete(cart[goodsId]);
        }
    ajaxGetGoodInfo();
}

function updateLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}