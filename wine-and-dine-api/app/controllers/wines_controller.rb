class WinesController < ApplicationController
  def index
    wines = Wine.all
    render json: WineSerializer.new(wines)
  end

  def show
    wine = Wine.find(params[:id])
    # options = {
    #   include: [:food]
    # }
    render json: WineSerializer.new(wine)
  end

  def create
    wine = Wine.create(wine_params)
    render json: wine
  end

  private

  def wine_params
    params.require(:wine).permit(:varietal, :category)
  end

end
