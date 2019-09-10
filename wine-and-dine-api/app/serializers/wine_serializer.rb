class WineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :varietal, :sweetness, :acidity, :tannin, :body
  has_many :food_pairings
end
