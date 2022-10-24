import { data } from "./data.js";
import { card } from "./card.js";

// Cards
const cardItems = document.querySelector(".product--card");
//mapping cards
data.map(({ id, name, milk, cream, latte, img }) => {
  cardItems.appendChild(card({ id, name, milk, cream, latte, img }));
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

let billDetails = [];

function handleAddToCart(val, id) {
  const { name, milk, cream, latte } = data[id - 1];
  const newItem = {
    id: Date.now(),
    name: name,
    parentId: id,
    milk: {
      name: "Milk",
      present: val[0],
      price: milk,
    },
    cream: {
      name: "Cream",
      present: val[1],
      price: cream,
    },
    latte: {
      name: "Latte",
      present: val[2],
      price: latte,
    },
    qty: Number(qtys[id - 1].innerText),
  };
  qtys[id - 1].innerText = 1;
  console.log(newItem);
  renderBill(newItem);

}
const totalBill = document.querySelector(".total");
const billModal = document.getElementById("bill--block");
const navCart = document.querySelector(".nav__cart--value");
const navCartContainer = document.querySelector(".nav__cart--container");

navCartContainer.onclick = () => {
  billModal.setAttribute("style", "display:block");
};
document.onclick = function (event) {
  if (event.target == billModal) {
    billModal.style.display = "none";
    document.querySelector("body").setAttribute("style", "overflow:scroll");
  }
};
function renderBill(billItem) {
  // console.log(billItem);
  billDetails.push(billItem);
  navCart.innerText = billDetails.length;
  const node = document.createElement("li");
  const BillList = document.querySelector(".result--list");

  let itemValue = 0;
  const metaData = Object.keys(billItem).reduce((acc, key) => {
    if (billItem[key].present) {
      itemValue += billItem[key].price;
      acc += ` <li class="bill__item--res">${key}</li>`;
    }
    return acc;
  }, ``);
  totalBill.innerText = Number(totalBill.innerText) + (itemValue*billItem.qty);
  console.log(metaData);
  node.innerHTML = ` <li>
            <div class="bill__item">
              <span>${billItem.name}
                <ul class="bill__list">
                  ${metaData}
                </ul>
              </span>
              <span>${billItem.qty}x${itemValue}</span>
              <span>${itemValue * billItem.qty}</span>
            </div>
          </li>`;
  BillList.appendChild(node);
}

const forms = document.querySelectorAll(".form");

forms.forEach((form) => {
  form.onsubmit = (e) => {
    e.preventDefault();
    const val = Object.values(form).map((val) => val.checked);
    console.log(val)
    handleAddToCart(val, form.id);
    form.reset();
  };
});
