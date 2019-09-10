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
end
