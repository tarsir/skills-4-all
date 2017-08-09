class CreateUserSkillVotes < ActiveRecord::Migration[5.1]
  def change
    create_table :user_skill_votes do |t|
      t.references :voter
      t.references :receiver
      t.references :skill, foreign_key: true

      t.timestamps
    end
  end
end
