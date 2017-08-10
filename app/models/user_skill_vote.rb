class UserSkillVote < ApplicationRecord
  belongs_to :skill
  belongs_to :voter, :class_name => "User", :foreign_key => "voter_id"
  belongs_to :receiver, :class_name => "User", :foreign_key => "receiver_id"
end
