class CreateLabsUsers < ActiveRecord::Migration
  def change
    create_table :labs_users do |t|
    	t.integer :lab_id
    	t.integer :user_id
    end
  end
end
