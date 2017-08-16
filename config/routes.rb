Rails.application.routes.draw do
  post 'votes/add'

  post 'votes/remove'

  post "/login", to: "sessions#create"
  post "/logout", to: "sessions#destroy"

  resources :skills
  resources :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
