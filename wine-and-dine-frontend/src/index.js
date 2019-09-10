const container = document.getElementById('container')
const pairingDropdowns = document.getElementById('pairing-dropdowns')
const winePairings = document.getElementById('wine-pairings')
const wineDropdown = document.getElementById('wine-dropdown')
const foodPairings = document.getElementById('food-pairings')
const foodDropdown = document.getElementById('food-dropdown')

pairingDropdowns.addEventListener('change', handleChange)

function handleChange(event) {
  console.log(event.target)
  console.log(event.target.value)
  console.log(event.target.dataset)
  console.log(event.target.dataset.wineId)
}

fetch("http://localhost:3000/wines")
  .then(res => res.json())
  .then(wineArray => wineArray.data.forEach(wine => {
    wineDropdown.innerHTML += `
    <option data-wine-id="${wine.id}" value="${wine.attributes.varietal}">${wine.attributes.varietal}</option>
    `
  }))

fetch("http://localhost:3000/foods")
  .then(res => res.json())
  .then(foodArray => foodArray.data.forEach(food => {
    foodDropdown.innerHTML += `
    <option value="${food.attributes.name}">${food.attributes.name}</option>
    `
  }))
