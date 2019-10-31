class Adapter {
  constructor(baseURL){
    this.baseURL = baseURL
    this.wineURL = `${baseURL}/wines`
    this.foodURL = `${baseURL}/foods`
    this.pairingURL = `${baseURL}/pairings`
    this.newPairingURL = `${baseURL}/newpairing`
    this.pairingDropdowns = document.getElementById('pairing-dropdowns')//used for eventlistener on wine and food dropdowns
    this.pairTypeSelect = document.getElementById('pair-type-select')
    this.wineDropdown = document.getElementById('wine-dropdown')
    this.foodDropdown = document.getElementById('food-dropdown')
    this.winePairings= document.getElementById('wine-pairings')
    this.foodPairings = document.getElementById('food-pairings')
    this.pairingList = document.querySelector('.pairing-list')
    this.addPairForm = document.querySelector('.add-pairing-container')
    this.newPairButton = document.getElementById('new-pair-btn')
    this.selectedPairings = document.getElementById('selected-pairings')
    this.addPair = false // displayForm
    this.submitButton = document.querySelector('.submit') //handleSubmitForm
    this.formInputs = document.querySelectorAll('.input-text')
    this.foods = []
    this.wines = []
    this.pairTypeSelect.addEventListener('click', this.handlePairChange)//first event
    this.pairingDropdowns.addEventListener('change', this.handleChange)//second event
    this.newPairButton.addEventListener('click', this.displayForm)// third event listener
    this.submitButton.addEventListener('click', this.handleSubmitForm) // fourth event listener
    this.headerObj = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }


//first event listener - handles food/wine option
  handlePairChange = (event) => {
    this.selectedPairings.style.display = 'none'
    this.pairingList.innerHTML = ``
    let selection = event.target.value
    if (selection == "food") {
      this.foodPairings.style.display = 'block'
      this.winePairings.style.display = 'none'
    } else if (selection == "wine"){
      this.winePairings.style.display = 'block'
      this.foodPairings.style.display = 'none'
    }
  }

// called by renderCards
  urlHandler(objName, objType){
    let objNameArray = objName.split(" ")
    let objNameURL = objNameArray.length >= 2 ? objNameArray.join("-") : objName
    if(objType === "wine"){
      return `https://vinepair.com/review/category/wine/?fwp_search_reviews=${objNameURL}`
    } else {
      return `https://www.bonappetit.com/ingredient/${objNameURL}`
    }
  }

//renders cards for accordion pairing list, triggered by handleChange
  renderCards(objPairs, objectId){
    let arr = this.foods.concat(this.wines)
    let objName, objType, objURL= ""
    if (objPairs.name === undefined){
      objName = objPairs.varietal
      objType = "wine"
    } else {
      objName = objPairs.name
      objType = "food"
    }
    this.selectedPairings.style.display = 'block'
    objURL = this.urlHandler(objName, objType)
    let obj = arr.find(x => x.id === objectId);
    let objAnchor = objType == "wine" ? `Visit VinePair.com for ${objName.titlecase()} reviews!` : `Visit BonAppetit.com for ${objName} recipes!`
    this.pairingList.innerHTML += `
     <div class="card">
       <div class="card-header pair-card" id="heading${objPairs.id}">
         <button class="list-group-item list-group-item-action pair-item" type="button" data-toggle="collapse" data-target="#collapse${objPairs.id}" aria-expanded="false" aria-controls="#collapse${objPairs.id}">
          <h3>${objName.titlecase()}</h3>
         </button>
       </div>
       <div id="collapse${objPairs.id}" class="collapse" aria-labelledby="heading${objPairs.id}" data-parent="#accordionExample">
         <div class="card-body">
           <p>${obj[Object.keys(obj)[1]].capitalize()} pairs well with ${objName}!</p>
           <h5><a href=${objURL} target="_blank">${objAnchor}</a><h5>
         </div>
       </div>
     </div>
    `
  };

//finds matching object for handleChange method below, triggered by handleChange
  findMatching(pairingAttributes, objectId, objectType){
  let category = objectType.split("-")[0]
  let match = pairingAttributes.filter(x =>
    x.attributes[category].id === Number(objectId)); //use bracket notation to interpolate here
    return match;
  };

// second event listener - handles changes to food and wine dropdown
  handleChange = (event) => {
    this.pairingList.innerHTML = ``//clears previous list
    let objectId = event.target.value
    let objectType = event.target.id
    fetch(this.pairingURL)
      .then(res => res.json())
      .then(pairingAttributes => this.findMatching(pairingAttributes.data, objectId, objectType))
      .then(matchedPairings => matchedPairings.forEach(pairing => {
        if(objectType == "wine-dropdown"){
          let foodPairs = pairing.attributes.food
          this.renderCards(foodPairs, objectId)
        }
        else if(objectType == "food-dropdown"){
          let winePairs = pairing.attributes.wine
          this.renderCards(winePairs, objectId)
        }
      }))
  }

//  third event listener - shows/hides create new pairing form
  displayForm = () => {
    this.addPair = !this.addPair //initially set to false at the top
    if (this.addPair) {
      this.addPairForm.style.display = 'block'
    } else{
      this.addPairForm.style.display = 'none'
    }
  }

// fourth event listener - creates new food/wine objects and stores them in db
  postWineAndFood(newWine, newFood) {
    let newPairArray= [newWine, newFood]
    let newWinePost = fetch(this.newPairingURL, {
      method: "POST",
      headers: this.headerObj,
      body: JSON.stringify(newPairArray)
    })
    .then(res => res.json())
    .then(newPair => {
      let foodObj = {
        id: newPair.food.data.id,
        name: newPair.food.data.attributes.name,
        category: newPair.food.data.attributes.category
      }
      let wineObj = {
        id: newPair.wine.data.id,
        varietal: newPair.wine.data.attributes.varietal,
        category: newPair.wine.data.attributes.category
      }
      this.foods.push(new Food(foodObj))
      this.wines.push(new Wine(wineObj))
    })
    .then(this.renderAllFoods)
    .then(this.renderAllWines)
  }

  handleSubmitForm = (event) => {
    let newWine = {
      varietal: this.formInputs[0].value,
      category: this.formInputs[1].value
    }
    let newFood = {
      name: this.formInputs[2].value,
      category: this.formInputs[3].value
    }
    if (newWine.varietal == "" || newFood.name == ""){
      event.preventDefault() // prevent page refresh if fields are empty
      alert("Please enter a wine and food to pair.")
      return false;
    }
    this.postWineAndFood(newWine, newFood);
  }

// This runs immediately upon JS file load
// render entire list of food objects for dropdown
  renderAllFoods = () => {
    this.foodDropdown.innerHTML = ""
    this.foods = this.foods.filter( function( item, index, inputArray ) {
      return inputArray.indexOf(item) == index;
    }); //dedupes array
    this.foods.forEach(food => {
      this.foodDropdown.innerHTML += `
      <option value="${food.id}">${food.name.titlecase()}</option>
      `
    })
  }

  fetchFood(){
    fetch(this.foodURL)
    .then(res => res.json())
    .then(foodArray => {
      foodArray.data.forEach(food => {
      let foodObj = {
        id: food.id,
        name: food.attributes.name,
        category: food.attributes.category
      }
      let newFood = new Food(foodObj)
      this.foods.push(newFood)
    })
      this.renderAllFoods()
    })
  }

// render entire list of wine objects for dropdown
  renderAllWines = () => {
    this.wineDropdown.innerHTML = ""
    this.wines = this.wines.filter( function( item, index, inputArray ) {
      return inputArray.indexOf(item) == index;
    }); // dedupes array
    this.wines.forEach(wine => {
      this.wineDropdown.innerHTML += `
      <option value="${wine.id}">${wine.varietal.titlecase()}</option>
      `
    })
  }

  fetchWine(){
    fetch(this.wineURL)
    .then(res => res.json())
    .then(wineArray => {
      wineArray.data.forEach(wine => {
      let wineObj = {
        id: wine.id,
        varietal: wine.attributes.varietal,
        category: wine.attributes.category
      }
      let newWine = new Wine(wineObj)
      this.wines.push(newWine)
    })
      this.renderAllWines()
    })
  }
}

let adapter = new Adapter("http://localhost:3000")
adapter.fetchFood()
adapter.fetchWine()

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.titlecase = function() {
  return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
}
