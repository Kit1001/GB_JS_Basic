"use strict";

const basketItemsCounter = document.querySelector('#basket-counter');
basketItemsCounter.textContent = '0';
const basketTotalValue = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketEl = document.querySelector('.basket');


document.querySelector('.cartIconWrap').addEventListener('click',
    () => {
    basketEl.classList.toggle('hidden')
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click',
        event => {

    if (event.target.closest('button')?.innerText == 'Add to Cart') {
        const featuredItem = event.target.closest('.featuredItem')
        const name = featuredItem.querySelector('.featuredName')
            .innerText
        const price = Number.parseFloat(featuredItem
            .querySelector('.featuredPrice').innerText.slice(1))
        addToCart(name, price);
    }
});

function addToCart(name, price){
    if (!(name in basket)){
        basket[name] = {price, count: 0};
    }
    basket[name].count++;
    basketItemsCounter.textContent = getBasketItemsCount().toString();
    basketTotalValue.textContent = getTotalBasketValue().toFixed(2);
    renderProductInBasket(name);
}

function getBasketItemsCount() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketValue() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(name) {
    const basketRowEl = basketEl
        .querySelector(`.basketRow[data-name="${name}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(name);
    } else {
        basketRowEl.querySelector('.productCount').textContent =
            basket[name].count;
        basketRowEl.querySelector('.productTotalRow').textContent =
            (basket[name].count * basket[name].price).toFixed(2)
    }

}

function renderNewProductInBasket(productName){
    const productRow = `
        <div class="basketRow" data-name="${productName}">
            <div>${productName}</div>
            <div>
                <span class="productCount">${basket[productName].count}</span> шт.
            </div>
            <div>$${basket[productName].price}</div>
            <div>
                $<span class="productTotalRow">${basket[productName].price * basket[productName].count}</span>
            </div>
        </div>
    `;
    basketTotalEl.insertAdjacentHTML('beforebegin', productRow)
}