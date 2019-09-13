class Wine < ApplicationRecord
  has_many :pairings
  has_many :foods, through: :pairings
  validates :varietal, presence: true,
  uniqueness: {case_sensitive: false}
end
