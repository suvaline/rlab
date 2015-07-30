module BookingsHelper
	def jasonbookings
		now = DateTime.now
		@book=Booking.where("start > ? && lab_id = ? ", now, selected_lab ).order("start ASC")
		#raw(@book[0].to_json only: [:start, :step, :lab_id, :user_id,:group_id])
		array=Array.new
		$i=0
		$j=@book.length
		until $i == $j do
   			array.push((@book[$i].to_json only: [:start, :step]))
   			$i +=1;
		end
		raw(array)

	end
	def jasonlabsettings
		
		@labsettings=LabSetting.where("lab_id = ?",selected_lab)
		raw(@labsettings[0].to_json only: [:max_steps,:total_steps,:step_length])
	end
end
