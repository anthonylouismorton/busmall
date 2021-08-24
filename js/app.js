'use strict';

const firstProductElem = document.getElementById('firstProduct');
const firstProductLabelElem = document.getElementById('firstProductH2');
const secondProductElem = document.getElementById('secondProduct');
const secondProductLabelElem = document.getElementById('secondProductH2');
const thirdProductElem = document.getElementById('thirdProduct');
const thirdProductLabelElem = document.getElementById('thirdProductH2');
const productsELem = document.getElementById('products');

let picks = 0;
let firstProduct = null;
let secondProduct = null;
let rightProduct = null;

function Product(name, image){
  this.name;
  this.image;
  this.votes = 0;
  this.appearances = 0;
}

Product.productArray = [];

Product.prototype.renderProducts = function(img,h2){
  img.src = this.image;
  h2.textContent = this.name;
  this.label = getElementById('')
  this.appearances++;
}

function getRandomProducts(){
  let firstPosition = Math.floor(Math.random()*Product.productArray.length);
  firstProduct = firstPosition;

  let secondPosition;
  let thirdPosition;
  while(secondPosition === undefined || secondPosition === firstPosition || secondPosition === thirdPosition)
  {
    secondProduct = Math.floor(Math.random()*Product.productArray.length);
  }
  while(thirdPosition === undefined || thirdPosition === firstPosition || thirdPosition === secondPosition)
  {
    thirdProduct = Math.floor(Math.random()*Product.productArray.length);
  }
  renderProducts(firstProduct,secondProduct,thirdProduct);
}

function createProduct(name, image){
  let product = new Product(name, image);
  Product.productArray.push(product);
}

function clickHanlder(event){
  if(event.target === firstProductElem ||event.target === secondProductElem ||event.target === thirdProductElem){
  picks++
  if(event.target === firstProductElem){
    firstProduct.votes++;
  }
  else if(event.target === secondProductElem){
    secondProduct.votes++;
  }
  else{
  thirdProduct.votes++;
  }
  if(picks >= 25){
    productsELem.removeEventListener('click', clickHanlder);
  }
  //renderVotes();
  //getRandomProducts();
}
}

function renderVotes(){
  const ulElem = document.getElementById('productTotals');
  ulElem.innerHTML = '';
  for(let product of Product.productArray){
    const liElem = document.createElement('li');
    liElem.textContent = `${Product.name}: ${Product.votes}`;
    ulElem.appendChild(liElem);
  }
}

productsELem.addEventListener('click', clickHanlder);

createProduct('bag', './img/bag.jpg');
createProduct('banana', './img/banana.jpg');
createProduct('bathroom', './img/bathroom.jpg');
createProduct('boots', './img/boots.jpg');
createProduct('breakfast', './img/breakfast.jpg');
createProduct('bubblegum', './img/bubblegum.jpg');
createProduct('chair', './img/chair.jpg');
createProduct('cthulhu', './img/cthulhu.jpg');
createProduct('dog-duck', './img/dog-duck.jpg');
createProduct('dragon', './img/dragon.jpg');
createProduct('pen', './img/pen.jpg');
createProduct('pet-sweep', './img/pet-sweep.jpg');
createProduct('scissors', './img/scissors.jpg');
createProduct('shark', './img/shark.jpg');
createProduct('sweep', './img/sweep.jpg');
createProduct('tauntaun', './img/tauntaun.jpg');
createProduct('unicorn', './img/unicorn.jpg');
createProduct('water-can', './img/water-can.jpg');
createProduct('wine-glass', './img/wine-glass.jpg');
Product.productArray.push(new Product('banana','./img/banana.jpg'));
//getRandomProducts();
console.log(Product.productArray);