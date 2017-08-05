class CreateSkillsAndJoinTable < ActiveRecord::Migration[5.1]
  def change
    create_table :skills do |t|
      t.string :description

      t.timestamps
    end

    create_table :user_skills do |t|
      t.belongs_to :user, index: true
      t.belongs_to :skill, index: true
    end

    add_index :user_skills, [:user_id, :skill_id], unique: true
  end
end
