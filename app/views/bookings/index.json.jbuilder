json.array!(@bookings) do |booking|
  json.extract! booking, :id, :start, :step, :max_n, :total_n, :lab_id, :user_id, :group_id
  json.url booking_url(booking, format: :json)
end
