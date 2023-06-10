// FOOD STUFF
const drinkForm = document.querySelector(".drinkForm");
const drinkInput = document.querySelector(".drinkInput");

window.onload = function () {
  fetchDrink("");
};

function fetchDrink(drink) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

drinkForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var drinkSearch = drinkInput.value;
  fetchDrink(drinkSearch);
});
