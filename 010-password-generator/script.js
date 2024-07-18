const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numbersElement = document.getElementById("number");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");

console.log(numbersElement.checked);
// 随机生成大写的字母，通过Math.random 随机生成ASCII码

const getRandomLower = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const getRandomUpper = () =>
    String.fromCharCode(Math.floor(Math.random()*26) + 65);
const getRandomNumber = () =>
    Math.floor(Math.random() * 10);
const getRandomSymbol = () =>{
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random()*symbols.length)];
}

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

const createNotification = (message) => {
    const notif = document.createElement("div");
    notif.classList.add("toast");
    notif.innerText = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(),3000);
}

clipboardElement.addEventListener("click" , () => {
    const password = resultElement.innerText;
    if(!password) return;
    const textarea = document.createElement("textarea");
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    createNotification("Password copied to clipboard");
});

generateElement.addEventListener("click", () => {
    const length = +lengthElement.value;
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;
    resultElement.innerText = generatePassword( 
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length)
})

const generatePassword = (lower, upper, number, symbol, length) => {
    let generatePassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower},{upper},{number},{symbol}].filter(
        (item) => Object.values(item)[0]
    );
    if(typesCount === 0) return "";
    for(let i = 0; i<length; i+=typesCount){
        typesArr.forEach((type) => {
            const funcName =Object.keys(type)[0];
            generatePassword += randomFunction[funcName]();
        });
    }
    const finalPassword = generatePassword.slice(0,length);
    return finalPassword
}