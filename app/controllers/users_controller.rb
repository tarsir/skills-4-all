class UsersController < ApiController
  skip_before_action :require_login!, only: [:create, :index]
  before_action :set_user, only: [:update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users.as_json(methods: [:total_votes], except: ["password_digest", "auth_token", "created_at", "updated_at"])
  end

  # GET /users/1
  def show
    user = User.includes(:user_skill_votes, :user_skills => [:skill => [ :user_skill_votes]] ).find(params[:id])
    render json: user.as_json(
      :include => [
        :user_skill_votes, 
        { 
          :user_skills => {
            :include => { 
              :skill => {
                :include => [ :user_skill_votes ] 
              }
            },
            :methods => [ 
              :voter_list, 
              :skill_vote_count, 
              :skill_description 
              ]
            } 
          }
        ], 
        :methods => [
          :skill_related_users
        ],
        :except => ["password_digest", "auth_token"]
      )
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password)
    end
end
