let clock, canvas;

function drawClock() {
    let time = new Date();    
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let center = {x: clock.width / 2, y: clock.height / 2};

    hours = hours >= 12 ? hours - 12 : hours;

    canvas.clearRect(0, 0, clock.width, clock.height);
    canvas.lineCap = 'round';
    
    drawArrowMinutes();
    drawArrowHours();
    drawArrowSeconds();
    dialClock();
    requestAnimationFrame(drawClock);

    function dialClock() {
        // Рамка
        canvas.beginPath();
        canvas.lineWidth = 4;
        canvas.arc(center.x, center.y, 140, 0, Math.PI * 2);
        canvas.strokeStyle = 'black';        
        canvas.stroke();

        // Засечки
        canvas.lineWidth = 3;
        for (let i = 0; i < 60; i++) {
            let rad = 135,
                len = 5;
                canvas.strokeStyle = 'rgba(0, 0, 0, 0.50)';
            if (i % 5 === 0) {
                rad -= len;
                len *= 2;
                canvas.strokeStyle = 'rgba(0, 0, 0, 0.75)';
            }
            let angle = Math.PI * 2 * (i / 60) - Math.PI / 2;
            let line = new Line(rad, angle);
            canvas.beginPath();
            canvas.moveTo(line.getX() + center.x, line.getY() + center.y);
            line.setLen(rad + len);
            canvas.lineTo(line.getX() + center.x, line.getY() + center.y);
            canvas.stroke();
        }

        // Цифры
        canvas.font = '26px Noto Sans';
        canvas.strokeStyle = 'black';
        canvas.fillStyle = 'black';
        canvas.textAlign = 'center';
        canvas.textBaseline = 'middle';
        for (let i = 1; i <= 12; i++) {
            let angle = Math.PI * 2 * (i / 12) - Math.PI / 2;
            let line = new Line(113, angle);
            canvas.fillText(i, line.getX() + center.x, line.getY() + center.y);
        }

        // Центральный круг
        canvas.beginPath();
        canvas.arc(center.x, center.y, 5.75, 0, Math.PI * 2);
        canvas.fillStyle = 'red';
        canvas.strokeStyle = 'black';        
        canvas.lineWidth = 2.5;
        canvas.fill();
        canvas.stroke();
    }

    function drawArrowSeconds() {
        canvas.lineWidth = 1.5;
        canvas.strokeStyle = 'red';
        canvas.beginPath();
        let angle = Math.PI * 2 * (seconds / 60) - Math.PI / 2;
        let line = new Line(95, angle);
        let line2 = new Line(-20, angle);
        canvas.moveTo(line2.getX() + center.x, line2.getY() + center.y);
        canvas.lineTo(line.getX() + center.x, line.getY() + center.y);
        canvas.stroke();       
    }

    function drawArrowMinutes() {
        canvas.lineWidth = 4;
        canvas.strokeStyle = 'black';
        canvas.beginPath();
        let angle = Math.PI * 2 * (minutes / 60) - Math.PI / 2;
        let line = new Line(95, angle);
        canvas.moveTo(center.x, center.y);
        canvas.lineTo(line.getX() + center.x, line.getY() + center.y);
        canvas.stroke();
    }

    function drawArrowHours() {
        canvas.lineWidth = 4;
        canvas.strokeStyle = 'black';
        canvas.beginPath();
        let angle = Math.PI * 2 * (hours / 12) - Math.PI / 2;
        let line = new Line(60, angle);
        canvas.moveTo(center.x, center.y);
        canvas.lineTo(line.getX() + center.x, line.getY() + center.y);
        canvas.stroke();
    }
}


function Line (length, angle) {

    this.getX = function () {
        return length * Math.cos(angle);
    };

    this.getY = function () {
        return length * Math.sin(angle);
    };

    this.setLen = function (len) {
        length = len;
    };
}

function init() {
    clock = document.getElementById('clock');
    clock.width = clock.height = 300;
    canvas = clock.getContext('2d');

    requestAnimationFrame(drawClock);
}

init();



// Вызов модального окна и анимация тик-така


$('#showClockBtn').on('click', () => { 
    $('.modal').fadeIn('slow');
})

$('#closeBtn').on('click', () => { 
    $('.modal').fadeOut('slow');
})


setInterval(() => {
    if(new Date(Date.now()).getSeconds() % 2 === 0) {
        $('#tik').animate(
            {   
                opacity: '1'
            }, 450, 'linear', () => {
                $('#tik').attr('style', 'opacity: 0')
            })                 
    } else {        
        $('#tak').animate(
            {   
                opacity: '1'
            }, 450, 'linear', () => {
                $('#tak').attr('style', 'opacity: 0')
            })            
    }
}, 1000);








