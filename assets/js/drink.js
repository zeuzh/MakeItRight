// FOOD STUFF
const drinkForm = document.querySelector(".drinkForm");
const drinkInput = document.querySelector(".drinkInput");
const drinkResults = document.querySelector(".drinkResults");

window.onload = function () {
  fetchDrink("");
};

function fetchDrink(drink) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderResults(data);
    });
}

function renderResults(data) {
  console.log(data);
  let drinks = data.drinks;
  let html = drinks
    .map((data) => {
      let ingredients = "";
      let ingredientNum = 1;

      while (data[`strIngredient${ingredientNum}`]) {
        const ingredient = data[`strIngredient${ingredientNum}`];
        const measure = data[`strMeasure${ingredientNum}`];
        ingredients += `<p class="data">Ingredient ${ingredientNum}: ${measure}: ${ingredient}</p>`;
        ingredientNum++;
      }

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

drinkForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var drinkSearch = drinkInput.value;
  fetchDrink(drinkSearch);
});
