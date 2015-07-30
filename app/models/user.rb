class User < ActiveRecord::Base
  has_secure_password
  has_and_belongs_to_many :groups
  has_and_belongs_to_many :labs
  validates :first_name,
  presence: true
  validates :last_name,
  presence: true
  validates :email,
  presence: true,
  uniqueness: true,
  format: {
  	with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  }
  def to_s
  	"#{first_name} #{last_name} "
  end

end
