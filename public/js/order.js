document.querySelector('#lite-shop-order').onsubmit = function(event){
    event.preventDefault();
    let username = document.querySelector('#username').value.trim();
    let phone = document.querySelector('#phone').value.trim();
    let email = document.querySelector('#email').value.trim();

    if(username == '' || phone == ''){
        return console.error('поля заповнені не вірно');
    }
    fetch('/finish-order',{
        method: 'POST',
        body: JSON.stringify({
            'username':username,
            'phone':phone,
            'email':email,
            'key':JSON.parse(localStorage.getItem('cart'))
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(function(response){return response.text();})
    .then(function(body){
        if(body == 1){
            console.log('all right');
        }else{console.error('err')}
    });
};