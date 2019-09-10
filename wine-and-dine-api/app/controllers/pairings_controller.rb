class PairingsController < ApplicationController

  def index
    pairings = Pairing.all
    render json: PairingSerializer.new(pairings)
  end

  def show
    pairing = Pairing.find(params[:id])
    render json: PairingSerializer.new(pairing)
  end

end
