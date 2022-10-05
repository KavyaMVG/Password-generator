const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement("textarea")
    const password = resultEl.innerText
    if(!password){
        return;
    }
    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy');
    textarea.remove();
	alert('Successfully copied to clipboard!');
})

generateEl.addEventListener('click', () => {
    const passwordLen = lengthEl.value
    const  isUpper = uppercaseEl.checked
    const isLower = lowercaseEl.checked
    const isSymbol = symbolsEl.checked
    const isnum = numbersEl.checked
    resultEl.innerText = generatePassword(isLower, isSymbol, isUpper, isnum, passwordLen);

})

function generatePassword(lower, symbol, upper, number, length) {
    let password = ''

    const types = lower + symbol + upper + number
    const charType =    [{lower} , {symbol} , {upper} , {number}] .filter(char => Object.values(char)[0])

    if(types === 0){
        return ""
    }

    for(let i=0; i<length; i += types){
        charType.map(type => {
            const randFunc = Object.keys(type)[0];
            password += randomFunc[randFunc]();
        });
    }
    password = password.slice(0,length);
    return password;

}

function getRandomLower() {
    const alphabets = "abcdefghijklmnopqrstuvwxys"
    let randomAlpha = Math.floor(Math.random() * alphabets.length);
    return alphabets[randomAlpha]  
}

function getRandomUpper() {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let randomAlpha = Math.floor(Math.random() * alphabets.length);
    return alphabets[randomAlpha];  
}

function getRandomNumber() {
    let randomNum = Math.floor(Math.random() * 100 )
    return randomNum
}

function getRandomSymbol() {
    const sym = "!@#$%^&*|{}[]<>" 
    const randomSymbol = [Math.floor(Math.random() * sym.length)];
    return sym[randomSymbol]
}
