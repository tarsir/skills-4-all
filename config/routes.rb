Rails.application.routes.draw do
  scope '/api' do
    post "/login", to: "sessions#create"
    post "/logout", to: "sessions#destroy"

    post 'votes/add'
    post 'votes/remove'

    resources :skills
    resources :users
    devise_for :admin_users, ActiveAdmin::Devise.config
    ActiveAdmin.routes(self)
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  end

  get '*path', to: "application#fallback_index_html", constraints: -> (request) do
    !request.xhr? && request.format.html?
  end
end
