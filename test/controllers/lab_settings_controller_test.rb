require 'test_helper'

class LabSettingsControllerTest < ActionController::TestCase
  setup do
    @lab_setting = lab_settings(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:lab_settings)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create lab_setting" do
    assert_difference('LabSetting.count') do
      post :create, lab_setting: { extra_properties: @lab_setting.extra_properties, lab_id: @lab_setting.lab_id, max_steps: @lab_setting.max_steps, step_length: @lab_setting.step_length, total_steps: @lab_setting.total_steps }
    end

    assert_redirected_to lab_setting_path(assigns(:lab_setting))
  end

  test "should show lab_setting" do
    get :show, id: @lab_setting
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @lab_setting
    assert_response :success
  end

  test "should update lab_setting" do
    patch :update, id: @lab_setting, lab_setting: { extra_properties: @lab_setting.extra_properties, lab_id: @lab_setting.lab_id, max_steps: @lab_setting.max_steps, step_length: @lab_setting.step_length, total_steps: @lab_setting.total_steps }
    assert_redirected_to lab_setting_path(assigns(:lab_setting))
  end

  test "should destroy lab_setting" do
    assert_difference('LabSetting.count', -1) do
      delete :destroy, id: @lab_setting
    end

    assert_redirected_to lab_settings_path
  end
end
