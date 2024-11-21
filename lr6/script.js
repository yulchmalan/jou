// Функція порівняння чисел
function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        if (num1 > num2) {
            resolve("Перше число більше.");
        } else if (num1 < num2) {
            resolve("Друге число більше.");
        } else {
            reject("Числа рівні.");
        }
        }, 1000); 
    });
}

document.getElementById("compare-form").addEventListener("submit", function (e) {
    e.preventDefault(); 

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultElement = document.getElementById("result");

    resultElement.textContent = "Думається..."; 

    compareNumbers(num1, num2)
        .then((message) => {
        resultElement.textContent = message; 
        resultElement.style.color = "green";
        })
        .catch((error) => {
        resultElement.textContent = error; 
        resultElement.style.color = "red";
        });
});

function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1; 
}

document.getElementById("start-task").addEventListener("click", function () {
    const promises = [
        new Promise((resolve) => setTimeout(() => resolve(getRandomNumber()), 1000)),
        new Promise((resolve) => setTimeout(() => resolve(getRandomNumber()), 2000)),
        new Promise((resolve) => setTimeout(() => resolve(getRandomNumber()), 3000)),
    ];

    const sumResultElement = document.getElementById("sum-result");
    sumResultElement.textContent = "Думається...";

    Promise.all(promises)
        .then((values) => {
        const sum = values.reduce((total, num) => total + num, 0);
        sumResultElement.textContent = `Проміс виконано: ${values.join(", ")}. Sum: ${sum}`;
        sumResultElement.style.color = "alicewhite";
        })
        .catch(() => {
        sumResultElement.textContent = "Помилка";
        sumResultElement.style.color = "red";
        });
});