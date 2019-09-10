class FoodPairingSerializer
  include FastJsonapi::ObjectSerializer
  attributes :food_name, :food_type, :wine_id
  belongs_to :wine
end
