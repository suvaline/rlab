module LabSettingsHelper
	def jasonlabsettings(lab_id)
		
		
			@labsettings=LabSetting.where("lab_id = ?",lab_id)
			raw(@labsettings.first.to_json only: [:max_steps,:total_steps,:step_length])
	end
end
