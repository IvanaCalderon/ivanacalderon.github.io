const text = "<Ivana Calderon/>";
const heroTitle = document.querySelector(".hero-title");
let index = 0;

heroTitle.textContent = "";

function typeWriter() {
    if (index < text.length) {
        heroTitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    } else {
        heroTitle.classList.add("done");
    }
}

typeWriter();
