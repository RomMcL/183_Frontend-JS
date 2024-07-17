
const textareaInput = document.getElementById('textarea-input'),
      textAnalizatorBtn = document.getElementById('text-analizator-btn'),
      indications = document.getElementsByClassName('indication');


const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
                    '|', '\\', '=', '-', '/', '*', '{', '}', '[', ']', '<', '>', 
                    '?', "\'", '\"', ';', ':', '~', '.', ',', '№'];

const numChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const vowelLetters = ['а', 'у', 'о', 'ы', 'э', 'я', 'ю', 'ё', 'и', 'е'];

const consonantLetters = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н',
                         'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];

const graphicSigns = ['ь', 'ъ'];




/* Всего символов */
function lengthText(text) {
   return text.length;
}

/* Всего слов */
function wordText(text) {
    return text.split(' ').filter(function(n) { return n != '' }).length;
}

/* Спец символы */
function specialCharsCount(text) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
        if (specialChars.includes(text[i])) count++;      
    }
    return count;
}

/* Подсчёт конкретных символов */
function charCount(text, char) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === char) count++;
    }
    return count;
}

/* Разбор текста */
function disassemblyText(text) {

    let countSpec = specialCharsCount(text);
    let verificationCount = 0;
    let typeLetter = {
        'numCount': 0,
        'letterCount': 0,
        'vowelLetterCount': 0,
        'consonantLetterCount': 0,
        'graphicSignsCount': 0,
        'uppercaseCount': 0,
        'lowercasCount': 0,
    }; 

    /* Считаем спецсимволы и чистим от них текст */
    while (countSpec != verificationCount) {
        for (let i = 0; i < text.length; i++) {
            if (specialChars.includes(text[i])) {
                text = text.replace(text[i], '');
                verificationCount++
            }
        }    
    }
    /* Убираем пробелы */
    while (text.includes(' ')) {
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') text = text.replace(text[i], '');            
        } 
    }
    /* Цифры и буквы(гласные, согласные) */
    for(let letter of text){
        if (!isNaN(letter)) {
            text = text.replace(letter, '');
            typeLetter['numCount']++
        } else if (vowelLetters.includes(letter.toLowerCase())) {
            typeLetter['vowelLetterCount']++
            typeLetter['letterCount']++
        } else if (consonantLetters.includes(letter.toLowerCase())) {
            typeLetter['consonantLetterCount']++
            typeLetter['letterCount']++
        } else if (graphicSigns.includes(letter.toLowerCase())) {
            typeLetter['graphicSignsCount']++
            typeLetter['letterCount']++
        }                  
    }
    /* Заглавные и строчные */
    for(let letter of text){
        if (letter === letter.toUpperCase()) typeLetter['uppercaseCount']++
        else typeLetter['lowercasCount']++
    } 

    return typeLetter;
}


function analizationText(text) {
    
    let lengthT = lengthText(text),
        wordT = wordText(text),
        whitespaceT = charCount(text, ' '),
        specialCharsT = specialCharsCount(text),
        disassemblyT = disassemblyText(text);

    indications[0].innerText = lengthT;  
    indications[1].innerText = wordT;
    indications[2].innerText = whitespaceT;
    indications[3].innerText = specialCharsT;
    indications[4].innerText = disassemblyT['numCount'];
    indications[5].innerText = disassemblyT['letterCount'];
    indications[6].innerText = disassemblyT['vowelLetterCount'];
    indications[7].innerText = disassemblyT['consonantLetterCount'];
    indications[8].innerText = disassemblyT['graphicSignsCount'];
    indications[9].innerText = disassemblyT['uppercaseCount'];
    indications[10].innerText = disassemblyT['lowercasCount'];
 
}


textAnalizatorBtn.addEventListener('click', () => analizationText(textareaInput.value));




