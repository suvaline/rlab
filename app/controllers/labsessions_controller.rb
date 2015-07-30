class LabsessionsController < ApplicationController
  def new
  end

  def create
  	lab=Lab.find_by_id(params[:Labs])
  	session[:lab_id]=lab.id
  	redirect_to new_booking_path, notice: 'lab selected!'
  end

  def destroy
  	session[:lab_id]=nil
  	redirect_to root_url, notice: 'Select lab'
  end
end
