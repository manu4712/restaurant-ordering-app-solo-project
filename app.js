import menuArr from "./data.js";
const section1 = document.getElementById("sec-1");

let sec1Html = menuArr
  .map((item, index) => {
    return `
  <div class="item-info item-${index + 1}">
    <div>
      <span class="emoji">${item.emoji}</span>
    </div>
    <div>
      <h2 class="item-title">${item.name}</h2>
      <p class="item-desc">${item.ingredients.join()}</p>
      <p>$${item.price}</p>
    </div>
    <div class="add-btn-container">
      <button type="submit">➕</button>
    </div>
</div>
  `;
  })
  .join("");

section1.setHTMLUnsafe(sec1Html);
