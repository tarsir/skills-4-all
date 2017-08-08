class SessionsController < ApiController
  skip_before_action :require_login!, only: [:create]

  def create
    login_attempt = User.find_auth_user(params[:user_login][:email].downcase)
    login_attempt ||= User.new

    if login_attempt.valid_password?(params[:user_login][:password])
      auth_token = login_attempt.generate_auth_token
      render json: { auth_token: auth_token }
    else
      invalid_login
    end
  end

  def destroy
    resource = current_user
    resource.invalidate_auth_token
    head :ok
  end

  private
    def invalid_login
      render json: { errors: [ { detail: "Error logging in. Please check your username and password." } ] }
    end
end
