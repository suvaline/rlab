json.array!(@labs) do |lab|
  json.extract! lab, :id, :name, :mingroup, :maxgroup
  json.url lab_url(lab, format: :json)
end
