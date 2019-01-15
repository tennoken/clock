const body = document.querySelector("body");

const IMG_NUMBER = 4;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    body.prepend(image);
    image.classList.add("bgImage");
}

function genRandomNum(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandomNum();
    paintImage(randomNumber);
}

init();