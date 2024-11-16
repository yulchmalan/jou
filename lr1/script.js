let buttons = document.getElementsByClassName('btn');

buttons[0].addEventListener('click', function() {
    alert('Hello, world!');
});

buttons[1].addEventListener('mouseover', function() {
    document.write('<p>Hello, world!</p>');
});

buttons[2].addEventListener('click', function() {
    let userConfirmed = confirm("Hello?");
    if (userConfirmed) {
        document.write("Hello, world!");
    }
});

buttons[3].addEventListener('click', function() {
    let userText = prompt('Write some text');
    if (userText != null && userText.trim() !== '') {
        alert(userText);
    } else {
        alert('Введення не повинно бути порожнім.');
    }
});

buttons[4].addEventListener('mouseover', function() {
    let userText = prompt('Write some text');
    if (userText != null && userText.trim() !== '') {
        alert(userText);
    } else {
        alert('Введення не повинно бути порожнім.');
    }
});

buttons[5].addEventListener('click', function() {
    let firstNum = prompt('Write first number');
    let secondNum = prompt('Write second number');
    if (!isNaN(firstNum) && !isNaN(secondNum) && firstNum.trim() !== '' && secondNum.trim() !== '') {
        alert(Number(firstNum) + Number(secondNum));
    } else {
        alert('Будь ласка, введіть коректні числа.');
    }
});

buttons[6].addEventListener('click', function() {
    let firstNum = prompt('Write first number');
    let secondNum = prompt('Write second number');
    if (!isNaN(firstNum) && !isNaN(secondNum) && firstNum.trim() !== '' && secondNum.trim() !== '') {
        if (Number(firstNum) > Number(secondNum)) {
            alert(firstNum);
        } else if (Number(secondNum) > Number(firstNum)) {
            alert(secondNum);
        } else {
            alert('Числа рівні');
        }
    } else {
        alert('Будь ласка, введіть коректні числа.');
    }
});

buttons[7].addEventListener('click', function() {
    let num = prompt('Введіть номер місяця');
    if (!isNaN(num) && num.trim() !== '') {
        num = Number(num);
        if (num < 1 || num > 12) {
            alert('Введено невірне число.');
        } else if (num >= 3 && num <= 5) {
            alert('То весна');
        } else if (num >= 6 && num <= 8) {
            alert('То літо');
        } else if (num >= 9 && num <= 11) {
            alert('То осінь');
        } else {
            alert('То зима');
        }
    } else {
        alert('Будь ласка, введіть число від 1 до 12.');
    }
});

buttons[8].addEventListener('click', function() {
    let userConfirmed = confirm("Hello?");
    if (userConfirmed) {
        alert("Ок то ок");
    } else {
        alert("Скасувати то скасувати");
    }
});

buttons[9].addEventListener('click', function() {
    let num = prompt('Введіть кількість студентів');
    if (!isNaN(num) && num.trim() !== '' && Number.isInteger(Number(num)) && Number(num) > 0) {
        num = Number(num);
        let students = [];
        for (let i = 1; i <= num; i++) {
            let student = prompt(`Введіть прізвище студента №${i}`);
            if (student != null && student.trim() !== '') {
                students.push(student);
                let p = document.createElement('p');
                p.textContent = student;
                document.body.appendChild(p);
            } else {
                alert('Прізвище не може бути порожнім.');
            }
        }
    } else {
        alert('Будь ласка, введіть коректне ціле число, більше за 0.');
    }
});

buttons[10].addEventListener('click', function() {
    let students = [];
    while (true) {
        let student = prompt('Введіть прізвище');
        if (student == null || student.trim() === '') {
            break;
        }
        students.push(student);
        let p = document.createElement('p');
        p.textContent = student;
        document.body.appendChild(p);
    }
});

buttons[11].addEventListener('click', function() {
    let tableContainer = document.createElement('div');
    document.body.appendChild(tableContainer);
    tableContainer.style.display = "flex";
    tableContainer.style.flexWrap = "wrap";
    tableContainer.style.width = "800px";
    tableContainer.style.margin = "0 auto";

    for (let column = 1; column <= 10; column++) {
        let columnDiv = document.createElement('div');
        columnDiv.style.padding = "10px";
        columnDiv.style.margin = "5px";
        columnDiv.style.border = "3px solid rgb(81, 104, 81)";
        columnDiv.style.width = "150px";

        for (let row = 1; row <= 10; row++) {
            let p = document.createElement('p');
            p.textContent = `${column} * ${row} = ${column * row}`;
            columnDiv.appendChild(p);
        }
        tableContainer.appendChild(columnDiv);
    }
});
