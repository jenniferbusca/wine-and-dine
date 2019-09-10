class CreateFoodPairings < ActiveRecord::Migration[5.2]
  def change
    create_table :food_pairings do |t|
      t.string :food_name
      t.string :food_type
      t.references :wine, foreign_key: true

      t.timestamps
    end
  end
end
