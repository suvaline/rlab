class Lab < ActiveRecord::Base
  has_secure_password
  has_and_belongs_to_many :users
  has_and_belongs_to_many :groups
def to_s
  	"#{name}  "
  end
end
