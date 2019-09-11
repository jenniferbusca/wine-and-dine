const baseURL = "http://localhost:3000"
const wineURL = `${baseURL}/wines`
const foodURL = `${baseURL}/foods`
const pairingURL = `${baseURL}/pairings`

const container = document.getElementById('container')
const pairingDropdowns = document.getElementById('pairing-dropdowns')
const winePairings = document.getElementById('wine-pairings')
const wineDropdown = document.getElementById('wine-dropdown')
const foodPairings = document.getElementById('food-pairings')
const foodDropdown = document.getElementById('food-dropdown')

pairingDropdowns.addEventListener('change', handleChange)

// function handleChange(event) {
//   fetch(`${pairingURL}`)
//     .then(res => res.json())
//     .then(pairingAttributes => pairingAttributes.data.forEach(pairing => {
//       let objectId = event.target.value //returns id of food or wine object
//       if(event.target.id == "wine-dropdown"){
//         let foodPairs = pairing.attributes.food.name
//         console.log(foodPairs)
//         // foodPairs.forEach(foodPair => {
//         //   console.log(foodPair)
//         // })
//       }
//       else if(event.target.id == "food-dropdown"){
//         let winePairs = pairing.attributes.wine.varietal
//         console.log(winePairs)
//       }
//     }))
// }


function findMatching(pairingAttributes, objectId, objectType) {
  if(objectType == "wine-dropdown"){
    let match = pairingAttributes.filter(x =>
      x.attributes.wine.id === Number(objectId)
    );
    return match;
  }
  else if(objectType == "food-dropdown"){
    let match = pairingAttributes.filter(x =>
      x.attributes.food.id === Number(objectId)
    );
    return match;
  }
};

function handleChange(event) {
  let objectId = event.target.value
  let objectType = event.target.id
  // let objectCategory = event.target.id.split("-")[0]
  fetch(`${pairingURL}`)
    .then(res => res.json())
    .then(pairingAttributes => findMatching(pairingAttributes.data, objectId, objectType))
    .then(matchedPairings => matchedPairings.forEach(pairing => {
      if(objectType == "wine-dropdown"){
        let foodPairs = pairing.attributes.food.name
        console.log(foodPairs)
      }
      else if(objectType == "food-dropdown"){
        let winePairs = pairing.attributes.wine.varietal
        console.log(winePairs)

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
