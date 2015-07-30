class Instructors < ActiveRecord::Migration
  def change
  	  create_table :instructors do |t|
      t.integer :user_id
      t.integer :lab_id
  	  end
  end
end
