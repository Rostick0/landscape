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

function throttle(func, ms) {
    let locked = false;

    return function () {

        if (locked) return;

        const context = this;
        const args = arguments;

        locked = true;

        setTimeout(() => {
            func.apply(context, args);
            locked = false;
        }, ms)
    }
}

function roundCount(count, countRound) {
    return Math.round(count / countRound) * countRound;
}