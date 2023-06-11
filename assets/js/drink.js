const drinkForm = document.querySelector(".drinkForm");
const drinkInput = document.querySelector(".drinkInput");
const drinkResults = document.querySelector(".drinkResults");
const prevSearch = document.querySelector(".prevSearch");
let drinkHistory = JSON.parse(localStorage.getItem("drink")) || [];

// on window load fetch drink api with no query so it gets random response
// render recent drink searches if there is any
window.onload = function () {
  fetchDrink("");
  renderDrinkHistory();
};

// on search submit fetch data from drink api and add search value to localStorage
drinkForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var drinkSearch = drinkInput.value;
  drinkHistory.push(drinkSearch);
  localStorage.setItem("drink", JSON.stringify(drinkHistory));
  fetchDrink(drinkSearch);
  renderDrinkHistory();
});

// fetch drink data based on search value
function fetchDrink(drink) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderResults(data);
      renderDrinkHistory();
    });
}

// map and render results from drink api to cards on page
function renderResults(data) {
  console.log(data);
  let drinks = data.drinks;
  let html = drinks
    .map((data) => {
      return `<div class="card max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" src=${data.strDrinkThumb} alt=${data.strDrink}>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 heading">${data.strDrink}</div>
      </div>
      <div class="bottom px-6 pt-4 pb-2">
      <p class="text-gray-700 text-base">
      ${data.strInstructions}
        </p>
      </div>
    </div>`;
    })
    .join("");
  drinkResults.insertAdjacentHTML("afterbegin", html);
}

// render recent drink searches that are saved in localStorage
function renderDrinkHistory() {
  prevSearch.innerHTML = "";

  if (drinkHistory.length) {
    const prevHeader = document.createElement("h2");
    prevHeader.setAttribute("class", "previousHeader");
    prevHeader.innerHTML = "Previous Searches: ";
    prevSearch.append(prevHeader);
  }
  for (let i = 0; i < drinkHistory.length; i++) {
    const searchItem = document.createElement("input");
    searchItem.setAttribute("type", "button");
    searchItem.setAttribute("onclick", `fetchDrink("${drinkHistory[i]}")`);
    searchItem.setAttribute("class", "prevSearchBtn");
    searchItem.setAttribute("value", drinkHistory[i]);
    prevSearch.append(searchItem);
  }
}
