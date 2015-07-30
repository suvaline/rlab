class CreateLabSettings < ActiveRecord::Migration
  def change
    create_table :lab_settings do |t|
      t.references :lab, index: true, foreign_key: true
      t.integer :max_steps
      t.integer :total_steps
      t.integer :step_length
      t.string :extra_properties

      t.timestamps null: false
    end
  end
end
