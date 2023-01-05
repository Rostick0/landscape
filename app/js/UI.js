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

        const selectInput = select.querySelector('._select__checked');
        const selectItems = select.querySelectorAll('._select__item');

        selectItems.forEach(selectItem => {
            selectItem.onclick = () => selectInput.textContent = selectItem.textContent.trim();
        });
    })
})();

class MySlider {
    constructor(mainBlock, block, items, prev, next) {
        this.mainBlock = mainBlock;
        this.block = block;
        this.items = items;
        this.prev = prev;
        this.next = next;

        this.isCreatedCounter = false;
        this.counterBegin = null;
        this.counterMax = null;
    }

    setMaxTransform(amountElems, countElems, flexBasis) {
        return Math.round((amountElems - countElems) * flexBasis);
    }

    createCounter(begin, max) {
        this.counterBegin = begin;
        this.counterMax = max;

        const beginHtml = this.mainBlock.querySelector(begin);
        const maxHtml = this.mainBlock.querySelector(max);

        if (!beginHtml || !maxHtml) return;

        this.isCreatedCounter = true;
        document.querySelector(this.counterBegin).textContent = 1;
        document.querySelector(this.counterMax).textContent = document.querySelectorAll(this.items).length;
    }

    active() {
        if (!this.mainBlock) return;

        const leftArrow = this.mainBlock.querySelector(this.prev);
        const rightArrow = this.mainBlock.querySelector(this.next);

        const block = this.mainBlock.querySelector(this.block);
        const items = this.mainBlock.querySelectorAll(this.items);

        if (!leftArrow 
            || 
            !rightArrow
            ||
            !block
            ||
            !items
            ) return;

        let flexBasis = +getComputedStyle(items[0]).flexBasis.slice(0, -1);
        let countSlide = Math.round(100 / flexBasis);
        let maxTransformX = +this.setMaxTransform(items.length, countSlide, flexBasis) * -1;
        let transformX = 0;

        if (maxTransformX >= 0) return;

        leftArrow.onclick = () => {
            if (transformX >= 0) return;

            transformX += +flexBasis;
            transformX = Math.round(transformX * 100) / 100;

            block.style = `--transform-x: ${transformX}%;`;

            if (this.isCreatedCounter) {
                document.querySelector(this.counterBegin).textContent--;
            }
        }

        rightArrow.onclick = () => {
            if (Math.round(transformX) <= maxTransformX) return;

            transformX -= +flexBasis;
            transformX = Math.round(transformX * 100) / 100;

            block.style = `--transform-x: ${transformX}%;`;

            if (this.isCreatedCounter) {
                document.querySelector(this.counterBegin).textContent++;
            }
        }
    }
}

(function () {
    const popularProducts = document.querySelectorAll('.popular__products');

    if (!popularProducts.length) return;

    popularProducts.forEach(elem => {
        const slider = new MySlider(elem, '.popular__list_inner', '.popular__item', '.popular__arrow', '.popular__arrow._right')
        slider.active();

        window.addEventListener('resize', () => {
            slider.active();
        })
    })
})();

(function () {
    const reviewsList = document.querySelectorAll('.reviews__list');

    if (!reviewsList.length) return;

    reviewsList.forEach(elem => {
        const slider = new MySlider(elem, '.reviews__list_inner', '.reviews__item', '.reviews__arrow', '.reviews__arrow._right')
        slider.active();
        slider.createCounter('.reviews__counter_start', '.reviews__counter_max')

        window.addEventListener('resize', () => {
            slider.active();
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
        image.onclick = function () {
            if (!this.src) return;

            productShopMainImage.src = this.src
        }
    })
})();

(() => {
    const headerBurgerMenu = document.querySelector('.header__burger-menu');
    const headerContainerFlex = document.querySelector('.header__container_flex');

    if (!headerBurgerMenu) return;

    headerBurgerMenu.onclick = () => {
        headerBurgerMenu.classList.toggle('_active');

        if (headerBurgerMenu.classList.contains('_active')) {
            headerContainerFlex.classList.add('_active');
            document.body.style.overflowY = 'hidden';

            return;
        }

        document.body.style.overflowY = '';

        if (!headerContainerFlex.classList.contains('_active')) return;

        headerContainerFlex.classList.remove('_active');
    }
})();