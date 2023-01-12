let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hueRotate = document.querySelector("#hue-rotate");

let download = document.querySelector("#download");
let upload = document.getElementById("upload");
let img = document.querySelector("#img");

let reset = document.querySelector("span");
let imgBox = document.querySelector(".img-box");
let canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d");



function resetValues(){
  img.style.filter = "none";
  ctx.filter = "none";
  saturate.value ="100"
  contrast.value ="100"
  brightness.value ="100"
  sepia.value ="0"
  grayscale.value ="0"
  blur.value ="0"
  hueRotate.value ="0"
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  imgBox.style.display = "none"
  reset.style.display = "none"
  download.style.display = "none"
}

window.onload = function () {
  reset.style.display = 'none' ;
  download.style.display = 'none' ;
  imgBox.style.display = 'none' ;
}

upload.onchange = function() {
  resetValues();
  reset.style.display = 'block';
  imgBox.style.display = 'block';
  download.style.display = 'block';
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function() {
    img.src = file.result
  }
  img.onload = function(){
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
    img.style.display = "none";
  }
}

let filters = document.querySelectorAll("ul li input");
filters.forEach(filter =>{
  filter.addEventListener("input", function(){
    ctx.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
  })
})

reset.onclick =function(){
  resetValues()
}

download.onclick = function(){
  download.href = canvas.toDataURL()
}