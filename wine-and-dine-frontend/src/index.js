const baseURL = "http://localhost:3000"
const wineURL = `${baseURL}/wines`
const foodURL = `${baseURL}/foods`
const pairingURL = `${baseURL}/pairings`
const pairingDropdowns = document.getElementById('pairing-dropdowns')
const wineDropdown = document.getElementById('wine-dropdown')
const foodDropdown = document.getElementById('food-dropdown')
const pairingList = document.getElementById('pairing-list')

pairingDropdowns.addEventListener('change', handleChange)

function findMatching(pairingAttributes, objectId, objectType) {
let category = objectType.split("-")[0]
let match = pairingAttributes.filter(x =>
  x.attributes[`${category}`].id === Number(objectId)); //use bracket notation to interpolate here
  return match;
};

function handleChange(event) {
  pairingList.innerHTML = ``//clears previous list
  let objectId = event.target.value
  let objectType = event.target.id
  fetch(pairingURL)
    .then(res => res.json())
    .then(pairingAttributes => findMatching(pairingAttributes.data, objectId, objectType))
    .then(matchedPairings => matchedPairings.forEach(pairing => {
      if(objectType == "wine-dropdown"){
        let foodPairs = pairing.attributes.food.name
        pairingList.innerHTML += `
        <li>${foodPairs}</li>
        `
      }
      else if(objectType == "food-dropdown"){
        let winePairs = pairing.attributes.wine.varietal
        pairingList.innerHTML += `
        <li>${winePairs}</li>
        `
      }
    }))
}

fetch(wineURL)
  .then(res => res.json())
  .then(wineArray => wineArray.data.forEach(wine => {
    wineDropdown.innerHTML += `
    <option value="${wine.id}">${wine.attributes.varietal}</option>
    `
  }))

fetch(foodURL)
  .then(res => res.json())
  .then(foodArray => foodArray.data.forEach(food => {
    foodDropdown.innerHTML += `
    <option value="${food.id}">${food.attributes.name}</option>
    `
  }))

// alternative to findMatching using if/else
// function findMatching(pairingAttributes, objectId, objectType) {
// let category = objectType.split("-")[0]
//   if(objectType == "wine-dropdown"){
//     let match = pairingAttributes.filter(x =>
//       x.attributes.wine.id === Number(objectId)
//     );
//     return match;
//   }
//   else if(objectType == "food-dropdown"){
//     let match = pairingAttributes.filter(x =>
//       x.attributes.food.id === Number(objectId)
//     );
//     return match;
//   }
// };
