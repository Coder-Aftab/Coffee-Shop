import { data } from "./data.js";

const res = document.querySelector(".root");

const _arr = [];
class Shop {
  constructor() {}

  addOrder(obj) {
    _arr.push(obj);
  }
  showDetails() {
    return _arr;
  }
}

class User extends Shop {
  constructor() {
    super();
  }
  addProd(prod, ...addOn) {
    const obj = {
      prod,
      addOn,
    };
    super.addOrder(obj);
  }
}

class Coffee {
  constructor(prod, addOn, qty) {
    this.coffee = { prod, addOn, qty };
  }
  Espresso() {}

  Cappuccino() {
    this.la.cream = cream;
    this.la.amount += 125;
  }
  Latte() {
    this.la.latte = latte;
    this.la.amount += 150;
  }
  addQty(val) {
    this.es.qty = this.es.qty + val;
  }
  resetQty(val) {
    this.es.qty = val;
  }
}

const newUser = new User();

newUser.addProd("Es", "Milk", "Latte");

newUser.addProd("Cap", "Milk", "Latte");
const orderDetails = newUser.showDetails();

console.log(orderDetails);
const showDom = orderDetails.reduce((acc, cur) => {
  acc += `<span style='font-weight:bold'>${cur["prod"]}</span>
          ${cur["addOn"]}
          `;
  return acc;
}, ``);

// Cards

const card = document.querySelector(".product--card");

const CardItems = data.map((item) => {
  const node = document.createElement("section");
  node.innerHTML = `
  <section class="card card--col card--secondary card--outline">
    <img class="card__img" src=${item.img} alt="espresso">
    <div class="addOn addOn--primary addOn--label"  id=${item.id}>
      <header class="addOn__header">
        <h3 class="addOn__heading">Milk<span> + $${item.milk}</span></h3>
      </header>
     <button class="icon icon--small toggle-switch-of" value="milk"></button>
    </div>
    <div class="addOn addOn--primary addOn--label" id=${item.id}>
      <header class="addOn__header">
        <h3 class="addOn__heading">Cream<span> + $${item.cream}</span></h3>
      </header>
      <button class="icon icon--small toggle-switch-of" value="cream"></button>
    </div>
    <div class="addOn addOn--primary addOn--label" id=${item.id}>
      <header class="addOn__header">
        <h3 class="addOn__heading">Latte<span> + $${item.latte}</span></h3>
      </header>
     <button class="icon icon--small toggle-switch-of" value="latte"></button>
    </div>
    <div class="addOn__grid">
      <div class="addOn addOn--primary" id=${item.id}>
        <h3 class="addOn__heading">QTY</h3>
        <button class="btn btn--primary qty-btn" type="button" value='-'>-</button>
        <span class="qty">1</span><button class="btn btn--primary qty-btn" type="button" value='+'>+</button>
      </div>
      <button class="addOn addOn--tertiary addOn__cart-btn" id=${item.id}>Add To Cart
      </button>
    </div>
  </section>`;
  return node;
});

CardItems.forEach((section) => {
  card.appendChild(section);
});

const addToCartBtns = document.querySelectorAll(".addOn__cart-btn");
const qtys = document.querySelectorAll(".qty");
const qtyBtns = document.querySelectorAll(".qty-btn");
qtyBtns.forEach((qtyBtn) => {
  qtyBtn.onclick = (e) => {
    if (e.target.parentElement.id == 1) {
      handleEspresso(e);
    }
    if (e.target.parentElement.id == 2) {
      handleCappuccino(e);
    }
    if (e.target.parentElement.id == 3) {
      handleLatte(e);
    }
  };
});

function handleEspresso(e) {
  if (e.target.innerHTML == "+") {
    qtys[0].innerText = Number(qtys[0].innerText) + 1;
  } else if (e.target.innerHTML == "-") {
    if (qtys[0].innerText == "1") return;
    qtys[0].innerText = Number(qtys[0].innerText) - 1;
  }
}

function handleCappuccino(e) {
  if (e.target.innerHTML == "+") {
    qtys[1].innerText = Number(qtys[1].innerText) + 1;
  } else if (e.target.innerHTML == "-") {
    if (qtys[1].innerText == "1") return;
    qtys[1].innerText = Number(qtys[1].innerText) - 1;
  }
}
function handleLatte(e) {
  if (e.target.innerHTML == "+") {
    qtys[2].innerText = Number(qtys[2].innerText) + 1;
  } else if (e.target.innerHTML == "-") {
    if (qtys[2].innerText == "1") return;
    qtys[2].innerText = Number(qtys[2].innerText) - 1;
  }
}

addToCartBtns.forEach((btn) => {
  btn.onclick = (e) => {
    handleAddToCart(e);
  };
});

let BillDetails = [];

function handleAddToCart(e) {
  const currentEvent = e.target;
  console.log(qtys[currentEvent.id-1]);
  const newItem = {
    id: Date.now(),
    parentId: currentEvent.id,
    milk: false,
    cream:false,
    latte: false,
    qty:Number(qtys[currentEvent.id-1].innerText)
  }
  console.log(newItem)
}



card.addEventListener("click", handleCard);

function handleCard(e) {
  if (e.target.classList.contains("toggle-switch-of")) {
    const value = e.target.value;
    console.log(e.target.parentElement.id);
    handleSwitch(e, value, e.target.parentElement.id);
  }
}

function handleSwitch(e, value, id) {
  if ((value == "milk" || value == "cream" || value == "latte") && id == 1) {
    e.target.classList.toggle("toggle-switch-on");
  } else if (
    (value == "milk" || value == "cream" || value == "latte") &&
    id == 2
  ) {
    e.target.classList.toggle("toggle-switch-on");
  } else if (
    (value == "milk" || value == "cream" || value == "latte") &&
    id == 3
  ) {
    e.target.classList.toggle("toggle-switch-on");
  }
}
