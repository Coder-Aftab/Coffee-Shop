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
    this.coffee = {prod,addOn,qty};
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

res.innerHTML = `${showDom}`;
