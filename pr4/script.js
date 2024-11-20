function formatTime(value) {
    return value < 10 ? '0' + value : value;
}

let startTime = new Date(); 

function time() {
    let currentTime = new Date();
    let hours = formatTime(currentTime.getHours());
    let minutes = formatTime(currentTime.getMinutes());
    let seconds = formatTime(currentTime.getSeconds());

    document.getElementById('chas').value = `${hours}:${minutes}:${seconds}`;

    let elapsedSeconds = Math.floor((currentTime - startTime) / 1000); 
    if (elapsedSeconds > 0 && elapsedSeconds % 60 === 0) {
        alert('Пройшла ще одна хвилина!');
    }

    setTimeout(time, 1000);
}

time();

document.getElementById('startTyping').addEventListener('click', function () {
    const textInput = document.getElementById('druk').value; 
    const resultElement = document.getElementById('result'); 
    resultElement.textContent = ''; 

    let index = 0; 
    const typingInterval = 100; 

    const typeEffect = setInterval(() => {
        if (index < textInput.length) {
            resultElement.textContent += textInput[index]; 
            index++; 
        } else {
            clearInterval(typeEffect); 
        }
    }, typingInterval);
});

document.getElementById('gambleCheck').addEventListener('click', function () {
    const gambleAmount = parseFloat(document.getElementById('gamble').value); 
    const resultElement = document.getElementById('gambleResult'); 
    if (isNaN(gambleAmount) || gambleAmount <= 0) {
        resultElement.textContent = "Будь ласка, введіть коректну суму ставки!";
        return;
    }
    resultElement.textContent = "Очікуємо результат...";
    const randomNumber = Math.floor(Math.random() * 11) - 5;
    setTimeout(() => {
        if (randomNumber <= 0) {
            resultElement.textContent = `Випало число ${randomNumber}. Ви не вгадали зі своєю ставкою.`;
        } else {
            const winnings = gambleAmount * randomNumber;
            resultElement.textContent = `Випало число ${randomNumber}. Ви виграли ${winnings} гривень!`;
        }
    }, 1000);
});

