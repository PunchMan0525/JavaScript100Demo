const buttons = document.querySelectorAll(".ripple");

buttons.forEach((button) => {
    button.addEventListener("click" , function (e){
        // 获取鼠标点击的位置
        const x = e.clientX;
        const y = e.clientY;
        // 或者button的位置
        const buttonTop = e.target.offsetTop;
        const buttonLeft = e.target.offsetLeft;
        console.log(x,y);
        console.log(buttonTop,buttonLeft);
        // 鼠标点击的位置 - button的位置 就是圆相对于按钮的宽高；
        const XInside = x - buttonLeft;
        const yInside = y - buttonTop;
        // 给span添加宽和高
        const circle = document.createElement("span");
        circle.classList.add("circle");
        circle.style.top = yInside + "px";
        circle.style.left = XInside + "px";
        this.appendChild(circle);
        setTimeout(()=> circle.remove(),1500)
    })
})