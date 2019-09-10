class CreateWines < ActiveRecord::Migration[5.2]
  def change
    create_table :wines do |t|
      t.string :varietal
      t.string :sweetness
      t.string :acidity
      t.string :tannin
      t.string :body

      t.timestamps
    end
  end
end
