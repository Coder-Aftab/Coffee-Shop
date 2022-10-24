export const card = ({ id, name, milk, cream, latte, img }) => {
  const node = document.createElement("section")
  node.innerHTML = `
  <form class="card card--col card--secondary card--outline ${name} form" id=${id}>
    <img class="card__img" src=${img} alt=${name}  >
    <div class="addOn addOn--primary addOn--label"  id=${id}>
      <header class="addOn__header">
        <h3 class="addOn__heading">Milk<span> + $${milk}</span></h3>
      </header>
      <input class="checkBox" name="latte" type="checkbox" id=${Date.now()} checked>
    <label class="checkBox__label" for=${Date.now()}></label>
    </div>
    <div class="addOn addOn--primary addOn--label" id=${id}>
      <header class="addOn__header">
        <h3 class="addOn__heading">Cream<span> + $${cream}</span></h3>
      </header>
      <input class="checkBox" name="cream" type="checkbox" id=${Date.now() * 5}>
    <label class="checkBox__label" for=${Date.now() * 5}></label>
    </div>
    <div class="addOn addOn--primary addOn--label" id=${id}>
      <header class="addOn__header">
        <h3 class="addOn__heading">Latte<span> + $${latte}</span></h3>
      </header>
     <input class="checkBox" name="latte" type="checkbox" id=${Date.now() * 10}>
    <label class="checkBox__label" for=${Date.now() * 10}></label>
    </div>
    <div class="addOn__grid">
      <div class="addOn addOn--primary" id=${id}>
        <h3 class="addOn__heading">QTY</h3>
        <button class="btn btn--primary qty-btn" type="button" value='-' type="button">-</button>
        <span class="qty">1</span><button class="btn btn--primary qty-btn" type="button" value='+'>+</button>
      </div>
      <button class="addOn addOn--tertiary addOn__cart-btn" id=${id}>Add To Cart
      </button>
    </div>
  </form>`;
  return node;
};
