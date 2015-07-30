class Booking < ActiveRecord::Base
  belongs_to :lab
  belongs_to :user
  belongs_to :group
end
