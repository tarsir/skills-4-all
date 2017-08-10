class SkillsController < ApiController
  before_action :set_skill, only: [:show, :update, :destroy]

  # GET /skills
  def index
    @skills = Skill.all

    render json: @skills
  end

  # GET /skills/1
  def show
    render json: @skill
  end

  # POST /skills
  def create
    @skill = Skill.new(skill_params)

    if @skill.save
      add_to_user
      render json: @skill, status: :created, location: @skill
    else
      render json: @skill.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_skill
      @skill = Skill.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def skill_params
      params.require(:skill).permit(:description)
    end

    def add_to_user
      voter = params[:voter], receiver = params[:receiver]
      pp @skill
      unless UserSkill.find_by user_id: receiver, skill_id: @skill.id
        UserSkill.create(user_id: receiver, skill_id: @skill.id)
      end

      unless UserSkillVote.find_by voter_id: voter, receiver_id: receiver, skill_id: @skill.id
        UserSkillVote.create(voter_id: voter, receiver_id: receiver, skill_id: @skill.id)
      end
    end
end
