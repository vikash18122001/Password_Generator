const valuelength=document.querySelector("[data-length-display]");
const sliderlength=document.querySelector("[slider-length]");
const UpperCaseCheck=document.querySelector("#Uppercase");
const LowerCaseCheck=document.querySelector("#Lowercase");
const NumberCheck=document.querySelector("#Numbers");
const SymbolCheck=document.querySelector("#Symbols");
const symbol="!~@#$%^&*()";
const copyMsg=document.querySelector("[data-copyMsg]");
const dataPassword=document.querySelector("[data-display");
const indicator=document.querySelector(".data-indicator")
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
const copyBtn=document.querySelector(".copy-btn");
const generateBtn=document.querySelector(".generator");
let passwordlength=10;
handleSlider();
function handleSlider(){
    sliderlength.value=passwordlength;
    valuelength.innerText=passwordlength;

}


sliderlength.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleSlider();
})
setIndicator("#ccc");
function setIndicator(color)
{
    indicator.style.backgroundColor=color;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}
function generateRndNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum=getRndInteger(0,symbol.length);
    return symbol.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbol=false;
    if(LowerCaseCheck.checked)hasLower=true;
    if(UpperCaseCheck.checked)hasUpper=true;
    if(NumberCheck.checked)hasNumber=true;
    if(SymbolCheck.checked)hasSymbol=true;
    
    if(hasLower && hasUpper && (hasNumber || hasSymbol) && (passwordlength>=8))
    setIndicator('#0f0');
    else if ((hasLower || hasUpper) && (hasNumber || hasSymbol) && (passwordlength>=6) )
    setIndicator('#f00');
    else setIndicator("#ff0");
    
}
const  copyText = document.getElementById(".myInput");
async function copyContent(){
    try {
         await navigator.clipboard.writeText(dataPassword.value);  
         copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed";
    }
    // to make copy span visible
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}
sliderlength.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click',()=>{
    if(dataPassword.value)copyContent();  

})
let checkCount=0;
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkBox)=>{
        if(checkBox.checked)checkCount++;
    })
    if(passwordlength<checkCount)
    {
        passwordlength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkBox)=>{
    checkBox.addEventListener('change',handleCheckBoxChange)
})
function shuffle(array){
    
    let i = array.length;
    while (--i > 0) {
       let temp = Math.floor(Math.random() * (i + 1));
       [array[temp], array[i]] = [array[i], array[temp]];
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
    
 };

generateBtn.addEventListener('click',()=>{
       if(checkCount==0)return ;
       if(passwordlength<checkCount){
        passwordlength=checkCount;
        handleSlider();
       }
       password="";
       let funcArr=[];
       if(LowerCaseCheck.checked)funcArr.push(generateLowerCase);
       if(UpperCaseCheck.checked)funcArr.push(generateUpperCase);
       if(NumberCheck.checked)funcArr.push(generateRndNumber);
       if(SymbolCheck.checked)funcArr.push(generateSymbol);
       for(let i=0;i<funcArr.length;i++){
             password+=funcArr[i]();
       }
       //remaining password
       for(let i=0;i<passwordlength-funcArr.length;i++)
       {
           let  randomIndex=getRndInteger(0,funcArr.length);
          
           password+=funcArr[randomIndex]();
       }
       // shuffle the password
       password=shuffle(Array.from(password));
       // display password
       dataPassword.value=password;
       calcStrength();
})


