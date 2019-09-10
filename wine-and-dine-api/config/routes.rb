Rails.application.routes.draw do
  resources :foods
  resources :pairings
  resources :wines
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
