module GroupsHelper
def sessioncheck
    if current_user == nil
    controller.redirect_to root_url, notice: "Please log in or register!"
    end
end
  
end
