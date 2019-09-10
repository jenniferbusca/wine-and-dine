class PairingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :food, :wine
  belongs_to :food
  belongs_to :wine
end
