export function typeText(elementId, text, speed = 100) {
    let charIndex = 0;
    const element = document.getElementById(elementId);
    if (!element) return console.error(`Element with ID "${elementId}" not found`);

    function typeEffect() {
        if (charIndex < text.length) {
            element.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, speed);
        }
    }
    element.textContent = ""
    typeEffect();
}