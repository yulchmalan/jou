const date = new Date(2021, 1, 20, 3, 12);
document.getElementById('dateRes').textContent = `Date is: ${date.toLocaleString()}`;

function getWeekDay(date) {
    const weekDays = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return weekDays[date.getDay()]; 
}
document.getElementById('weekDay').textContent = `День тижня: ${getWeekDay(date)}`;

function getLastDayOfMonth(year, month) {
    const date = new Date(year, month + 1, 0); 
    return date.getDate(); 
}

document.getElementById('checkLastDay').addEventListener('click', function () {
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        document.getElementById('result').textContent = "Будь ласка, введіть коректні рік і місяць!";
        return;
    }
    const lastDay = getLastDayOfMonth(year, month-1);
    document.getElementById('result').textContent = `Останній день місяця: ${lastDay}`;
});

function getSecondsToTomorrow() {
    const now = new Date(); 
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); 
    const secondsToTomorrow = Math.floor((tomorrow - now) / 1000); 
    return secondsToTomorrow;
}

function updateSecondsToTomorrow() {
    const secondsResult = document.getElementById('secondsResult');
    const secondsLeft = getSecondsToTomorrow();
    secondsResult.textContent = `До завтра залишилось ${secondsLeft} секунд.`;
}

setInterval(updateSecondsToTomorrow, 1000);

function formatDate(date) {
    const now = new Date();
    const diff = (now - date) / 1000; 

    if (diff < 1) {
        return "прямо зараз";
    } else if (diff < 60) {
        return `${Math.floor(diff)} сек. назад`;
    } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} хв. назад`;
    } else {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()).slice(2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }
}


document.getElementById('checkDate').addEventListener('click', function () {
    const input = document.getElementById('date').value;

    const datePattern = /^(\d{2})\.(\d{2})\.(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
    const match = input.match(datePattern);

    if (!match) {
        document.getElementById('dateResult').textContent = "Будь ласка, введіть дату у форматі DD.MM.YY HH:mm:ss";
        return;
    }

    const [, day, month, year, hours, minutes, seconds] = match;
    const parsedDate = new Date(
        `20${year}`, 
        month - 1,
        day,
        hours,
        minutes,
        seconds
    );

    if (isNaN(parsedDate)) {
        document.getElementById('dateResult').textContent = "Невірна дата!";
        return;
    }

    const formattedDate = formatDate(parsedDate);
    document.getElementById('dateResult').textContent = `Результат: ${formattedDate}`;
});