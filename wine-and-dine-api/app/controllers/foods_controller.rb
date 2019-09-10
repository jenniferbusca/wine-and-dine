class FoodsController < ApplicationController
  def index
    foods = Food.all
    render json: FoodSerializer.new(foods)
  end

  def show
    food = Food.find(params[:id])
    # options = {
    #   include: [:food]
    # }
    # render json: FoodSerializer.new(food, options)
    render json: FoodSerializer.new(food)
  end
end
