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

  def create
    pairing = Pairing.create(pairing_params)
    render json: pairing
  end

  private

  def pairing_params
    params.require(:pairing).permit(:wine_id, :food_id)
  end

end
