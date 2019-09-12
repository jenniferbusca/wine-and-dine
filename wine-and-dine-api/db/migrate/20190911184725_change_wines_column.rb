class ChangeWinesColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :wines, :body, :category
  end
end
