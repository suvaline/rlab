json.array!(@lab_settings) do |lab_setting|
  json.extract! lab_setting, :id, :lab_id, :max_steps, :total_steps, :step_length, :extra_properties
  json.url lab_setting_url(lab_setting, format: :json)
end
