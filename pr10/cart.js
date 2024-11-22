const cartTable = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const backToShopping = document.getElementById('back-to-shopping');
const checkout = document.getElementById('checkout');

function loadCart() {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    cartTable.innerHTML = ''; 
    cartData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price} грн</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" data-index="${index}">
            </td>
            <td>${item.price * item.quantity} грн</td>
            <td><button data-index="${index}" class="delete-item">Видалити</button></td>
        `;
        cartTable.appendChild(row);
    });
    updateTotalPrice(cartData);
} 

function updateTotalPrice(cartData) {
    const total = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = `${total} грн`;
}

cartTable.addEventListener('change', (event) => {
    if (event.target.type === 'number') {
        const index = parseInt(event.target.dataset.index, 10);
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const newQuantity = parseInt(event.target.value, 10);

        if (newQuantity > 0) {
            cartData[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cartData)); 
            loadCart();
        } else {
            alert('Кількість має бути більшою за 0!');
            loadCart();
        }
    }
});

cartTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-item')) {
        const index = parseInt(event.target.dataset.index, 10);
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        cartData.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartData)); 
        loadCart();
    }
});

backToShopping.addEventListener('click', () => {
    window.location.href = 'index.html';
});

checkout.addEventListener('click', () => {
    alert('Оплата успішна! Дякуємо за покупку!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', loadCart);
