import "normalize.css";
import "./style.css";

const main = <HTMLElement>document.getElementById("main");

function makeCard(skin: string) {
    const card = document.createElement("div");
    card.classList.add("card");

    const card_flex = document.createElement("div");
    card_flex.classList.add("card-flex");

    const img = document.createElement("img");
    img.src = `https://www.gimkit.com/assets/map/characters/skins/${skin}/preview.png`;

    const a = document.createElement("a");
    a.setAttribute("target", "_blank");
    a.textContent = "spritesheet";
    a.href = `https://www.gimkit.com/assets/map/characters/skins/${skin}/spritesheet.png`;

    const span = document.createElement("span");
    span.textContent = skin;

    card_flex.appendChild(img);
    card_flex.appendChild(a);
    card.appendChild(card_flex);
    card.appendChild(span);

    main?.appendChild(card);
}

fetch("/.netlify/functions/list-skins")
    .then((resp) => resp.json())
    .then((skins) => {
        main.textContent = "";
        skins.forEach(makeCard);
    });
