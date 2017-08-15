require 'test_helper'

class VotesControllerTest < ActionDispatch::IntegrationTest
  test "should get add" do
    get votes_add_url
    assert_response :success
  end

  test "should get remove" do
    get votes_remove_url
    assert_response :success
  end

end
