require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Joe", last_name: "Boe", email: "bo@jo.com",
                      password: "abcd123", password_confirmation: "abcd123")
  end

  test "should start valid" do
    assert @user.valid?
  end

  test "should require name" do
    @user.first_name = ""
    assert_not @user.valid?

    @user.last_name = ""
    @user.first_name = "Joe"
    assert_not @user.valid?
  end

  test "should require email" do
    @user.email = ""
    assert_not @user.valid?
  end

  test "should require unique (case insensitive) email" do
    copy_user = @user.dup
    copy_user.email = @user.email.upcase
    @user.save
    assert_not copy_user.valid?
  end

  test "should require password" do
    @user.password = @user.password_confirmation = " " * 10
    assert_not @user.valid?
  end
end
