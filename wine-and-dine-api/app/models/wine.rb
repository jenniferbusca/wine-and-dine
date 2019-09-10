class Wine < ApplicationRecord
  has_many :pairings
  has_many :foods, through: :pairings
end
