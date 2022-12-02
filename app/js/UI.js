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