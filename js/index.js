async function App(query) {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${query}`
  );
  const data = await response.json();
  const recipe = await data.recipes;

  for (let i = 0; i < 7; i++) {
    displayItems(recipe[i]);
    // click(recipe);
    if (i == 6) {
      renderNextBtn();
    }
  }
  click(recipe);
  // console.log(recipe);

  // recipe.map((value) => {
  //   console.log(value);
  // });
  function test1() {
    for (let i = 0; i < 7; i++) {
      displayItems(recipe[i]);
      if (i == 6) {
        renderNextBtn();
      }
    }

    // try click
    click(recipe);
    //

    const nextBtn = document.querySelector(".next");
    nextBtn.addEventListener("click", () => {
      const sel = document.querySelectorAll(".item");
      const selBtn = document.querySelectorAll(".next");
      sel.forEach((value) => {
        value.remove();
      });
      selBtn.forEach((value) => {
        value.remove();
      });
      for (let i = 7; i < 14; i++) {
        displayItems(recipe[i]);
        if (i == 13) {
          renderPrevBtn();
        }
      }

      // try click
      click(recipe);
      //

      nextBtn.remove();
      centerClear();

      const prevBtn = document.querySelector(".prev");
      prevBtn.addEventListener("click", () => {
        const sel = document.querySelectorAll(".item");
        const selBtn = document.querySelectorAll(".prev");
        sel.forEach((value) => {
          value.remove();
        });
        selBtn.forEach((value) => {
          value.remove();
        });
        test1();

        prevBtn.remove();
        centerClear();
      });
    });
  }

  const nextBtn = document.querySelector(".next");
  nextBtn.addEventListener("click", () => {
    const sel = document.querySelectorAll(".item");
    const selBtn = document.querySelectorAll(".next");
    sel.forEach((value) => {
      value.remove();
    });
    selBtn.forEach((value) => {
      value.remove();
    });
    centerClear();
    for (let i = 7; i < 14; i++) {
      displayItems(recipe[i]);
      if (i == 13) {
        renderPrevBtn();
      }
    }

    // try click
    click(recipe);
    //

    nextBtn.remove();
    // console.log("Next");

    // prev
    const prevBtn = document.querySelector(".prev");
    prevBtn.addEventListener("click", () => {
      const sel = document.querySelectorAll(".item");
      const selBtn = document.querySelectorAll(".prev");
      sel.forEach((value) => {
        value.remove();
      });
      selBtn.forEach((value) => {
        value.remove();
      });
      test1();
      prevBtn.remove();
      centerClear();
    });
  });
}

// ***********************************************

const search = document.querySelector(".search");
const btn = document.querySelector(".searchBtn");
const sel = document.querySelectorAll(".item");

btn.addEventListener("click", () => {
  const query = search.value;
  App(query);
  search.value = "";
  const sel = document.querySelectorAll(".item");
  const selNextBtn = document.querySelectorAll(".next");
  const selPrevBtn = document.querySelectorAll(".prev");
  const itemCen = document.querySelectorAll(".alighAuto");

  if (query) {
    sel.forEach((value) => {
      value.remove();
    });
    selNextBtn.forEach((value) => {
      value.remove();
    });
    selPrevBtn.forEach((value) => {
      value.remove();
    });
    itemCen.forEach((value) => {
      value.remove();
    });
  }
});

function centerClear() {
  const itemCen = document.querySelectorAll(".alighAuto");

  itemCen.forEach((value) => {
    value.remove();
  });
}

function displayItems(recipe) {
  const left = document.querySelector(".left");
  let ret =
    `<div class='itemLogo'>` +
    `<img src=${recipe.image_url}>` +
    `</div>` +
    `<div class='info'>` +
    `<p class='title'>` +
    `${recipe.title}` +
    `<div class='publisher'>` +
    `${recipe.publisher}` +
    `<div>` +
    `</div>`;
  let newDiv = document.createElement("div");
  newDiv.className = "item";
  newDiv.innerHTML = ret;
  left.appendChild(newDiv);
}

function renderNextBtn() {
  const left = document.querySelector(".left");
  let ret = `<button class='next pagi'>` + `Next` + `<button>`;
  let newDiv = document.createElement("div");
  newDiv.className = `next pagiDiv`;
  newDiv.innerHTML = ret;
  left.appendChild(newDiv);
}

function renderPrevBtn() {
  const left = document.querySelector(".left");
  let ret = `<button class='prev pagi'>` + `Prev` + `<button>`;
  let newDiv = document.createElement("div");
  newDiv.className = `prev pagiDiv`;
  newDiv.innerHTML = ret;
  left.appendChild(newDiv);
}

function click(recipe) {
  const item = document.querySelectorAll(".item");
  const btnPagi = document.querySelectorAll(".pagi");
  // console.log(recipe[0].title);
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener("click", (e) => {
      let text;
      for (let i = 0; i < btnPagi.length; i++) {
        text = btnPagi[i].textContent;
      }

      if (text == "Next") {
        displayCenter(recipe[i]);
        centerItemHadle();
      } else if (text == "Prev") {
        i += 7;
        displayCenter(recipe[i]);
        centerItemHadle();
        i -= 7;
      } else {
        console.log("Not available");
      }
    });
  }
}

function centerItemHadle() {
  const alighAuto = document.querySelectorAll(".alighAuto");
  const item = document.querySelectorAll(".item");
  for (let i = 0; i < item.length; i++) {
    item[i].addEventListener("click", () => {
      // console.log("hi");
      alighAuto.forEach((value) => {
        // console.log(value);
        value.remove();
      });
    });
  }
}

function displayCenter(recipe) {
  const center = document.querySelector(".center");
  let ret =
    `<div class="alighAuto">` +
    `<div class="itemcenter">` +
    `<div class="mar">` +
    `<div class="titlecenter">` +
    `<p>` +
    `${recipe.title}` +
    `</p>` +
    `</div>` +
    `<div class="imgcenter">` +
    `<img src="${recipe.image_url}" alt="">` +
    `</div>` +
    `<div class="infocenter">` +
    `<div class="wrap">` +
    `<p class="publisher">` +
    `${recipe.publisher}` +
    `</p>` +
    `<p class="rank">` +
    `${recipe.social_rank.toFixed(2)}` +
    `</p>` +
    `</div>` +
    `<div>` +
    `<p class="website">` +
    `<a href="${recipe.publisher_url}" target="_blank">` +
    `${recipe.publisher_url}` +
    `</a>` +
    `</p>` +
    `</div>` +
    `</div>` +
    `<div class="bTn">` +
    `<button class="buy">` +
    "Buy" +
    `</button>` +
    `<button class="addtocart">` +
    "Add To Cart" +
    `</button>` +
    `</div>` +
    `</div>` +
    `</div>` +
    `</div>`;

  let newDiv = document.createElement("div");
  newDiv.className = "centerdis";
  newDiv.innerHTML = ret;
  center.appendChild(newDiv);

  // buy button
  handleBuyBtn(recipe);

  // add to cart button
  handleAddToCartBtn(recipe);
}

function handleBuyBtn(recipe) {
  const buyBtn = document.querySelectorAll(".buy");
  for (let i = 0; i < buyBtn.length; i++) {
    buyBtn[i].addEventListener("click", () => {
      displayItemsRight(recipe);
    });
  }
}

function handleAddToCartBtn(recipe) {
  const addToCartBtn = document.querySelectorAll(".addtocart");
  for (let i = 0; i < addToCartBtn.length; i++) {
    addToCartBtn[i].addEventListener("click", () => {
      // alert("Add to cart");
      displayItemCart(recipe);
    });
  }
}

function displayItemsRight(recipe) {
  const shopingList = document.querySelector(".shoping-list");
  let ret =
    `<div class='itemLogoRight'>` +
    `<img src=${recipe.image_url}>` +
    `</div>` +
    `<div class='infoRight'>` +
    `<p class='titleRight'>` +
    `${recipe.title}` +
    `<div class='publisherRight'>` +
    `${recipe.publisher}` +
    `<div>` +
    `</div>`;
  let newDiv = document.createElement("div");
  newDiv.className = "itemRight";
  newDiv.innerHTML = ret;
  shopingList.appendChild(newDiv);

  centerItemRightHadle(recipe);
}

function displayItemCart(recipe) {
  const tooltiptext = document.querySelector(".tooltiptext");
  let ret =
    `<div class='itemLogoCart'>` +
    `<img src=${recipe.image_url}>` +
    `</div>` +
    `<div class='infoCart'>` +
    `<p class='titleCart'>` +
    `${recipe.title}` +
    `<div class='publisherCart'>` +
    `${recipe.publisher}` +
    `<div>` +
    `</div>`;
  let newDiv = document.createElement("div");
  newDiv.className = "itemCart";
  newDiv.innerHTML = ret;
  tooltiptext.appendChild(newDiv);

  centerItemCartHadle(recipe);
}

function centerItemRightHadle(recipe) {
  const alighAuto = document.querySelectorAll(".alighAuto");
  const itemRight = document.querySelectorAll(".itemRight");

  for (let i = 0; i < itemRight.length; i++) {
    itemRight[i].addEventListener("click", () => {
      if (i == itemRight.length - 1) {
        displayCenter(recipe);
      }
      centerItemRightTryHadle();
      alighAuto.forEach((value) => {
        value.remove();
      });
    });
  }
}

function centerItemCartHadle(recipe) {
  const alighAuto = document.querySelectorAll(".alighAuto");
  const itemCart = document.querySelectorAll(".itemCart");

  for (let i = 0; i < itemCart.length; i++) {
    itemCart[i].addEventListener("click", () => {
      console.log("ok");
      if (i == itemCart.length - 1) {
        console.log("Working");

        displayCenter(recipe);
      }
      centerItemCartTryHadle();
      alighAuto.forEach((value) => {
        value.remove();
      });
    });
  }
}

function centerItemRightTryHadle() {
  const alighAuto = document.querySelectorAll(".alighAuto");
  const itemRight = document.querySelectorAll(".itemRight");
  for (let i = 0; i < itemRight.length; i++) {
    itemRight[i].addEventListener("click", () => {
      alighAuto.forEach((value) => {
        value.remove();
      });
    });
  }
}

function centerItemCartTryHadle() {
  const alighAuto = document.querySelectorAll(".alighAuto");
  const itemCart = document.querySelectorAll(".itemCart");
  for (let i = 0; i < itemCart.length; i++) {
    itemCart[i].addEventListener("click", () => {
      alighAuto.forEach((value) => {
        value.remove();
      });
    });
  }
}
