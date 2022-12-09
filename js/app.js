'use strict';
Products.prototype.allProducts = [];
let leftProductIndex;
let middleProductIndex;
let rightProductIndex;

function Products (name,source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.display = 0;
  Products.prototype.allProducts.push(this);
}

new Products ('bag','img/bag.jpg');
new Products ('banana','img/banana.jpg');
new Products ('bathroom','img/bathroom.jpg');
new Products ('boots','img/boots.jpg');
new Products ('breakfast','img/breakfast.jpg');
new Products ('bubblegum','img/bubblegum.jpg');
new Products ('chair','img/chair.jpg');
new Products ('cthulhu','img/cthulhu.jpg');
new Products ('dog-duck','img/dog-duck.jpg');
new Products ('dragon','img/dragon.jpg');
new Products ('pen','img/pen.jpg');
new Products ('pet-sweep','img/pet-sweep.jpg');
new Products ('scissors','img/scissors.jpg');
new Products ('shark','img/shark.jpg');
new Products ('sweep','img/sweep.png');
new Products ('tauntaun','img/tauntaun.jpg');
new Products ('unicorn','img/unicorn.jpg');
new Products ('water-can','img/water-can.jpg');
new Products ('wine-glass','img/wine-glass.jpg');

function generateRandomProductIndex (){
  leftProductIndex = generateRandomNumber();

  do {
    middleProductIndex = generateRandomNumber();
  }while(leftProductIndex === middleProductIndex);

  do {
    rightProductIndex = generateRandomNumber();
  } while(leftProductIndex === rightProductIndex || middleProductIndex === rightProductIndex);
}

generateRandomProductIndex();

function render (){
  let leftProduct = document.getElementById('left-product');
  let middleProduct = document.getElementById('middle-product');
  let rightProduct = document.getElementById('right-product');
    
  leftProduct.src = Products.prototype.allProducts[leftProductIndex].source;
  middleProduct.src = Products.prototype.allProducts[middleProductIndex].source;
  rightProduct.src = Products.prototype.allProducts[rightProductIndex].source;
}

render();








function generateRandomNumber (){
  return Math.floor(Math.random() * Products.prototype.allProducts.length);
}
