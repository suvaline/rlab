class LabSettingsController < ApplicationController
  before_action :set_lab_setting, only: [:show, :edit, :update, :destroy]

  # GET /lab_settings
  # GET /lab_settings.json
  def index
    @lab_settings = LabSetting.all
  end

  # GET /lab_settings/1
  # GET /lab_settings/1.json
  def show
  end

  # GET /lab_settings/new
  def new
    @lab_setting = LabSetting.new
  end

  # GET /lab_settings/1/edit
  def edit
  end

  # POST /lab_settings
  # POST /lab_settings.json
  def create
    @lab_setting = LabSetting.new(lab_setting_params)

    respond_to do |format|
      if @lab_setting.save
        format.html { redirect_to @lab_setting, notice: 'Lab setting was successfully created.' }
        format.json { render :show, status: :created, location: @lab_setting }
      else
        format.html { render :new }
        format.json { render json: @lab_setting.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lab_settings/1
  # PATCH/PUT /lab_settings/1.json
  def update
    respond_to do |format|
      if @lab_setting.update(lab_setting_params)
        format.html { redirect_to @lab_setting, notice: 'Lab setting was successfully updated.' }
        format.json { render :show, status: :ok, location: @lab_setting }
      else
        format.html { render :edit }
        format.json { render json: @lab_setting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lab_settings/1
  # DELETE /lab_settings/1.json
  def destroy
    @lab_setting.destroy
    respond_to do |format|
      format.html { redirect_to lab_settings_url, notice: 'Lab setting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lab_setting
      @lab_setting = LabSetting.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lab_setting_params
      params.require(:lab_setting).permit(:lab_id, :max_steps, :total_steps, :step_length, :extra_properties)
    end
end
