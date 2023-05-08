const body = document.body;
const slides = document.querySelectorAll(".slide");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// 设置一个指向标签
let activeSlide = 0;
// 同步背景图片
const setBackground = () => {
  body.style.backgroundImage = slides[activeSlide].style.backgroundImage;
};
// 通过指向标签，选择显示图片
const setActiveSlide = () => {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[activeSlide].classList.add("active");
};
// 右边指向标签+1；背景更新，图片更新
rightButton.addEventListener("click", () => {
  activeSlide++;
  if (activeSlide > slides.length - 1) activeSlide = 0;
  setBackground();
  setActiveSlide();
});
// 左边按钮指向标签-1：背景更新，图片更新
leftButton.addEventListener("click", () => {
  activeSlide--;
  if (activeSlide < 0) activeSlide = slides.length - 1;
  setBackground();
  setActiveSlide();
});

setBackground();
