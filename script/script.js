import { data } from "./data.js";
import { card } from "./card.js";

// Cards
const cardItems = document.querySelector(".product--card");
//mapping cards
data.map(({ id, name, milk, cream, latte, img }) => {
  cardItems.appendChild(card({ id, name, milk, cream, latte, img }));
});

//Get the quantity span to display change
const qtys = document.querySelectorAll(".qty");
//Get the quantity buttons
const qtyBtns = document.querySelectorAll(".qty-btn");

qtyBtns.forEach((qtyBtn) => {
  qtyBtn.onclick = (e) => {
    const id = e.target.parentElement.id;
    const symbol = e.target.innerHTML;
    handleQty(id - 1, symbol);
  };
});

function handleQty(id, symbol) {
  if (symbol == "+") {
    qtys[id].innerText = Number(qtys[id].innerText) + 1;
  } else if (symbol == "-") {
    if (qtys[id].innerText == "1") return;
    qtys[id].innerText = Number(qtys[id].innerText) - 1;
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
  //resetting the qty span
  qtys[id - 1].innerText = 1;
  // console.log(newItem);
  renderBill(newItem);
}

//Setup total
const totalBill = document.querySelector(".total");
//Get Hold of Bill Modal
const billModal = document.getElementById("bill--block");
//get hold of Cart Value
const navCart = document.querySelector(".nav__cart--value");

//Get hold of whole nav cart container
const navCartContainer = document.querySelector(".nav__cart--container");

//Bill Modal
navCartContainer.onclick = () => {
  billModal.setAttribute("style", "display:block");
};
document.onclick = function (event) {
  if (event.target == billModal) {
    billModal.style.display = "none";
    document.querySelector("body").setAttribute("style", "overflow:scroll");
  }
};

// Generate Bill
function renderBill(billItem) {
  // console.log(billItem);
  //push new billItem to current billDetails array
  billDetails.push(billItem);

  //Increment/Decrement cart value based on Array length
  navCart.innerText = billDetails.length;

  //Create New li Element
  const node = document.createElement("li");

  //Get Hold of Result List
  const BillList = document.querySelector(".result--list");

  let itemValue = 0;
  //Generate List inside the Product for AddOns
  const metaData = Object.keys(billItem).reduce((acc, key) => {
    if (billItem[key].present) {
      itemValue += billItem[key].price;
      acc += ` <li class="bill__item--res">${key}</li>`;
    }
    return acc;
  }, ``);
  //increment the total bill
  totalBill.innerText = Number(totalBill.innerText) + itemValue * billItem.qty;
  //console.log(metaData);
  //Generate Node List
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

  //Append the node to result list
  BillList.appendChild(node);
}

// Get Hold of form Data
const forms = document.querySelectorAll(".form");

//Get data from forms on submit
forms.forEach((form) => {
  form.onsubmit = (e) => {
    e.preventDefault();
    const val = Object.values(form).map((val) => val.checked);
    //console.log(val)
    handleAddToCart(val, form.id);
    form.reset();
  };
});
