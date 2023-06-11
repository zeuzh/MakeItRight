// FOOD STUFF
const foodForm = document.querySelector(".foodForm");
const foodKey = "bd1d41381c9b73f213e16535f88be93a";
const foodId = "faba4411";
const foodInput = document.querySelector(".foodInput");
const foodResults = document.querySelector(".foodResults");
const prevSearch = document.querySelector(".prevSearch");
let foodHistory = JSON.parse(localStorage.getItem("food")) || [];

window.onload = function () {
  fetchFood("popular");
  // var previouslySearchedValues = local
  // if (foodHistory.length) {
  renderFoodHistory();
  // }
};

foodForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var foodSearch = foodInput.value;
  foodHistory.push(foodSearch);
  localStorage.setItem("food", JSON.stringify(foodHistory));
  fetchFood(foodSearch);
  renderFoodHistory();
});

function fetchFood(food) {
  fetch(
    `https://api.edamam.com/search?q=${food}&app_id=${foodId}&app_key=${foodKey}&from=0&to=20`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderResults(data);
    });
}

function renderResults(data) {
  console.log(data);
  let render = data.hits
    .map((data) => {
      return `<div class="card max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" src=${data.recipe.image} alt=${data.recipe.label}>
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 foodHeading">${data.recipe.label}</div>
      </div>
      <div class="foodBottom px-6 pt-4 pb-2">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"><a class="view-btn" target="_blank" href="${data.recipe.url}">View Recipe</a></span>
      <p class="text-gray-700 text-base">
          ${data.recipe.mealType[0]}
        </p>
      </div>
    </div>`;
    })
    .join("");
  foodResults.insertAdjacentHTML("afterbegin", render);
}

function renderFoodHistory() {
  prevSearch.innerHTML = "";
  for (let i = 0; i < foodHistory.length; i++) {
    const searchItem = document.createElement("input");
    searchItem.setAttribute("type", "button");
    // searchItem.setAttribute("onclick", "fetchFood(this)");
    searchItem.setAttribute("class", "prevSearchBtn");
    searchItem.setAttribute("value", foodHistory[i]);
    prevSearch.append(searchItem);
  }
}
