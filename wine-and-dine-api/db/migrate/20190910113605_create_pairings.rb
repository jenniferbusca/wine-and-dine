class CreatePairings < ActiveRecord::Migration[5.2]
  def change
    create_table :pairings do |t|
      t.references :food, foreign_key: true
      t.references :wine, foreign_key: true

      t.timestamps
    end
  end
end
