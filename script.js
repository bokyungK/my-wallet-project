(function(d) {
  var config = {
    kitId: 'zfl2fti',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);


// 드래그 이벤트 : content 이동
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


// 드래그 이벤트: history slide
