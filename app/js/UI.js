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

(function () {
    const popularProduct = document.querySelector('.popular__list');

    if (!popularProduct) return;

    new Swiper(popularProduct, {
        slidesPerView: 1,
        navigation: {
            nextEl: ".popular__arrow._right",
            prevEl: ".popular__arrow._left"
        },
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            1366: {
                slidesPerView: 3
            }
        }
    });
})();

(function () {
    const review = document.querySelector('.reviews__list');

    if (!review) return;

    new Swiper('.reviews__list', {
        slidesPerView: 1,
        pagination: {
            el: ".reviews__counter",
            type: "fraction",
        },
        navigation: {
            nextEl: ".reviews__arrow._right",
            prevEl: ".reviews__arrow._left",
        },
        breakpoints: {
            1024: {
                slidesPerView: 2
            }
        }
    });
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

(() => {
    const advantages = document.querySelector('.advantages');

    if (!advantages) return;

    const advantagesText1 = document.querySelector('.advantages__text._1');
    const advantagesText2 = document.querySelector('.advantages__text._2');
    const advantagesText3 = document.querySelector('.advantages__text._3');
    const advantagesText4 = document.querySelector('.advantages__text._4');

    document.addEventListener('scroll', throttle(e => {
        const top = advantages.getBoundingClientRect().top;
        //console.log(document.body.clientWidth)
        const floor = Math.floor(document.body.clientWidth / 4);

        if (top < -1000
            ||
            top > 1000) return;

        console.log(roundCount(floor * -0.75, 100))

        if (roundCount(top, 100) == roundCount(floor * 1, 100)) {
            addClassActive(advantagesText1);
            removeClassActive(advantagesText2);
        }

        if (roundCount(top, 100) == roundCount(floor * 0.75, 100)) {
            addClassActive(advantagesText2);
            removeClassActive(advantagesText1);
            removeClassActive(advantagesText3);
        }

        if (roundCount(top, 100) == roundCount(floor * 0, 100)) {
            addClassActive(advantagesText3);
            removeClassActive(advantagesText2);
            removeClassActive(advantagesText4);
        }

        if (roundCount(top, 100) == roundCount(floor * -0.75, 100)) {
            addClassActive(advantagesText4);
            removeClassActive(advantagesText3);
        }

        //console.log(top)


    }, 50))

    // throttle(() => {
    //     document.addEventListener('scroll', () => {
    //         console.log(5)
    //     })
    // }, 1000)
})();