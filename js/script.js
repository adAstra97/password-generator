let inputPassword = document.querySelector('#pass');
let statusEl = document.querySelector('.app__pass-status');
let remark = document.querySelector('.length-remark');

let btnGenerate = document.querySelector('#generate');
let btnCopy = document.querySelector('#copy');

let upper = document.querySelector('#uppercase');
let lower = document.querySelector('#lowercase');
let num = document.querySelector('#numbers');
let symbol = document.querySelector('#symbols');

const NUMBERS = '0123456789';
const UPPER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const SYMBOLS = '!@#$%^&*()-_+={}[]|/:;,"<>.?';

btnGenerate.addEventListener('click', () => {
   setTimeout(generatePassword, 300);
});
btnCopy.addEventListener('click', copyPassword);

function generatePassword() {
   let lengthEl = document.querySelector('#length');
   let lengthValue = +lengthEl.value;

   if (lengthValue > 20 || lengthValue < 4) {
      remark.classList.remove('hidden');
      return new Promise((resolve) => {
         document.addEventListener('click', () => {
            remark.classList.add('hidden');
            resolve();
         });
      });
   }

   let strForSearch = getStrFromCheckedInputs();

   if (strForSearch.length === 0) return;

   for (let i = 0; i < lengthValue; i++) {
      inputPassword.value += getRandomSymbol(strForSearch);
   }
}

function getStrFromCheckedInputs() {
   inputPassword.value = '';

   let newStr = '';
   let types = new Map();

   types.set(upper, UPPER_CHARS);
   types.set(lower, LOWER_CHARS);
   types.set(num, NUMBERS);
   types.set(symbol, SYMBOLS);

   for (let type of types.entries()) {
      if (type[0].checked) {
         newStr += type[1];
      }
   }
   return newStr;
}

function getRandomSymbol(str) {
   let index = Math.floor(Math.random() * str.length);
   return str[index];
}

function copyPassword() {
   if (inputPassword.value === '') return;

   navigator.clipboard.writeText(inputPassword.value);

   setTimeout(() => {
      statusEl.classList.remove('hidden');
   }, 200);

   setTimeout(() => {
      statusEl.classList.add('hidden');
   }, 1800);
}
