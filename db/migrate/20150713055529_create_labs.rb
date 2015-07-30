class CreateLabs < ActiveRecord::Migration
  def change
    create_table :labs do |t|
      t.string :name
      t.string :password_digest
      t.integer :mingroup
      t.integer :maxgroup

      t.timestamps null: false
    end
  end
end
