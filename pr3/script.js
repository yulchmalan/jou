document.getElementById('checkEmail').addEventListener('click', function() {
    let emailInput = document.getElementById('emailInput').value;
    let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/i;
    let message = emailPattern.test(emailInput) ? "Коректна електронна пошта" : "Некоректна електронна пошта";
    document.getElementById('emailMessage').textContent = message;
});

document.getElementById('findNumbers').addEventListener('click', function() {
    let textInput = document.getElementById('textInput').value;
    let numberPattern = /\d+/g;
    let numbers = textInput.match(numberPattern);
    document.getElementById('numbersMessage').textContent = numbers ? numbers.join(", ") : "Чисел не знайдено";
});

document.getElementById('checkPassword').addEventListener('click', function() {
    let passwordInput = document.getElementById('passwordInput').value;
    let passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*&?])[A-Za-z\d@$!%*&?]{8,}$/;
    let message = passwordPattern.test(passwordInput) ? "Пароль валідний" : "Пароль не валідний";
    document.getElementById('passwordMessage').textContent = message;
});

document.getElementById('replaceDate').addEventListener('click', function () {
    let dateInput = document.getElementById('dateInput').value;
    let datePattern = /\b(\d{2})\/(\d{2})\/(\d{4})\b/g;
    let formattedDate = dateInput.replace(datePattern, (match, day, month, year) => {
        return `${year}-${month}-${day}`;
    });
    document.getElementById('dateMessage').textContent = formattedDate;
});

document.getElementById('checkEmail2').addEventListener('click', function () {
    let emailInput = document.getElementById('emailInput2').value;
    let emailPattern = /\b[A-Za-z\d._%+-]+@[A-Za-z\d.-]+\.[A-Za-z]{2,6}\b/g;

    let foundEmails = emailInput.match(emailPattern);

    if (foundEmails && foundEmails.length > 0) {
        document.getElementById('emailMessage2').textContent = `Знайдені адреси: ${foundEmails.join(', ')}`;
    } else {
        document.getElementById('emailMessage2').textContent = "Жодної валідної адреси не знайдено.";
    }
});