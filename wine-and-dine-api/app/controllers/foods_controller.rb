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

  def create
    food = Food.create(food_params)
    render json: food
  end

  private

  def food_params
    params.require(:food).permit(:name, :category)
  end

end
