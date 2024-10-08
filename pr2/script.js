let buttons = document.getElementsByClassName('btn');

buttons[0].addEventListener('click', zavd1);
buttons[1].addEventListener('click', zavd2);
buttons[2].addEventListener('click', zavd5);
buttons[3].addEventListener('click', getTotalSales);

//Завдання 1
let products = [
    {name: "Олія", category: "Бакалія", price: 50.50, inStock: 20,},
    {name: "Банани(уп.)", category: "Фрукти", price: 67.90, inStock: 10,},
    {name: "Кава", category: "Бакалія", price: 90.50, inStock: 0,},
    {name: "Газета", category: "Журнали", price: 20.99, inStock: 5,},
];

function zavd1() {
    displayProducts();
    getAvailableProducts();
    findProductByName();
}

function displayProducts() {
    const container = document.getElementById('results');
    container.innerHTML = "";
    products.forEach(product => {
        let p = document.createElement('p');
        p.textContent = `Назва: ${product.name}, Категорія: ${product.category}, Ціна: ${product.price}, Кількість: ${product.inStock}`;
        container.appendChild(p);
        let br = document.createElement('br');
        container.appendChild(br); 
    });
}

function getAvailableProducts() {
    const container = document.getElementById('results');
    //Заголовок
    let heading = document.createElement('h3');
    heading.textContent = "Продукти в наявності:";
    container.appendChild(heading);
    let br = document.createElement('br');
    container.appendChild(br); 
    //Перечислення
    let filteredProducts = products.filter(product => product.inStock > 0)
    filteredProducts.forEach(product => {
        let p = document.createElement('p');
        p.textContent = `Назва: ${product.name}, Категорія: ${product.category}, Ціна: ${product.price}, Кількість: ${product.inStock}`;
        container.appendChild(p);
        let br = document.createElement('br');
        container.appendChild(br); 
    });
}

function findProductByName() {
    const container = document.getElementById('results');
    let name = prompt('Введіть назву продукту, який шукаєте: ');
    let product = products.find(product => product.name === name);
    if (product !== undefined) {
        let heading = document.createElement('h3');
        heading.textContent = "Результат пошуку:";
        container.appendChild(heading);
        let br = document.createElement('br');
        container.appendChild(br); 
        let p = document.createElement('p');
        p.textContent = `Назва: ${product.name}, Категорія: ${product.category}, Ціна: ${product.price}, Кількість: ${product.inStock}`;
        container.appendChild(p);
    }
}

//ЗАвдання 2
let students = [
    {name: "Петрушкевич", age: 17, grade: 9, group: "ПІ-23",},
    {name: "Вошкевич", age: 18, grade: 10, group: "ПІ-22",},
    {name: "Гарбуз", age: 17, grade: 12, group: "ПІ-23",},
    {name: "Пиріг", age: 19, grade: 8, group: "ПІ-21",},
    {name: "Непиріг", age: 19, grade: 9, group: "ПІ-21",},
];

function zavd2() {
    displayStudents();
    groupBy();
    sortStudentsByGrade();
}

function displayStudents() {
    const container = document.getElementById('results');
    container.innerHTML = "";
    students.forEach(student => {
        let p = document.createElement('p');
        p.textContent = `Ім'я: ${student.name}, Вік: ${student.age}, Оцінка: ${student.grade}, Група: ${student.group}`;
        container.appendChild(p);
        let br = document.createElement('br');
        container.appendChild(br); 
    });
}

function groupBy() {
    const container = document.getElementById('results');
    let groupedStudents = students.reduce((acc, student) => {
        if(!acc[student.group]) {
            acc[student.group] = [];
        }
        acc[student.group].push(student);
        return acc;
    }, {});
    //display
    for (const group in groupedStudents) {
        let p = document.createElement('p');
        p.textContent = `Група: ${group}`;
        container.appendChild(p);

        groupedStudents[group].forEach(student => {
            let p = document.createElement('p');
            p.textContent = `Ім'я: ${student.name}, Вік: ${student.age}, Оцінка: ${student.grade}, Група: ${student.group}`;
            container.appendChild(p);
            let br = document.createElement('br');
            container.appendChild(br);
        });
    }
}

function sortStudentsByGrade() {
    const container = document.getElementById('results');
    sortedStudents = students.sort((a, b) => b.grade - a.grade);
    //Заголовок
    let heading = document.createElement('h3');
    heading.textContent = "Відсортовані студенти:";
    container.appendChild(heading);
    let br = document.createElement('br');
    container.appendChild(br); 
    //Перечислення
    sortedStudents.forEach(student => {
        let p = document.createElement('p');
        p.textContent = `Ім'я: ${student.name}, Вік: ${student.age}, Оцінка: ${student.grade}, Група: ${student.group}`;
        container.appendChild(p);
        let br = document.createElement('br');
        container.appendChild(br); 
    });
}

//Завдання 5
let orders = [
    {orderId: 1, customer: {name: "Петрушкевич", email:"petruskevich@gmail.com"}, items: ["подушка", "ковдра", "простирадло"], total: 5000},
    {orderId: 2, customer: {name: "Машуковський", email:"jahochuspaty@gmail.com"}, items: ["кіт сірко", "пес патрон"], total: 500},
    {orderId: 3, customer: {name: "Кондратенко", email:"mashenka@gmail.com"}, items: ["апельсини", "ківі"], total: 200},
    {orderId: 4, customer: {name: "Машуковський", email:"vedmedi@gmail.com"}, items: ["окуляри", "чай"], total: 600},
    {orderId: 5, customer: {name: "Нечуй", email:"levytskii@gmail.com"}, items: ["теж апельсини", "теж ківі"], total: 300},
];

function zavd5(){
    displayOrders();
    getTotalSpentByCustomer();
}

function displayOrders() {
    const container = document.getElementById('results');
    container.innerHTML = "";
    orders.forEach(order => {
        let p = document.createElement('p');
        p.textContent = `ID: ${order.orderId}, ім'я замовника: ${order.customer.name}, пошта замовника: ${order.customer.email}, товари: ${order.items.join(", ")}, сума: ${order.total}, `
        container.appendChild(p);
        let br = document.createElement('br');
        container.appendChild(br); 
    });
}

function getTotalSpentByCustomer() {
    const container = document.getElementById('results');
    let nameCus = prompt("Введіть ім'я клієнта");
    let res = orders.filter(order => order.customer.name === nameCus)
    .reduce((acc, order) => acc + order.total, 0);
    //Заголовок
    let p = document.createElement('p');
    p.textContent = `Загальна сума замовлень клієнта ${nameCus} = ${res}`;
    container.appendChild(p);
    let br = document.createElement('br');
    container.appendChild(br); 
}

//Завдання 6
let products2 = [
    {productId: 1, name: "Олія", price: 60},
    {productId: 2, name: "Кава", price: 90},
    {productId: 3, name: "Чай", price: 60},
    {productId: 4, name: "Молоко", price: 45},
    {productId: 5, name: "Дзбан", price: 100},
];

let purchases = [
    {purchaseId: 1, productId: 1, quantity: 4},
    {purchaseId: 2, productId: 2, quantity: 2},
    {purchaseId: 3, productId: 3, quantity: 3},
    {purchaseId: 4, productId: 4, quantity: 1},
    {purchaseId: 5, productId: 5, quantity: 1},
];

function getTotalSales() {
    const container = document.getElementById('results');
    container.innerHTML = "";
    let res = purchases.reduce((acc, purchase) => {
        const product = products2.find(p => p.productId === purchase.productId);
        const total = product.price * purchase.quantity;
        if (acc[product.name]) {
            acc[product.name] += total;
        } else {
            acc[product.name] = total;
        }
        return acc;
    }, {});

    Object.keys(res).forEach(productName => {
        let p = document.createElement('p');
        p.textContent = `Назва: ${productName}, Прибуток: ${res[productName]}`;
        container.appendChild(p);
        let br = document.createElement('br');
        container.appendChild(br);
    });
}
