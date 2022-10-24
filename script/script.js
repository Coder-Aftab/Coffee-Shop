import { data } from "./data.js";

// Cards

const card = document.querySelector(".product--card");

const CardItems = data.map((item) => {
  const node = document.createElement("section");
  node.innerHTML = `
  <form class="card card--col card--secondary card--outline ${
    item.name
  } form" id=${item.id}>
    <img class="card__img" src=${item.img} alt="espresso">
    <div class="addOn addOn--primary addOn--label"  id=${item.id}>
      <header class="addOn__header">
        <h3 class="addOn__heading">Milk<span> + $${item.milk}</span></h3>
      </header>
      <input class="checkBox" name="latte" type="checkbox" id=${Date.now()}>
    <label class="checkBox__label" for=${Date.now()}></label>
    </div>
    <div class="addOn addOn--primary addOn--label" id=${item.id}>
      <header class="addOn__header">
        <h3 class="addOn__heading">Cream<span> + $${item.cream}</span></h3>
      </header>
      <input class="checkBox" name="cream" type="checkbox" id=${Date.now() * 5}>
    <label class="checkBox__label" for=${Date.now() * 5}></label>
    </div>
    <div class="addOn addOn--primary addOn--label" id=${item.id}>
      <header class="addOn__header">
        <h3 class="addOn__heading">Latte<span> + $${item.latte}</span></h3>
      </header>
     <input class="checkBox" name="latte" type="checkbox" id=${Date.now() * 10}>
    <label class="checkBox__label" for=${Date.now() * 10}></label>
    </div>
    <div class="addOn__grid">
      <div class="addOn addOn--primary" id=${item.id}>
        <h3 class="addOn__heading">QTY</h3>
        <button class="btn btn--primary qty-btn" type="button" value='-' type="button">-</button>
        <span class="qty">1</span><button class="btn btn--primary qty-btn" type="button" value='+'>+</button>
      </div>
      <button class="addOn addOn--tertiary addOn__cart-btn" id=${
        item.id
      }>Add To Cart
      </button>
    </div>
  </form>`;
  return node;
});

CardItems.forEach((section) => {
  card.appendChild(section);
});

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

let BillDetails = [];

function handleAddToCart(val, id) {
  const newItem = {
    id: Date.now(),
    name: data[id - 1].name,
    parentId: id,
    milk: {
      name: "Milk",
      present: val[0],
      price: data[id - 1].milk,
    },
    cream: {
      name: "Cream",
      present: val[1],
      price: data[id - 1].cream,
    },
    latte: {
      name: "Latte",
      present: val[2],
      price: data[id - 1].latte,
    },
    qty: Number(qtys[id - 1].innerText),
  };
  qtys[id - 1].innerText = 1;
  renderBill(newItem);
  console.log(newItem);
}
const totalBill = document.querySelector(".total");
const cartItems = document.querySelector(".nav__cart--value");
function renderBill(billItem) {
  BillDetails.push(billItem);
  const node = document.createElement("li");
  const BillList = document.querySelector(".result--list");
  // const metaData = Object.values(
  //   Object.values(billItem).filter((val) => val)
  // ).map((val) => `<li class="bill__item--res">${val}</li>`);
  // console.log(metaData);
  let itemValue = 0;
  const metaData = Object.keys(billItem).reduce((acc, key) => {
    if (billItem[key].present) {
      itemValue += billItem[key].price;
      acc += ` <li class="bill__item--res">${key}</li>`;
    }
    return acc;
  }, ``);
  totalBill.innerText = Number(totalBill.innerText) + itemValue;
  console.log(metaData);
  node.innerHTML = ` <li>
            <div class="bill__item">
              <span>
                ${billItem.name}
                <ul class="bill__list">
                  ${metaData}
                </ul>
              </span>
              <span>${itemValue}</span>
            </div>
          </li>`;
  BillList.appendChild(node);
  cartItems.innerText = BillDetails.length;
}

const forms = document.querySelectorAll(".form");

forms.forEach((form) => {
  form.onsubmit = (e) => {
    e.preventDefault();
    const val = Object.values(form).map((val) => val.checked);
    handleAddToCart(val, form.id);
    form.reset();
  };
});

// card.addEventListener("click", handleCard);

// function handleCard(e) {
//   if (e.target.classList.contains("toggle-switch-of")) {
//     const value = e.target.value;
//     console.log(e.target.parentElement.id);
//     handleSwitch(e, value, e.target.parentElement.id);
//   }
// }

// function handleSwitch(e, value, id) {
//   if ((value == "milk" || value == "cream" || value == "latte") && id == 1) {
//     e.target.classList.toggle("toggle-switch-on");
//   } else if (
//     (value == "milk" || value == "cream" || value == "latte") &&
//     id == 2
//   ) {
//     e.target.classList.toggle("toggle-switch-on");
//   } else if (
//     (value == "milk" || value == "cream" || value == "latte") &&
//     id == 3
//   ) {
//     e.target.classList.toggle("toggle-switch-on");
//   }
// }

// forms
// const esp = document.querySelector(".espresso");

// const cap = document.querySelector(".cappuccino");

// const la=document.querySelector()

// const res = document.querySelector(".root");

// const _arr = [];
// class Shop {
//   constructor() {}

//   addOrder(obj) {
//     _arr.push(obj);
//   }
//   showDetails() {
//     return _arr;
//   }
// }

// class User extends Shop {
//   constructor() {
//     super();
//   }
//   addProd(prod, ...addOn) {
//     const obj = {
//       prod,
//       addOn,
//     };
//     super.addOrder(obj);
//   }
// }

// class Coffee {
//   constructor(prod, addOn, qty) {
//     this.coffee = { prod, addOn, qty };
//   }
//   Espresso() {}

//   Cappuccino() {
//     this.la.cream = cream;
//     this.la.amount += 125;
//   }
//   Latte() {
//     this.la.latte = latte;
//     this.la.amount += 150;
//   }
//   addQty(val) {
//     this.es.qty = this.es.qty + val;
//   }
//   resetQty(val) {
//     this.es.qty = val;
//   }
// }

// const newUser = new User();

// newUser.addProd("Es", "Milk", "Latte");

// newUser.addProd("Cap", "Milk", "Latte");
// const orderDetails = newUser.showDetails();

// console.log(orderDetails);
// const showDom = orderDetails.reduce((acc, cur) => {
//   acc += `<span style='font-weight:bold'>${cur["prod"]}</span>
//           ${cur["addOn"]}
//           `;
//   return acc;
// }, ``);
