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

end
