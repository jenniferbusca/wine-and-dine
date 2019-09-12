class PairingsController < ApplicationController

  def index
    pairings = Pairing.all
    render json: PairingSerializer.new(pairings)
  end

  def show
    pairing = Pairing.find(params[:id])
    options = {
      include: [:food, :wine]
    }
    render json: PairingSerializer.new(pairing, options)
  end

  def newpairing
    wine = Wine.create(varietal: params[:_json][0][:varietal], category: params[:_json][0][:category])
    food = Food.create(name: params[:_json][1][:name], category: params[:_json][1][:category])
    pair = Pairing.create(wine_id: wine.id, food_id: food.id)
    render json: {
      food: FoodSerializer.new(food),
      wine: WineSerializer.new(wine),
      pair: PairingSerializer.new(pair)
    }
  end

end
