
/* Рассчёт возраста */

const birthdayInput = document.getElementById('birthday-input');
const rezAge = document.getElementsByClassName('rez-age');
const сalculateAgeBtn = document.getElementById('сalculateAge-btn');

function calculAge() {

    let today = new Date(),
      todayYear = today.getFullYear(),
      todayMonth = today.getMonth() + 1,
      todayDay = today.getDate();

    /* Для разнообразия используем не new Date(birthdayDate), а срезы */
    let birthdayDate = birthdayInput.value,
        birthdayYear = parseInt(birthdayDate.slice(0, 4)),
        birthdayMonth = parseInt(birthdayDate.slice(5, 7)),
        birthdayDay = parseInt(birthdayDate.slice(8, 10));

    let yearOld = todayYear - birthdayYear;
    let monthOld = todayMonth - birthdayMonth;

    if (todayMonth < birthdayMonth || (todayMonth === birthdayMonth && todayDay < birthdayDay)) {
        yearOld--;
        monthOld = 11 + monthOld;        
    }

    rezAge[0].innerText = yearOld;
    rezAge[1].innerText = monthOld;
    rezAge[2].innerText = yearOld * 12 + monthOld;
}

сalculateAgeBtn.onclick = calculAge



/* Теорема Пифагора */

const catheter_1 = document.getElementById('catheter-1');
const catheter_2 = document.getElementById('catheter-2');
const rezPif = document.getElementsByClassName('rez-pif');
const сalculateHypotenuseBtn = document.getElementById('сalculateHypotenuse-btn');

function calculHypotenuse() {

    let numCatheter_1 = parseInt(catheter_1.value),
        numCatheter_2 = parseInt(catheter_2.value);

        rezPif[0].innerText = numCatheter_1 ** 2;
        rezPif[1].innerText = numCatheter_2 ** 2;
        rezPif[2].innerText = parseInt(rezPif[0].innerText) + parseInt(rezPif[1].innerText);
        rezPif[3].innerText = (parseInt(rezPif[2].innerText) ** 0.5).toFixed(2);
}

сalculateHypotenuseBtn.onclick = calculHypotenuse


