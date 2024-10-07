// let book = {
//     title: "Harry Potter",
//     author: "J.K. Rowling",
//     year: 1997,
//     isRead: true,

//     bookInfo(){
//         console.log(`Навза: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`)
//     }
// };
// book.isRead = !book.isRead;
// book.bookInfo();

let library = [
    {title: "Harry Potter", author: "J.K. Rowling", year: 1997, isRead: false,},
    {title: "Sympathizer", author: "V. T. Nguyen", year: 2015, isRead: false,},
    {title: "Vegetarian", author: "Htos Tam", year: 2017, isRead: true,},
];

function displayLibrary() {
    library.forEach(book => {
        console.log(`Навза: ${book.title}, Автор: ${book.author}, Рік видання: ${book.year}, Прочитана: ${book.isRead ? "Так" : "Ні"}`)     
    })
};

displayLibrary();

library.push({title: "Chemistry of death", author: "Simon Beckett", year: 2013, isRead: true,})

displayLibrary();

library.sort((a, b) => a.year - b.year);
console.log("Відсортовані книги за роком видання: ", library)

let unreadBooks = library.filter(book => !book.isRead);
console.log("Непрочитані книги: ", unreadBooks);

let beckettBooks = library.find(book => book.author === "Simon Beckett");
console.log("Книги Бекетта: ", beckettBooks);

function addBookToLibrary() {
    let title = prompt("Введіть назву книги:");
    let author = prompt("Введіть автора книги:");
    let year = prompt("Введіть рік видання книги:");
    let isRead = confirm("Чи прочитана книга?");
    
    library.push({title, author, year, isRead});
    displayLibrary();
}

// addBookToLibrary();


function calculateAverageYear() {
    
}

function printLibrary() {
    const container = document.getElementById('results');
    container.innerHTML = "";
    library.forEach(book => {
        let p = document.createElement('p');
        p.textContent = `Навза: ${book.title}, Автор: ${book.author}, Рік видання: ${book.year}, Прочитана: ${book.isRead ? "Так" : "Ні"}`;
        container.appendChild(p);
        let br = document.createElement('br');
        container.appendChild(br);       
    });
}

function calculateAverageYear() {
    //прибрати, як вже існує
    const average_p = document.getElementById('average');
    if (average_p) {
        average_p.remove();
    }

    const container = document.getElementById('results');
    //обчислення
    var sum = 0;
    let avg;
    library.forEach(book => {
        sum += book.year;
    });
    avg = sum/library.length;

    //вивід
    let p = document.createElement('p');
    p.textContent = `Середній рік видання: ${avg.toFixed(0)}`;
    container.appendChild(p);
    p.setAttribute('id', 'average');    
}

function markAsRead() {
    let title = prompt("Введіь назву книги, яку хочете відмітити прочитаною:");
    let book = library.find(book => book.title === title);
    if (book !==undefined){
        book.isRead = true;
        printLibrary();
    } else {
        alert('Нема такої книжки');
    }
}

function clearResults() {
    const container = document.getElementById('results');
    container.innerHTML = "";
}

/* ІНДИВІДУАЛЬНЕ */

let exercises = [
    {name: "Lunges", sets: 3, reps: 15, "muscle group": "glutes", isDone: true,},
    {name: "Pushups", sets: 2, reps: 10, "muscle group": "arms", isDone: true,},
    {name: "Squats", sets: 3, reps: 20, "muscle group": "hips", isDone: false,},
    {name: "Dumbbell rows", sets: 2, reps: 15, "muscle group": "upper body", isDone: false,},
];

function printExercises() {
    const container = document.getElementById('results');
    container.innerHTML = "";
    exercises.forEach(exercise => {
        let p = document.createElement('p');
        p.textContent = `Навза: ${exercise.name}, Кількість підходів: ${exercise.sets}, Кількість повторювань: ${exercise.reps}, Група м'язів: ${exercise["muscle group"]}, Виконана: ${exercise.isDone ? "Так" : "Ні"}`;
        container.appendChild(p);
        let br = document.createElement('br');
        container.appendChild(br);       
    });
}

function addExercise() {
    let name = prompt("Введіть назву вправи:");
    let sets = +prompt("Введіть кількість підходів:");
    let reps = +prompt("Введіть кількість повторювань:");
    let muscle = prompt("Введіть групу м'язів:");
    let isDone = confirm("Чи виконана вправа?");
    
    exercises.push({name, sets, reps, muscle, isDone});
    printExercises();
}

function markAsDone() {
    let name = prompt("Введіь назву вправи, яку хочете відмітити виконаною:");
    let exercise = exercises.find(exercise => exercise.name === name);
    if (exercise !==undefined){
        exercise.isDone = true;
        printExercises();
    } else {
        alert('Нема такої вправи');
    }
}

function calculateAverageReps() {
    //прибрати, як вже існує
    const average_p = document.getElementById('average');
    if (average_p) {
        average_p.remove();
    }

    const container = document.getElementById('results');
    //обчислення
    var sum = 0;
    let avg;
    exercises.forEach(exercise => {
        sum += exercise.sets*exercise.reps;
    });
    avg = sum/exercises.length;

    //вивід
    let p = document.createElement('p');
    p.textContent = `Середня кількість повторень: ${avg.toFixed(0)}`;
    container.appendChild(p);
    p.setAttribute('id', 'average');    
}

let buttons = document.getElementsByClassName('btn');

buttons[0].addEventListener('click', clearResults);
buttons[1].addEventListener('click', printLibrary);
buttons[2].addEventListener('click', markAsRead);
buttons[3].addEventListener('click', calculateAverageYear);
buttons[4].addEventListener('click', printExercises);
buttons[5].addEventListener('click', addExercise);
buttons[6].addEventListener('click', markAsDone);
buttons[7].addEventListener('click', calculateAverageReps);



