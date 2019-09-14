# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
sauvignon_blanc = Wine.create(varietal: "sauvignon blanc", category: "white")
pinot_noir = Wine.create(varietal: "pinot noir", category: "red")
merlot = Wine.create(varietal: "merlot", category: "red")

feta_cheese = Food.create(name: "feta cheese", category: "cheese")
goat_cheese = Food.create(name: "goat cheese", category: "cheese")
pine_nuts = Food.create(name: "pine nuts", category: "nut")
chicken = Food.create(name: "chicken", category: "meat")
salmon = Food.create(name: "salmon", category: "fish")
tuna = Food.create(name: "tuna", category: "fish")

feta_cheese_sauvignon_blanc = Pairing.create(food: feta_cheese, wine: sauvignon_blanc)
goat_cheese_sauvignon_blanc = Pairing.create(food: goat_cheese, wine: sauvignon_blanc)
goat_cheese_pinot_noir = Pairing.create(food: goat_cheese, wine: pinot_noir)
salmon_pinot_noir = Pairing.create(food: salmon, wine: pinot_noir)
tuna_merlot = Pairing.create(food: tuna, wine: merlot)
sauvb_pine = Pairing.create(food: pine_nuts, wine: sauvignon_blanc)
