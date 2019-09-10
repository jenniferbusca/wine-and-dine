class FoodSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :category
  has_many :wines, through: :pairings
end
