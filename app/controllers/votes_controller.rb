class VotesController < ApiController
  def add
    voter = params[:voter]
    receiver = params[:receiver]
    skill_id = params[:skillId]

    vote = UserSkillVote.create(voter_id: voter, receiver_id: receiver, skill_id: skill_id)
    if vote
      render json: vote, status: :created
    else
      render json: vote.errors, status: :unprocessable_entity
    end
  end

  def remove
    voter = params[:voter]
    receiver = params[:receiver]
    skill_id = params[:skillId]

    vote = UserSkillVote.find_by voter_id: voter, receiver_id: receiver, skill_id: skill_id
    if vote
      vote.destroy
    end
  end
end
