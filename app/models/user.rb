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
  has_many :skills, through: :user_skills
  belongs_to :voter, :class_name => "UserSkillVote"
  belongs_to :receiver, :class_name => "UserSkillVote"

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

end
