class Adapter {
  constructor(baseURL){
    this.baseURL = baseURL
    this.wineURL = `${baseURL}/wines`
    this.foodURL = `${baseURL}/foods`
    this.pairingURL = `${baseURL}/pairings`
    this.pairingDropdowns = document.getElementById('pairing-dropdowns')
    this.wineDropdown = document.getElementById('wine-dropdown')
    this.foodDropdown = document.getElementById('food-dropdown')
    this.pairingList = document.getElementById('pairing-list')
    this.addPairForm = document.querySelector('.add-pairing-container')
    this.newPairButton = document.getElementById('new-pair-btn')
    this.addPair = false
    this.submitButton = document.querySelector('.submit')
    this.formInputs = document.querySelectorAll('.input-text')

    this.foods = []
    this.wines = []

    this.pairingDropdowns.addEventListener('change', this.handleChange)
    this.newPairButton.addEventListener('click', this.displayForm)
    this.submitButton.addEventListener('click', this.handleSubmitForm)
  }

  displayForm = () => {
    this.addPair = !this.addPair
    if (this.addPair) {
      this.addPairForm.style.display = 'block'
    } else{
      this.addPairForm.style.display = 'none'
    }
  }

  handleSubmitForm = (event) => {
    event.preventDefault()
    console.log(this.formInputs)
    // let newPairing = {}
  }

  findMatching(pairingAttributes, objectId, objectType){
  let category = objectType.split("-")[0]
  let match = pairingAttributes.filter(x =>
    x.attributes[`${category}`].id === Number(objectId)); //use bracket notation to interpolate here
    return match;
  };

  handleChange = (event) => {
    this.pairingList.innerHTML = ``//clears previous list
    let objectId = event.target.value
    let objectType = event.target.id
    fetch(this.pairingURL)
      .then(res => res.json())
      .then(pairingAttributes => this.findMatching(pairingAttributes.data, objectId, objectType))
      .then(matchedPairings => matchedPairings.forEach(pairing => {
        if(objectType == "wine-dropdown"){
          let foodPairs = pairing.attributes.food.name
          this.pairingList.innerHTML += `
          <li>${foodPairs}</li>
          `
        }
        else if(objectType == "food-dropdown"){
          let winePairs = pairing.attributes.wine.varietal
          this.pairingList.innerHTML += `
          <li>${winePairs}</li>
          `
        }
      }))
  }

// render entire list of food objects
  renderAllFoods = () => {
    this.foodDropdown.innerHTML = ""
    this.foods.forEach(food => {
      this.foodDropdown.innerHTML += `
      <option value="${food.id}">${food.name}</option>
      `
    })
  }

  fetchFood(){
    fetch(this.foodURL)
    .then(res => res.json())
    .then(foodArray => {
      foodArray.data.forEach(food => {
      let foodObj = {id: food.id, name: food.attributes.name, category: food.attributes.category}
      let newFood = new Food(foodObj)
      this.foods.push(newFood)
    })
      this.renderAllFoods()
    })
  }

// render entire list of wine objects
  renderAllWines = () => {
    this.wineDropdown.innerHTML = ""
    this.wines.forEach(wine => {
      this.wineDropdown.innerHTML += `
      <option value="${wine.id}">${wine.varietal}</option>
      `
    })
  }

  fetchWine(){
    fetch(this.wineURL)
    .then(res => res.json())
    .then(wineArray => {
      wineArray.data.forEach(wine => {
      let wineObj = {id: wine.id, varietal: wine.attributes.varietal, category: wine.attributes.category}
      let newWine = new Wine(wineObj)
      this.wines.push(newWine)
    })
      this.renderAllWines()
    })
  }


}

let adapter = new Adapter("http://localhost:3000/")
adapter.fetchFood()
adapter.fetchWine()
