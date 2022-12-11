(() => {
    const selects = document.querySelectorAll('._select');

    if (!selects.length) return;

    selects.forEach(select => {
        document.addEventListener('click', e => {
            if (select.contains(e.target)) return;

            if (!select.classList.contains('_active')) return;

            select.classList.remove('_active');
        }, true);

        select.onclick = () => select.classList.toggle('_active');

        const selectInput = select.querySelector('._select__input');
        const selectItems = select.querySelectorAll('._select__item');

        selectItems.forEach(selectItem => {
            selectItem.onclick = () => selectInput.value = selectItem.textContent.trim();
        });
    })
})();

(() => {
    function setMaxTransform(amountElems, countElems, flexBasis) {
        return Math.round((amountElems - countElems) * flexBasis);
    }

    function setAdaptiveTransform(transformX, maxTransformX) {
        return transformX <= -maxTransformX ? `--transform-x: ${-maxTransformX}%;` : `--transform-x: ${transformX}%;`;
    }

    const popularProducts = document.querySelectorAll('.popular__products');

    if (!popularProducts.length) return;

    popularProducts.forEach(elem => {
        const leftArrow = elem.querySelector('.popular__arrow');
        const rightArrow = elem.querySelector('.popular__arrow._right');

        const popularListInner = elem.querySelector('.popular__list_inner');
        const popularItems = elem.querySelectorAll('.popular__item');

        let flexBasis = +getComputedStyle(popularItems[0]).flexBasis.slice(0, -1);
        let countSlide = Math.round(100 / flexBasis);
        let maxTransformX = +setMaxTransform(popularItems.length, countSlide, flexBasis);
        let transformX = 0;

        if (maxTransformX <= 0) return;

        leftArrow.onclick = () => {
            if (transformX <= 0) return;

            transformX += +flexBasis;
            transformX = Math.round(transformX * 100) / 100;

            popularListInner.style = `--transform-x: ${transformX}%;`;
        }

        rightArrow.onclick = () => {
            if (transformX <= -maxTransformX) return;

            transformX -= +flexBasis;
            transformX = Math.round(transformX * 100) / 100;

            popularListInner.style = `--transform-x: ${transformX}%;`;
        }

        window.addEventListener('resize', () => {
            flexBasis = +getComputedStyle(popularItems[0]).flexBasis.slice(0, -1);
            countSlide = Math.round(100 / flexBasis);
            maxTransformX = +setMaxTransform(popularItems.length, countSlide, flexBasis);
            transformX = Math.floor(transformX / flexBasis) * flexBasis;
            popularListInner.style = setAdaptiveTransform(transformX, maxTransformX)
        })
    })
})();

(() => {
    const productShopShortInfoCounter = document.querySelectorAll('.product-shop__short-info_counter');

    if (!productShopShortInfoCounter.length) return;

    productShopShortInfoCounter.forEach(elem => {
        const productShopShortInfoDecrement = elem.querySelector('.product-shop__short-info_decrement');
        const productShopShortInfoCount = elem.querySelector('.product-shop__short-info_count');
        const productShopShortInfoIncrement = elem.querySelector('.product-shop__short-info_increment');

        if (!(productShopShortInfoDecrement || productShopShortInfoCount || productShopShortInfoIncrement)) return;

        productShopShortInfoDecrement.onclick = () => {
            if (productShopShortInfoCount.value <= 0) return;

            productShopShortInfoCount.value--;
        }

        productShopShortInfoIncrement.onclick = () => {
            productShopShortInfoCount.value++;
        }
    })
})();

(() => {
    function removeClass(elem, className) {
        if (!elem) return;

        if (!elem.classList.contains(className)) return;

        elem.classList.remove(className);
    }

    function addClass(elem, className) {
        if (!elem) return;

        if (elem.classList.contains(className)) return;

        elem.classList.add(className);
    }

    function removeClassActive(elem) {
        return removeClass(elem, '_active');
    }

    function addClassActive(elem) {
        return addClass(elem, '_active');
    }

    const productShop = document.querySelector('.product-shop');

    if (!productShop) return;

    const productShopInfoSwitchButton = productShop.querySelectorAll('.product-shop__info_switch_button');
    const productShopInfoTextInner = productShop.querySelectorAll('.product-shop__info_text_inner');

    if (!productShopInfoSwitchButton || !productShopInfoTextInner) return;

    let lastClickButton = productShop.querySelector('.product-shop__info_switch_button._active');
    let lastShowText = productShop.querySelector('.product-shop__info_text_inner._active');

    productShopInfoSwitchButton.forEach(button => {
        button.onclick = () => {
            const attribute = button.getAttribute('data-button-type')

            removeClassActive(lastClickButton);
            removeClassActive(lastShowText);

            lastClickButton = button;
            lastShowText = productShop.querySelector(`.product-shop__info_text_inner[data-info-type="${attribute}"]`);

            addClassActive(lastClickButton);
            addClassActive(lastShowText);
        }
    })
})();

(() => {
    const productShopMainImage = document.querySelector('.product-shop__main-image img');
    const productShopImageItemImage = document.querySelectorAll('.product-shop__image_item img');

    if (!(productShopImageItemImage.length || productShopMainImage)) return;

    productShopImageItemImage.forEach(image => {
        image.onclick = function() {
            if (!this.src) return;

            productShopMainImage.src = this.src
        }
    })
})();