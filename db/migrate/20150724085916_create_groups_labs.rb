class CreateGroupsLabs < ActiveRecord::Migration
  def change
    create_table :groups_labs do |t|
    	t.integer :group_id
      	t.integer :lab_id
    end
  end
end
