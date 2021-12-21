// 구글 폰트 받아오는 함수
(function(d) {
  var config = {
    kitId: 'zfl2fti',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);


// 클릭 이벤트 : content 이동
const buttonEl = document.querySelector('.contents__button');
const contentsEl = document.querySelector('.contents');
buttonCount = 0;

buttonEl.addEventListener('click', move);

function move() {
    if (buttonCount == 0) {
      contentsEl.style.transform = `translateY(-254px)`;
      buttonCount += 1;
    } else {
      contentsEl.style.transform = `translateY(0)`;
      buttonCount -= 1;
    }
};


// 드래그 이벤트 : 저금통 슬라이드
let slider = document.querySelector('.contents__moneybox');
let innerSlider = document.querySelector('.moneybox__slider');
let pressed = false;
let startX;
let X;

slider.addEventListener("mousedown", e => {
  pressed = true;
  startX = e.offsetX - innerSlider.offsetLeft;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseenter", () => {
  slider.style.cursor = "grab"
});

slider.addEventListener("mouseup", () => {
  slider.style.cursor = "grab"
});

window.addEventListener("mouseup", () => {
  pressed = false
});

slider.addEventListener("mousemove", e => {
  if (!pressed) return
  e.preventDefault()
  X = e.offsetX

  innerSlider.style.left = `${X - startX}px`
  checkboundary()
});

function checkboundary() {
  let outer = slider.getBoundingClientRect()
  let inner = innerSlider.getBoundingClientRect()

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = "0px"
  } else if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`
  }
};


// json 받아온 뒤 함수에 전달
fetch('https://gyoheonlee.github.io/mobile-bank/data/bank-new.json')
.then( response => response.json() )
.then( data => {
  let account = data;
  let obj = data.bankList;
  start(obj);
});

// json 데이터 담을 배열 상자 생성
let count = 0;
let historyDate = [];
let historyIncome = [];
let historyClassify = [];
let histoyName = [];
let historyPrice = [];


function start(obj, acount) {
// 받아온 js 데이터 값을 배열상자에 저장하는 함수
  count = obj.length;
  console.log(count);

  for (i=0; i<count; i+=1) {
    historyDate[i] = obj[count-i-1].date;
    historyIncome[i] = obj[count-i-1].income;
    historyClassify[i] = obj[count-i-1].classify;
    histoyName[i] = obj[count-i-1].history;
    historyPrice[i] = obj[count-i-1].price;
  }
  console.log(historyDate, historyIncome, historyClassify,
    histoyName, historyPrice);
  
//해당하는 위치에 json 배열 데이터 적용
  // 위치 만들기
const dailyHistory = document.querySelector('.dailyHistory');
const liEl = document.createElement('li');
const divEl = document.createElement('div');
const ulEl = document.createElement('ul');

dailyHistory.appendChild(liEl);
const historyLi = dailyHistory.querySelector('li');
historyLi.appendChild(divEl);
const historyDiv = historyLi.querySelector('div');
historyLi.appendChild(ulEl);
const historyUl = historyLi.querySelector('ul');
const liEl2 = document.createElement('li');
historyUl.appendChild(liEl2);

let countDate = []
let j = 0;
for (i=0; i<count; i+=1) {
  if (historyDate[i] === historyDate[i+1]) {
    countDate[j] += 1;
  } else {
    countDate[j] += 1;
    j += 1;
  }
} console.log(countDate);
};
//내용 추가
// for (i=0; i<count; i+=1) {
//   if (historyDate[count] !== historyDate[count-1]) {
//     historyDiv.textContent = historyDate[i];
//   }
//   else {
//     for
//     dailyHistory.appendChild(liEl);
//     historyLi.appendChild(divEl);
//   }
//   }


// .then( obj => { start(obj) } );

// function start(photos) {
//   const ulElem = document.createElement('ul');
//   document.querySelector('#app').appendChild(ulElem);
  
//   for(let i = 0; i < 100; i++) {
//     const liElem = document.createElement('li');
//     const imgElem = document.createElement('img');
//     const pElem = document.createElement('p');
//     imgElem.src = photos[i].thumbnailUrl;
//     pElem.textContent = photos[i].title;
//     liElem.appendChild(imgElem);
//     liElem.appendChild(pElem);
//     ulElem.appendChild(liElem)
//   }
// }

//foreach appen child?!
