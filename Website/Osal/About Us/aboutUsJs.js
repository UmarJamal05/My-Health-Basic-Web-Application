function increaseFontSize() {
    // Get the root element (html) font size
    var currentSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);

    // Increase the font size by 1px
    var newSize = currentSize + 1;

    // Set the new font size to the root element
    document.documentElement.style.fontSize = newSize + "px";
}

function decreaseFontSize() {
    // Get the root element (html) font size
    var currentSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);

    // Decrease the font size by 1px
    var newSize = currentSize - 1;

    // Set the new font size to the root element
    document.documentElement.style.fontSize = newSize + "px";
}