class UserSkill < ApplicationRecord
    belongs_to :user
    belongs_to :skill

    def skill_vote_count
      user.user_skill_votes.where(skill_id: skill).count
    end

    def skill_description
      skill.description
    end
end
