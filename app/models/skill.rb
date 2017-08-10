class Skill < ApplicationRecord
  validates :description, presence: true, uniqueness: { case_sensitive: false }
  has_many :user_skills
  has_many :users, through: :user_skills
  has_many :user_skill_votes
end
