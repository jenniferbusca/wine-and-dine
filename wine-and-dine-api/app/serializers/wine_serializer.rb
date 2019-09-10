class WineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :varietal, :body
  has_many :foods, through: :pairings
end
