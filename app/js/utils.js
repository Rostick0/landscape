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