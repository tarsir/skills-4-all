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
end
