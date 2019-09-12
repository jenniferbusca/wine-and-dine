Rails.application.routes.draw do
  resources :foods
  resources :pairings
  resources :wines

  get 'newpairing', to: 'pairings#newpairing' 
  post 'newpairing', to: 'pairings#newpairing'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
