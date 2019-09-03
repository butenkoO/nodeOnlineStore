let cart = {};

document.querySelectorAll('.add-to-cart').forEach(function(element){
    element.onclick = addToCart;
});

function addToCart(){
    let goodsId = this.dataset.goods_id;
    if(cart[goodsId]){
        cart[goodsId]++;
    }
    else{
        cart[goodsId] = 1;
    }
    console.log(cart);
}
