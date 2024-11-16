document.addEventListener("DOMContentLoaded", function() {
    const farInput = document.getElementById("far");
    const celInput = document.getElementById("cel");

    function fahrenheitToCelsius(far) {
        return (5 / 9) * (far - 32);
    }
    function celsiusToFahrenheit(cel) {
        return (cel * 9 / 5) + 32;
    }

    farInput.addEventListener("input", function() {
        const farValue = parseFloat(farInput.value);
        if (!isNaN(farValue)) {
            const celValue = fahrenheitToCelsius(farValue).toFixed(2);
            celInput.value = celValue;
        } else if (farInput.value.trim() === "") {
            celInput.value = ""; 
        } else {
            celInput.value = "Невірне значення";
        }
    });

    celInput.addEventListener("input", function() {
        const celValue = parseFloat(celInput.value);
        if (!isNaN(celValue)) {
            const farValue = celsiusToFahrenheit(celValue).toFixed(2);
            farInput.value = farValue;
        } else if (celInput.value.trim() === "") {
            farInput.value = ""; 
        } else {
            farInput.value = "Невірне значення";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Ініціалізація змінних
    let correctAnswers = 0; // Лічильник правильних відповідей
    let totalAnswers = 0;   // Загальна кількість відповідей
    let currentTask = {};   // Поточне завдання

    // Функція для генерації нового завдання
    function generateTask() {
        const num1 = Math.floor(Math.random() * 10) + 1; // Число від 1 до 10
        const num2 = Math.floor(Math.random() * 10) + 1; // Число від 1 до 10
        currentTask = {
            num1,
            num2,
            answer: num1 * num2,
        };

        // Показуємо нове завдання
        const taskElement = document.getElementById("task");
        taskElement.textContent = `Скільки буде ${currentTask.num1} × ${currentTask.num2}?`;
        document.getElementById("answer").value = ""; // Очищення поля введення
        document.getElementById("result").textContent = ""; // Очищення результату
    }

    // Функція для перевірки відповіді
    function checkAnswer() {
        const userAnswer = parseInt(document.getElementById("answer").value, 10);
        const resultElement = document.getElementById("result");

        if (isNaN(userAnswer)) {
            resultElement.textContent = "Будь ласка, введіть число.";
            return;
        }

        totalAnswers++;

        if (userAnswer === currentTask.answer) {
            correctAnswers++;
            resultElement.textContent = "Правильно! Молодець!";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = `Неправильно. Правильна відповідь: ${currentTask.answer}`;
            resultElement.style.color = "red";
        }

        updateScore();
    }

    // Функція для оновлення рахунку
    function updateScore() {
        const scoreElement = document.getElementById("score");
        const percentage = totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);
        scoreElement.textContent = `Рахунок: ${percentage}% (${correctAnswers} вірних відповідей з ${totalAnswers})`;
    }

    // Додаємо обробники подій для кнопок
    document.getElementById("checkBtn").addEventListener("click", checkAnswer);
    document.getElementById("nextBtn").addEventListener("click", generateTask);

    // Генеруємо перше завдання при завантаженні сторінки
    generateTask();
});

document.addEventListener("DOMContentLoaded", () => {
    let correctAnswers = 0; // Лічильник правильних відповідей
    let totalAnswers = 0;   // Загальна кількість відповідей
    let currentTask = {};   // Поточне завдання

    // Функція для генерації нового завдання
    function generateTask() {
        const num1 = Math.floor(Math.random() * 10) + 1; // Число від 1 до 10
        const num2 = Math.floor(Math.random() * 10) + 1; // Число від 1 до 10
        const correctAnswer = num1 * num2;

        currentTask = { num1, num2, correctAnswer };

        // Оновлюємо текст завдання
        const taskElement = document.getElementById("task2");
        taskElement.textContent = `Скільки буде ${num1} × ${num2}?`;

        // Генеруємо варіанти відповідей
        generateOptions(correctAnswer);
        document.getElementById("result2").textContent = ""; // Очищення результату
    }

    // Функція для генерації варіантів відповідей
    function generateOptions(correctAnswer) {
        const optionsForm = document.getElementById("options2");
        optionsForm.innerHTML = ""; // Очищуємо попередні варіанти

        // Массив варіантів, включаючи правильний
        const options = new Set();
        options.add(correctAnswer); // Додаємо правильну відповідь

        // Додаємо 3 випадкові неправильні відповіді
        while (options.size < 4) {
            const randomOption = Math.floor(Math.random() * 100) + 1;
            if (randomOption !== correctAnswer) {
                options.add(randomOption);
            }
        }

        // Перетасовуємо варіанти
        const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

        // Додаємо варіанти до форми
        shuffledOptions.forEach((option, index) => {
            const optionId = `option${index}`;
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="answer" value="${option}" id="${optionId}">
                ${option}
            `;
            optionsForm.appendChild(label);
            optionsForm.appendChild(document.createElement("br"));
        });

        // Додаємо обробник для перевірки відповіді
        optionsForm.addEventListener("change", checkAnswer, { once: true });
    }

    // Функція для перевірки відповіді
    function checkAnswer(event) {
        const selectedOption = parseInt(event.target.value, 10);
        const resultElement = document.getElementById("result2");

        totalAnswers++;

        if (selectedOption === currentTask.correctAnswer) {
            correctAnswers++;
            resultElement.textContent = "Правильно! Молодець!";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = `Неправильно. Правильна відповідь: ${currentTask.correctAnswer}`;
            resultElement.style.color = "red";
        }

        updateScore();
        setTimeout(() => generateTask(), 1000); // Генеруємо нове завдання через 1 секунду
    }

    // Функція для оновлення рахунку
    function updateScore() {
        const scoreElement = document.getElementById("score2");
        const percentage = totalAnswers === 0 ? 0 : Math.round((correctAnswers / totalAnswers) * 100);
        scoreElement.textContent = `Рахунок: ${percentage}% (${correctAnswers} вірних відповідей з ${totalAnswers})`;
    }

    // Генеруємо перше завдання при завантаженні сторінки
    generateTask();
});

function initPhotoRotator(containerId, imagesArray) {
    const container = document.getElementById(containerId);

    if (!container || imagesArray.length === 0) return;

    let currentIndex = 0;

    // Створення елементів
    const wrapper = document.createElement('div');
    wrapper.classList.add('rotator-wrapper');

    const header = document.createElement('div');
    header.classList.add('rotator-header');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('rotator-image-container');

    const image = document.createElement('img');
    image.classList.add('rotator-image');

    const title = document.createElement('h3');
    title.classList.add('rotator-title');

    const description = document.createElement('p');
    description.classList.add('rotator-description');

    const backButton = document.createElement('button');
    backButton.classList.add('rotator-button', 'rotator-button-back');
    backButton.textContent = 'Назад';

    const nextButton = document.createElement('button');
    nextButton.classList.add('rotator-button', 'rotator-button-next');
    nextButton.textContent = 'Вперед';

    // Додавання елементів у контейнер
    container.appendChild(wrapper);
    wrapper.appendChild(header);
    wrapper.appendChild(imageContainer);
    imageContainer.appendChild(image);
    wrapper.appendChild(title);
    wrapper.appendChild(description);
    imageContainer.appendChild(backButton);
    imageContainer.appendChild(nextButton);

    // Функція оновлення зображення
    function updateImage() {
        const currentImage = imagesArray[currentIndex];
        image.src = currentImage.path;
        title.textContent = currentImage.title;
        description.textContent = currentImage.description;
        header.textContent = `Зображення ${currentIndex + 1} з ${imagesArray.length}`;

        // Перевірка кнопок
        backButton.style.display = currentIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentIndex === imagesArray.length - 1 ? 'none' : 'block';
    }

    // Обробники подій для кнопок
    backButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateImage();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < imagesArray.length - 1) {
            currentIndex++;
            updateImage();
        }
    });

    // Ініціалізація першого зображення
    updateImage();
}

// Дані для ротатора
let imagesArray = [
    { path: 'images/001.jpg', title: 'Xiaomi', description: 'SE 4/128GB' },
    { path: 'images/002.webp', title: 'Lenovo', description: 'M11 4/128GB' },
    { path: 'images/003.jpg', title: 'Samsung', description: 'Galaxy Tab A9+ 5G 4/64GB' }
];

// Виклик функції
initPhotoRotator('rotator', imagesArray);


