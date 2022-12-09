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
        console.log(Math.round((amountElems - countElems) * flexBasis));

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
            transformX = Math.floor(transformX/flexBasis) * flexBasis;
            popularListInner.style = setAdaptiveTransform(transformX, maxTransformX)
            console.log(maxTransformX);
        })
    })
})();