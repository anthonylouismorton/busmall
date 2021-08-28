'use strict';

const firstProductElem = document.getElementById('firstProduct');
const firstProductLabelElem = document.getElementById('firstProductH2');
const secondProductElem = document.getElementById('secondProduct');
const secondProductLabelElem = document.getElementById('secondProductH2');
const thirdProductElem = document.getElementById('thirdProduct');
const thirdProductLabelElem = document.getElementById('thirdProductH2');
const productsElem = document.getElementById('products');

let picks = 0;
let firstProduct = null;
let secondProduct = null;
let thirdProduct = null;

function Product(name, image, votes, appearances){
  this.name = name;
  this.image = image;
  this.votes = 0;
  this.appearances = 0;
  if(votes === undefined){
    this.votes = 0;
  }
  else{
    this.votes = votes;
  }
  if(appearances === undefined){
    this.appearances = 0;
  }
  else{
    this.appearances = appearances;
  }
}

Product.productArray = [];
let copyArray;

Product.prototype.renderProduct = function(img,h2){
  img.src = this.image;
  h2.textContent = this.name;
  this.appearances++;
}

function getRandom() {
  let min = Math.ceil(0);
  let max = Math.floor(copyArray.length);
  return Math.floor(Math.random() * (max - min) + min);
}

let checkIfEmpty = function() {
  if (copyArray.length === 0) {
    copyArray = Product.productArray.slice();
  }
}

function getRandomProducts(){
 
  let randomIndex = getRandom();
  let firstPosition = randomIndex;
  firstProduct = copyArray[firstPosition];
  copyArray.splice(firstPosition, 1);
  checkIfEmpty();
  
  randomIndex = getRandom();
  Product.productArray.appearances++
  let secondPosition = randomIndex;
  secondProduct = copyArray[secondPosition];
  copyArray.splice(secondPosition, 1);
  checkIfEmpty();

  randomIndex = getRandom();
  Product.productArray.appearances++
  let thirdPosition = randomIndex;
  thirdProduct = copyArray[thirdPosition];
  copyArray.splice(thirdPosition, 1);
  checkIfEmpty();
  
  
  // const uniqueProducts = [firstProduct, secondProduct, thirdProduct];

  // while(uniqueProducts.includes(firstProduct))
  // {
  //   let firstPosition = Math.floor(Math.random()*Product.productArray.length);
  //   firstProduct = Product.productArray[firstPosition];
  // }
  // uniqueProducts.push(firstProduct)
  // while(uniqueProducts.includes(secondProduct))
  // {
  //   let secondPosition = Math.floor(Math.random()*Product.productArray.length);
  //   secondProduct = Product.productArray[secondPosition];
  // }
  // uniqueProducts.push(secondProduct)
  // while(uniqueProducts.includes(thirdProduct))
  // {
  //   let thirdPosition = Math.floor(Math.random()*Product.productArray.length);
  //   thirdProduct = Product.productArray[thirdPosition];
  // }
  // uniqueProducts.push(thirdProduct)
  
  renderProducts();
}

function renderProducts(){
  firstProduct.renderProduct(firstProductElem, firstProductLabelElem);
  secondProduct.renderProduct(secondProductElem, secondProductLabelElem);
  thirdProduct.renderProduct(thirdProductElem, thirdProductLabelElem);
}

function createProduct(aName, image){
  let product = new Product(aName, image);
  Product.productArray.push(product);

}
function getDatafromStorage(){
  const stringVotes = localStorage.getItem('votes');
  if(stringVotes !== null){
    
    const parseVotes = JSON.parse(stringVotes);
    for(let product of parseVotes){
     product.storageAppearances = parseInt(product.appearances);
     product.storageVotes = parseInt(product.votes);
      const myVotes = new Product(product.name, product.image, product.storageVotes, product.storageAppearances)
      Product.productArray.push(myVotes)
    }
  }
  else{
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
    createProduct('sweep', './img/sweep.png');
    createProduct('tauntaun', './img/tauntaun.jpg');
    createProduct('unicorn', './img/unicorn.jpg');
    createProduct('water-can', './img/water-can.jpg');
    createProduct('wine-glass', './img/wine-glass.jpg');
    }
    copyArray = Product.productArray.slice();
    getRandomProducts();
  
}
console.log(Product.productArray)
function storeVotes(){
  const stringVotes = JSON.stringify(Product.productArray)
  localStorage.setItem('votes', stringVotes)
}
function viewResultsHandler(event){
  renderChart();
  renderVotes();
  let viewResultsElem = document.getElementById('viewResults');
  viewResultsElem.classList.toggle('hidden');
}
function clickHandler(event){
  if(event.target === firstProductElem ||event.target === secondProductElem ||event.target === thirdProductElem){
      if(event.target === firstProductElem){
        firstProduct.votes++;
      }
      else if(event.target === secondProductElem){
        secondProduct.votes++;
      }
      else if(event.target === thirdProductElem){
        thirdProduct.votes++;
      }
      picks++;
      if(picks < 25)
      {
        getRandomProducts();
      }
      else{
        productsElem.removeEventListener('click', clickHandler);
        let viewResultsElem = document.getElementById('viewResults');
        viewResultsElem.classList.toggle('hidden');
        viewResultsElem.addEventListener('click', viewResultsHandler);
      }
      console.log(picks)
  }
  storeVotes();
}
function renderChart(){
  const productsData = [];
  const dataLabels = [];
  const productAppearances = [];

  for(let product of Product.productArray){
    productsData.push(product.votes)
    dataLabels.push(product.name)
    productAppearances.push(product.appearances)
  }

var ctx = document.getElementById('productGraph').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dataLabels,
        datasets: [{
            label: '# of Votes',
            data: productsData,
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1,
          }, {
            label: '# appearances',
            data: productAppearances,
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 1,
            
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
});
}
function renderVotes(){
  const ulElem = document.getElementById('productTotals');
  ulElem.innerHTML = '';
  for(let product of Product.productArray){
    const liElem = document.createElement('li');
    liElem.textContent = `Product: ${product.name}, Votes: ${product.votes}, Appearances: ${product.appearances}`;
    ulElem.appendChild(liElem);
  }
}

productsElem.addEventListener('click', clickHandler);

// createProduct('bag', './img/bag.jpg');
// createProduct('banana', './img/banana.jpg');
// createProduct('bathroom', './img/bathroom.jpg');
// createProduct('boots', './img/boots.jpg');
// createProduct('breakfast', './img/breakfast.jpg');
// createProduct('bubblegum', './img/bubblegum.jpg');
// createProduct('chair', './img/chair.jpg');
// createProduct('cthulhu', './img/cthulhu.jpg');
// createProduct('dog-duck', './img/dog-duck.jpg');
// createProduct('dragon', './img/dragon.jpg');
// createProduct('pen', './img/pen.jpg');
// createProduct('pet-sweep', './img/pet-sweep.jpg');
// createProduct('scissors', './img/scissors.jpg');
// createProduct('shark', './img/shark.jpg');
// createProduct('sweep', './img/sweep.png');
// createProduct('tauntaun', './img/tauntaun.jpg');
// createProduct('unicorn', './img/unicorn.jpg');
// createProduct('water-can', './img/water-can.jpg');
// createProduct('wine-glass', './img/wine-glass.jpg');

getDatafromStorage();
//getRandomProducts();