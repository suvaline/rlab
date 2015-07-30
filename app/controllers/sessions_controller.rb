class SessionsController < ApplicationController
  def new
  end

  def create
  	user = User.find_by_email(params[:email])
  	if user&&user.authenticate(params[:password])
  		session[:user_id]= user.id
  		redirect_to root_url, notice: 'Logged in!'
  	else
  		render :new
  	end
  end

  def destroy
  	session[:user_id]=nil
  	redirect_to root_url, notice: "Logged out!"
  end

  #Created a method to redirect users to login screen
    helper_method :sessioncheck
  def sessioncheck
    if current_user == nil
    redirect_to root_url, notice: "Please log in or register!"
    return
    end
  end

end
