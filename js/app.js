/* eslint-disable no-inner-declarations */
'use strict';
Products.prototype.allProducts = [];
let leftProductIndex;
let middleProductIndex;
let rightProductIndex;
let leftProduct = document.getElementById('left-product');
let middleProduct = document.getElementById('middle-product');
let rightProduct = document.getElementById('right-product');
let maxAttempts = 25;
let userAttemptsCounter = 0;
let names = [];
let votes = [];
let view = [];
let previousLeftProduct = -1;
let previousMiddleProduct = -1;
let previousRightProduct = -1;

function Products (name,source) {
  this.name = name;
  this.source = source;
  this.votes = 0;
  this.display = 0;
  Products.prototype.allProducts.push(this);
  names.push(name);
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

let productsForm = document.getElementById('productsForm');

productsForm.addEventListener('submit', userSubmit);

function userSubmit (e){
  e.preventDefault();
  maxAttempts = e.target.numberOfRounds.value;
}

function generateRandomProductIndex (){
  let spamIndex = [previousLeftProduct,previousMiddleProduct,previousRightProduct];

  do{ leftProductIndex = generateRandomNumber();
  }while(spamIndex.includes(leftProductIndex));

  spamIndex.push(leftProductIndex);
  previousLeftProduct = leftProductIndex;

  do {
    middleProductIndex = generateRandomNumber();
  }while(spamIndex.includes(middleProductIndex));

  spamIndex.push(middleProductIndex);
  previousMiddleProduct = middleProductIndex;

  do {
    rightProductIndex = generateRandomNumber();
  } while(spamIndex.includes(rightProductIndex));

  previousRightProduct = rightProductIndex;
}

generateRandomProductIndex ();

function render (){
  leftProduct.src = Products.prototype.allProducts[leftProductIndex].source;
  middleProduct.src = Products.prototype.allProducts[middleProductIndex].source;
  rightProduct.src = Products.prototype.allProducts[rightProductIndex].source;
}

render();

function createLocalStorage() {
  let userData = JSON.stringify(Products.prototype.allProducts);
  localStorage.setItem('userData',userData);
}

function getData(){
  let getUserData = localStorage.getItem('userData');
  let jsProducts = JSON.parse(getUserData);
  if(jsProducts) { 
    Products.prototype.allProducts = jsProducts;
  }
  render();
}

leftProduct.addEventListener('click', gettingUserClicks);
middleProduct.addEventListener('click', gettingUserClicks);
rightProduct.addEventListener('click', gettingUserClicks);
let viewResult;
function gettingUserClicks(event){
  userAttemptsCounter++;

  if(userAttemptsCounter <= maxAttempts){
    if(event.target.id === 'left-product'){
      Products.prototype.allProducts[leftProductIndex].votes++;
      Products.prototype.allProducts[leftProductIndex].display++;
      Products.prototype.allProducts[middleProductIndex].display++;
      Products.prototype.allProducts[rightProductIndex].display++;

    }else if(event.target.id === 'middle-product'){
      Products.prototype.allProducts[middleProductIndex].votes++;
      Products.prototype.allProducts[leftProductIndex].display++;
      Products.prototype.allProducts[middleProductIndex].display++;
      Products.prototype.allProducts[rightProductIndex].display++;
    }else{
      Products.prototype.allProducts[rightProductIndex].votes++;
      Products.prototype.allProducts[leftProductIndex].display++;
      Products.prototype.allProducts[middleProductIndex].display++;
      Products.prototype.allProducts[rightProductIndex].display++;
    }

    createLocalStorage();
    generateRandomProductIndex();
    render();

  } else{

    for(let i = 0; i < Products.prototype.allProducts.length; i++){
      votes.push(Products.prototype.allProducts[i].votes);
      view.push(Products.prototype.allProducts[i].display);
    }

    leftProduct.removeEventListener('click', gettingUserClicks);
    middleProduct.removeEventListener('click', gettingUserClicks);
    rightProduct.removeEventListener('click', gettingUserClicks);

    viewResult = document.createElement('button');
    viewResult.textContent = 'view result';
    productsForm.appendChild(viewResult);

    viewResult.addEventListener('click', showREsult);

    function showREsult (){
      let result = document.getElementById('result');
      let resultItems;
      for(let i = 0; i < Products.prototype.allProducts.length; i++){
        resultItems = document.createElement('li');
        resultItems.textContent = Products.prototype.allProducts[i].name + ':'+ Products.prototype.allProducts[i].votes + ' votes and displayed '+ Products.prototype.allProducts[i].display + ' times';
        result.appendChild(resultItems);
      }

      const ctx = document.getElementById('myChart');

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: names,
          datasets: [{
            label: 'voted',
            data: votes,
            borderWidth: 1
          }
          ,{
            label: 'Viewed',
            data: view,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      viewResult.removeEventListener('click', showREsult);
    }
  }
}

function generateRandomNumber (){
  return Math.floor(Math.random() * Products.prototype.allProducts.length);
}

getData();
