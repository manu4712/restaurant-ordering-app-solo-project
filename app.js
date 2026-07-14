import menuArr from "./data.js";
const section1 = document.getElementById("sec-1");
const itemsContainer = document.getElementById("items-container");

const totalPrice = document.getElementById("total-price");
const orderBtn = document.getElementById("order-btn");
// section-1
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
      <p class="item-price">$${item.price}</p>
    </div>
    <div class="add-btn-container">
      <button  data-item = ${item.id}>➕</button>
    </div>
</div>
  `;
  })
  .join("");

section1.setHTMLUnsafe(sec1Html);

// section-2
let cart = [];
document.addEventListener("click", function (e) {
  menuArr.forEach((item) => {
    if (Number(e.target.dataset.item) === item.id && item.hasAdded === false) {
      item.hasAdded = !item.hasAdded;
      cart.push(item);
    }
  });

  renderOrder();
  updateOrderButton();

  if (e.target.dataset.rmid) {
    const id = Number(e.target.dataset.rmid);
    const index = cart.findIndex((item) => item.id === id);

    if (index !== -1) {
      cart[index].hasAdded = false;
      cart.splice(index, 1);
    }
    renderOrder();
    updateOrderButton();
  }

  if (e.target.dataset.order) {
    document.getElementById("modal-card").style.display = "flex";
  }

  if (e.target.dataset.pay) {
    e.preventDefault();
    document.getElementById("modal-card").style.display = "none";
    document.getElementById("sec-2").innerHTML =
      `Thanks,${document.getElementById("username").value}! Your order is on its way!`;
    document.getElementById("sec-2").classList.add("final-state");
  }
});

function renderOrder() {
  let html = "";
  let total = 0;
  cart.forEach((itemObj) => {
    html += `
       
          <div class="item-checkout-details">
                        <p class="item-name">${itemObj.name}</p>
                        <button class="rm-btn" data-rmid = ${itemObj.id}>remove</button>
                        <div class="item-price">
                            <p>$${itemObj.price}</p>
                        </div>
          </div>
      
      `;
    total += itemObj.price;
  });

  itemsContainer.innerHTML = html;
  totalPrice.innerText = `$${total}`;
}

function updateOrderButton() {
  orderBtn.disabled = cart.length === 0;
}
