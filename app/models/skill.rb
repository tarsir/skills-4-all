class Skill < ApplicationRecord
  validates :description, presence: true
  has_many :user_skills
  has_many :users, through: :user_skills
end
