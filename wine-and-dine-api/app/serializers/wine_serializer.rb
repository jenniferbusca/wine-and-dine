class WineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :varietal, :category
  has_many :foods, through: :pairings
end
