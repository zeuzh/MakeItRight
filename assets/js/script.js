// FOOD STUFF
const foodForm = document.querySelector(".foodForm");
const foodKey = "bd1d41381c9b73f213e16535f88be93a";
const foodId = "faba4411";
const foodInput = document.querySelector(".foodInput");

function fetchFood(food) {
  fetch(
    `https://api.edamam.com/search?q=${food}&app_id=${foodId}&app_key=${foodKey}&from=0&to=20`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

foodForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var foodSearch = foodInput.value;
  fetchFood(foodSearch);
});
