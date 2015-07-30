class RemoveMaxNAndTotalNFromBookings < ActiveRecord::Migration
  def change
    remove_column :bookings, :max_n, :integer
    remove_column :bookings, :total_n, :integer
  end
end
