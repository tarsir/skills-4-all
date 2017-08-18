class User < ApplicationRecord
  before_save { self.email = email.downcase }

  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
    format: { with: VALID_EMAIL_REGEX },
    uniqueness: { case_sensitive: false }

  validates :password, presence: true, length: { minimum: 6 }
  has_secure_password

  has_many :user_skills
  has_many :user_skill_votes, foreign_key: "receiver_id"
  has_many :skills, through: :user_skills

  # Find the user with the given email for authentication purposes
  def self.find_auth_user(search_email) 
    User.find_by email: search_email
  end

  def generate_auth_token
    token = SecureRandom.hex
    self.update_columns(auth_token: token)
    token
  end

  def invalidate_auth_token
    self.update_columns(auth_token: nil)
  end

  def valid_password?(password)
    self.authenticate(password)
  end

  def skill_related_users
    related_users = []
    for s in self.user_skills do
      other_users = UserSkill.includes(:user).where.not(user_id: self.id).where(skill_id: s.skill_id).all
      for u in other_users do
        user = u.user
        related_users.push(Hash["name" => user.first_name + " " + user.last_name, "id" => user.id])
      end
    end
    related_users.uniq { |user| user["id"]}
  end

  def total_votes
    UserSkillVote.where(receiver: self.id).count
  end

end
