class ApiController < ActionController::API
  before_action :require_login!

  def user_signed_in?
    current_user.present?
  end

  def current_user
    @_current_user ||= authenticate_token
  end

  def require_login!
    return true if authenticate_token
    render json: { errors: [ { detail: "Forbidden" } ] }, status: 401
  end

  private
  def authenticate_token
    if params[:auth_token]
      User.find_by(auth_token: token)
    else
      false
    end
  end

end
