require 'test_helper'

class SkillTest < ActiveSupport::TestCase
  def setup
    @skill = Skill.new(description: "Javascript")
  end

  test "should start as valid" do
    assert @skill.valid?
  end

  test "should require description" do
    @skill.description = ""
    assert_not @skill.valid?
  end
end
