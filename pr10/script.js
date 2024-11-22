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

async function fetchProducts() {
    try {
        const response = await fetch('https://yulchmalan.github.io/jou/pr10/products.json');
        const data = await response.json();
        renderProducts(data.products);
        document.title = data.pageTitle; 
    } catch (error) {
        console.error('Помилка завантаження даних:', error);
    }
}

function renderProducts(products) {
    const articleWrapper = document.querySelector('.article-wrapper');
    articleWrapper.innerHTML = ''; // Очищуємо контейнер перед рендерингом

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('article');

        productCard.innerHTML = `
            <div class="article-header">
                <a href="${product.link}" target="_blank" data-i18n="cardHeader.${product.categoryKey}">
                    ${i18next.t(`cardHeader.${product.categoryKey}`)}
                </a>
            </div>
            <div class="image-box">
                <a href="${product.link}" target="_blank">
                    <img src="${product.image}" alt="${product.name}">
                </a>
            </div>
            <div class="article-bottom-caption">
                <a href="${product.link}" target="_blank" data-i18n="cardTitle.${product.nameKey}">
                    ${i18next.t(`cardTitle.${product.nameKey}`)}
                </a>
            </div>
            <div class="price-box">
                ${product.oldPrice ? `<span class="old-price">${product.oldPrice} грн</span>` : ''}
                <span class="price">
                    <b data-i18n="cardPrice.${product.nameKey}">
                        ${i18next.t(`cardPrice.${product.nameKey}`)}
                    </b>
                </span>
            </div>
            <div class="button ${product.status === 'Незабаром у продажі' ? 'button-inactive' : 'button-active'}">
                <span class="inner-center" data-i18n="${product.status === 'Незабаром у продажі' ? 'comingSoon' : 'addToCart'}">
                    ${i18next.t(product.status === 'Незабаром у продажі' ? 'comingSoon' : 'addToCart')}
                </span>
            </div>
        `;

        articleWrapper.appendChild(productCard);
    });

    setupAddToCartButtons(); 
}


document.addEventListener('DOMContentLoaded', fetchProducts);

document.addEventListener('DOMContentLoaded', () => {
    i18next.init({
        lng: localStorage.getItem('language') || 'ua',
        fallbackLng: 'ua', 
        debug: true,
        resources: {
            en: {
                translation: {
                    "title": "Be sure to add your order",
                    "cartEmpty": "Your cart is empty",
                    "addToCart": "Add to cart",
                    "comingSoon": "Coming soon",
                    "cardHeader": {
                        "os": "Operating Systems",
                        "office": "Office Applications",
                        "server": "Server Software",
                        "multimedia": "Multimedia Programs"
                    },
                    "cardTitle": {
                        "windows10": "Windows 10 Pro",
                        "officeHome": "Microsoft Office Home & Student",
                        "windowsServer": "Microsoft Windows Server",
                        "adobeCloud": "Adobe Creative Cloud"
                    },
                    "cardPrice": {
                        "windows10": "13,299 грн",
                        "officeHome": "4,159 грн",
                        "windowsServer": "47,999 грн",
                        "adobeCloud": "60,282 грн"
                    }
                }
            },
            ua: {
                translation: {
                    "title": "Обов'язково додайте своє замовлення",
                    "cartEmpty": "Корзина пуста",
                    "addToCart": "У корзину",
                    "comingSoon": "Незабаром",
                    "cardHeader": {
                        "os": "Операційні системи",
                        "office": "Офісні програми",
                        "server": "Серверне програмне забезпечення",
                        "multimedia": "Мультимедіа програми"
                    },
                    "cardTitle": {
                        "windows10": "Windows 10 Pro",
                        "officeHome": "Microsoft Office Для дому та навчання",
                        "windowsServer": "Microsoft Windows Server",
                        "adobeCloud": "Adobe Creative Cloud"
                    },
                    "cardPrice": {
                        "windows10": "13,299 грн",
                        "officeHome": "4,159 грн",
                        "windowsServer": "47,999 грн",
                        "adobeCloud": "60,282 грн"
                    }
                }
            }
        }        
    }, (err, t) => {
        if (err) console.error('Помилка i18next:', err);
        updateContent();
        checkLanguageSelection();
    });

    document.getElementById('language-switcher').addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        i18next.changeLanguage(selectedLang, () => {
            localStorage.setItem('language', selectedLang);
            updateContent();
        });
    });    
});

function updateContent() {
    document.querySelector('.page-header').textContent = i18next.t('title');
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        const translation = i18next.t(key);
        if (translation) {
            element.textContent = translation;
        }
    });
}

function checkLanguageSelection() {
    const userLang = localStorage.getItem('language');
    if (!userLang) {
        const modal = document.getElementById('language-modal');
        modal.classList.remove('hidden');

        document.querySelectorAll('.language-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const selectedLang = e.target.dataset.lang;
                i18next.changeLanguage(selectedLang, () => {
                    localStorage.setItem('language', selectedLang);
                    modal.classList.add('hidden');
                    updateContent();
                });
            });
        });
    } else {
        i18next.changeLanguage(userLang, updateContent);
    }
}
