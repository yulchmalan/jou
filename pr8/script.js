let cart = [];
const cartIcon = document.getElementById('cart-icon');
const cartItemsCount = document.getElementById('cart-items-count');
const modal = document.getElementById('modal');
const modalContent = modal.querySelector('.modal-content');

function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    } else {
        cart = [];
    }
    updateCartCount(); 
}

function updateCartCount() {
    cartItemsCount.textContent = cart.length;
}

function addToCart(productName, productPrice) {
    const quantity = parseInt(prompt(`Вкажіть кількість для "${productName}":`, 1), 10);
    if (!quantity || quantity <= 0) {
        alert('Невірна кількість!');
        return;
    }

    const existingProduct = cart.find((item) => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity });
    }

    saveCart(); 
    alert('Товар додано до корзини!');
    updateCartCount();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

cartIcon.addEventListener('click', () => {
    if (cart.length === 0) {
        modal.classList.remove('hidden');
        modalContent.querySelector('p').textContent = 'Корзина пуста';
    } else {
        window.location.href = 'cart.html';
    }
});

modalContent.querySelector('button').addEventListener('click', () => {
    modal.classList.add('hidden');
});

document.querySelectorAll('.button-active').forEach((button) => {
    button.addEventListener('click', () => {
        const productName = button.closest('.article').querySelector('.article-bottom-caption a').textContent.trim();
        const productPrice = parseFloat(button.closest('.article').querySelector('.price b').textContent);
        addToCart(productName, productPrice);
    });
});

document.addEventListener('DOMContentLoaded', loadCart);
