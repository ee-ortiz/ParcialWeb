const url = 'https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json';

async function fetchData(){ 
    try {
        const response = await fetch(url);
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.error(error);
    }
}

let b1 = document.getElementById('b1');
let b2 = document.getElementById('b2');
let b3 = document.getElementById('b3');
let b4 = document.getElementById('b4');
let b5 = document.getElementById('b5');

document.getElementById("b1").addEventListener("click", function() {
    let card1html = "<div class='card'> <img class='card-img-top' src='imgs/BannerB.png' alt='Card image cap'/> <h5 class='card-header'>Card title</h5> <div class='card-body'> <p class='card-text'>Card content</p> </div> <div class='card-footer'>Card footer</div> </div>"
    document.getElementById("a1").innerHTML = card1html;
    document.getElementById("a2").innerHTML = card1html;
    document.getElementById("a3").innerHTML = card1html;
    document.getElementById("a4").innerHTML = card1html;
});

document.getElementById("b2").addEventListener("click", function() {
    let card1html = "<div class='card'> <img class='card-img-top' src='imgs/BannerB.png' alt='Card image cap'/> <h5 class='card-header'>Card title</h5> <div class='card-body'> <p class='card-text'>Card content</p> </div> <div class='card-footer'>Card footer</div> </div>"
    document.getElementById("a1").innerHTML = card1html;
    document.getElementById("a2").innerHTML = card1html;
    document.getElementById("a3").innerHTML = card1html;
    document.getElementById("a4").innerHTML = card1html;
});

document.getElementById("b3").addEventListener("click", function() {
    let card1html = "<div class='card'> <img class='card-img-top' src='imgs/BannerB.png' alt='Card image cap'/> <h5 class='card-header'>Card title</h5> <div class='card-body'> <p class='card-text'>Card content</p> </div> <div class='card-footer'>Card footer</div> </div>"
    document.getElementById("a1").innerHTML = card1html;
    document.getElementById("a2").innerHTML = card1html;
    document.getElementById("a3").innerHTML = card1html;
    document.getElementById("a4").innerHTML = card1html;
});

document.getElementById("b4").addEventListener("click", function() {
    let card1html = "<div class='card'> <img class='card-img-top' src='imgs/BannerB.png' alt='Card image cap'/> <h5 class='card-header'>Card title</h5> <div class='card-body'> <p class='card-text'>Card content</p> </div> <div class='card-footer'>Card footer</div> </div>"
    document.getElementById("a1").innerHTML = card1html;
    document.getElementById("a2").innerHTML = card1html;
    document.getElementById("a3").innerHTML = card1html;
    document.getElementById("a4").innerHTML = card1html;
});

document.getElementById("b5").addEventListener("click", function() {
    let card1html = "<div class='card'> <img class='card-img-top' src='imgs/BannerB.png' alt='Card image cap'/> <h5 class='card-header'>Card title</h5> <div class='card-body'> <p class='card-text'>Card content</p> </div> <div class='card-footer'>Card footer</div> </div>"
    document.getElementById("a1").innerHTML = card1html;
    document.getElementById("a2").innerHTML = card1html;
    document.getElementById("a3").innerHTML = card1html;
    document.getElementById("a4").innerHTML = card1html;
});






