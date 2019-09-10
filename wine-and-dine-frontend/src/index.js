
const wineDropdown = document.getElementById('wine-dropdown')
const dropdownMenu = document.getElementById('dropdownMenuButton')
// const birdNameInput = document.querySelector("#bird-name-input")
// const birdSpeciesInput = document.querySelector("#bird-species-input")
// const submitBirdButton = document.querySelector("#submit-bird-button")

// const headersObj = {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     }
//
// submitBirdButton.addEventListener("click", (e) => {
//   e.preventDefault()
//   let birdObj = {
//     name: birdNameInput.value,
//     species: birdSpeciesInput.value
//   }
//
//   fetch("http://localhost:3000/birds/1", {
//     method: "PATCH",
//     headers: headersObj,
//     body: JSON.stringify(birdObj)
//   })
//   .then(res => res.json())
//   .then(console.log)
// })

fetch("http://localhost:3000/pairings")
  .then(res => res.json())
  .then(pairingArray => pairingArray.data.forEach(pairing => {
    dropdownMenu.innerHTML += `
      <a class="dropdown-item" href="#">${pairing.attributes.wine.varietal}</a>
    `
  }))
