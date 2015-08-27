$( window ).resize( function() {
	
	calculateMaxSteps();
	generateBook( book_start_time + timeline_offset );
	generateScrollButtons(); // puts scroll buttons
} );

$(document).ready(function()
{

	LAB_SETTINGS();
	CALCULATE_VARIABLES();
	BOOKINGS();
	calculateMaxSteps();
	stepsPerHour = 60 / time_step;
	generateBook( book_start_time );
	generateScrollButtons(); // puts scroll buttons
});

function calculateMaxSteps()
{
	taken_width = parseInt($("#navigator").outerWidth()) + start_offset;
	free_width = parseInt($( window ).innerWidth()) - taken_width;
	max_steps = parseInt( ((free_width - 100) / time_step )*(60 / stretch));
}
// GLOBAL VARIABLES

max_steps = 30; // how many steps we fit onto screen at a time
stretch = 30; // how many px we stretch 1 hour time;

// LAB SETTINGS
max_times = 5; // how many times can user book at a time
time_offset = 0;  
time_step = 15; // each unit = 15 minutes

// CALCULATED VARIABLES
book_start_time = 0;
book_start_year = 0;
book_start_month = 0;
book_start_day   = 0;

// BOOKINGS
var book_times_start = [];
var book_times_steps = [];

function LAB_SETTINGS()
{
	var lab = jasonlabsettings;
	max_times = lab.max_steps - 1;
	time_step = lab.step_length / 60;
}

function BOOKINGS()
{
	for( i=0; i < jasonbookings.length; i++ )
	{
		
		var book = jasonbookings[ i ];
		
		var start_date = new Date( book.start );
		startTime = parseInt( (start_date.getMinutes() + (start_date.getHours())*60) / time_step );

		book_times_start.push( startTime );
		book_times_steps.push( parseInt(book.step) );
		
	}
	
	//*/
}

function CALCULATE_VARIABLES()
{
	var date = new Date();
	minutes = date.getMinutes() + date.getHours()*60;
	
	book_start_year  = 1900 + date.getYear();
	book_start_month = 1 + date.getMonth();
	book_start_day   = date.getDate();

	roundedMinutes = minutes - ( (minutes + 60 - time_offset) % time_step );
	book_start_time = roundedMinutes / time_step;
}

// NEW BOOKING SYSTEM

// global variables
book_height = 40;
book_top_offset = 20;
tooltip_top_offset = 5;

start_offset = 15; // how much we are offseting our books

stepsPerHour = 60;

// scroll timeline
timeline_offset = 0; // how many timesteps timeline is scrolled left

// increment & decrement functions
scrolling = false;

function switchDecrementOffset(val)
{
	if( scrolling && val ) { return; }
	//switchIncrementOffset(false);
	scrolling = val;
	DecrementOffset();
}

function switchIncrementOffset(val)
{
	if( scrolling && val ) { return; }
	//switchDecrementOffset(false);
	scrolling = val;
	IncrementOffset();
}

function DecrementOffset()
{
	if( timeline_offset - 1 >= 0 && scrolling)
	{
		timeline_offset -= 1;
		generateBook( book_start_time + timeline_offset );
		setTimeout( DecrementOffset, 100 );		
	}
}
function IncrementOffset()
{
	if( !scrolling ) { return; }
	timeline_offset += 1;
	generateBook( book_start_time + timeline_offset);
	setTimeout( IncrementOffset, 100 );
}
//---

// generate bookings
function minutesToTime( minutes )
{
	var hours = parseInt( minutes / 60 ) % 24;
	var minutes = parseInt( minutes % 60 );
	return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
}

// FUNCTIONS FOR BOOK TIME SELECTION
selected_book_index = -1;
possible_book_end = 0; // selected_book_index offset
selected_book_steps = 0;

locked = false;

function generateBook(book_start_time)	// takes automaticly all needed data
{	
	selected_book_index = -1;
	possible_book_end = 0; // selected_book_index offset
	selected_book_steps = 0;

	locked = false;
	$("#book-times").html("");
	$("#book-times").css("height", book_height + book_top_offset)
	generateHours(book_start_time);
	generateBookings(book_start_time);
}

function generateScrollButtons()
{   
	$("#book-scroller").html("");
	$("#book-scroller").append("<span class=\"arrow-left\" style=\" top: "+ book_top_offset +"px; \" onmouseenter=\"switchDecrementOffset(true);\" onmouseout=\"switchDecrementOffset(false);\" ><span>");

	$("#book-scroller").append("<span class=\"arrow-right\" style=\" top: "+ book_top_offset +"px; left: "+ ((max_steps + 1)*stretch/stepsPerHour + start_offset + 1) +"px; \" onmouseenter=\"switchIncrementOffset(true);\" onmouseout=\"switchIncrementOffset(false);\" ><span>");
}

function generateHours(book_start_time)
{
	startHour = parseInt(book_start_time*time_step / 60);
	offset = ((stepsPerHour - book_start_time % stepsPerHour) / stepsPerHour ) * stretch;
	start = startHour;
	if( offset == stretch )
	{
		offset = 0;
	}
	else { start += 1; }
	
	offset += start_offset - 6;
	for( i=start; i <= start + parseInt(max_steps/stepsPerHour) && offset <= max_steps*stretch/stepsPerHour + start_offset; i++ )
	{
		hours =  i % 24;
		$("#book-times").append("<span class=\"hour\" style=\"left:"+ offset +"px; \">"+ ( (hours < 10 ? "0" : "" ) + hours) +"</span>");
		offset += stretch;
	}
}

function generateBookings(book_start_time)
{
	width = ( 1 / stepsPerHour ) * stretch ;
	var book_times = $("#book-times");
	for(i=0; i <= max_steps; i++)
	{
		var minutes = (book_start_time + i)*time_step % 60;
		minutes = ( minutes < 10 ? "0" : "") + minutes;
		book_times.append("<div class=\"book\" style=\"height: "+book_height+"px; width: "+ width +"px; top: "+book_top_offset+"px; left:"+ (start_offset + i*width) +"px; \" onclick=\"clickBook("+i+", $(this));\" onmouseenter=\"displayTime("+(i + timeline_offset)+","+(i*width)+"); addBookTimes( "+i+");\" onmouseout=\"displayTime(-1, 0)\" ></div>");
	}
	
	// generate taken times
	var books = $(".book").toArray();
	for(i=0; i < book_times_start.length; i++)
	{
		for(j=0; j<book_times_steps[i]; j++)
		{
			var book = $(books[ book_times_start[i] + j - book_start_time ]);
			book.attr("class","book forbiden-time");
			book.attr("onclick", "clearSelectedBook()");
		}
	}
}

/*
	if something on bookes is being clicked it runs this script:
	checks if we have already selected something
	if false -> paint possible times
*/
function displayTime( index , posX)
{
	var tt = $("#tooltip");
	if( index == -1 ) { tt.css("visibility", "hidden"); return; }
	
	if( !locked && selected_book_index != -1 && index >= timeline_offset + selected_book_index && index <= timeline_offset + selected_book_index + possible_book_end)
	{
		tt.html( minutesToTime( (timeline_offset + selected_book_index + book_start_time)*time_step ) +"&#8594;"+minutesToTime( ( index + book_start_time + 1)*time_step ) );
	}
	else {
		tt.html( minutesToTime( (index + book_start_time)*time_step ) );
	}
	
	tt.css("visibility", "visible");
	tt.css("left", posX);
	tt.css("top", book_height + book_top_offset + tooltip_top_offset);
}

function clickBook( index, element )
{
	if( !locked && selected_book_index == -1 )
	{
		// means we haven't selected anything and need to generate possible booking times
		element.attr("class","book selected-book");
		selected_book_index = index;
		
		displayTime( index , index * (( 1 / stepsPerHour ) * stretch) );
		// draw possible times
		possible_book_end = 0;
		var books = $(".book").toArray();
		for( i=1; i <= max_times; i++ )
		{
			var b = $(books[ selected_book_index + i ]);
			if( b.hasClass("forbiden-time") ) { break; }
			b.attr("class","book available-book");
			possible_book_end += 1;
		}
	}
	else if( index < selected_book_index || index > selected_book_index + possible_book_end || locked )
	{
		locked = false;
		clearSelectedBook();
	}
	else
	{
		//click was inside of allowed area, we generate form
		generateBookingForm();
	}
	
}

/*
	If we are hovering we can select more time
	gets in index of element we are hovering atm
	adds more time if we are positioned right from last selected time and removes time if we are left
*/
function addBookTimes( index )
{
	if( locked ) { return; }
	// find if we need to add or remove
	if( selected_book_index == -1) { return; }
	var books = $(".book").toArray();
	if( index > selected_book_index + selected_book_steps )
	{
		// draw until index or to the end of possible book end
		for( i=selected_book_index + selected_book_steps + 1; i <= index && i <= selected_book_index + possible_book_end; i++ )
		{
			$( books[i] ).attr("class", "book selected-book");
		}
		selected_book_steps = index - selected_book_index;
		if( selected_book_steps >= possible_book_end ) { selected_book_steps = possible_book_end; }
	}
	else if( index <= selected_book_index + selected_book_steps )
	{
		for( i=selected_book_index + selected_book_steps; i > selected_book_index && i > index; i-- )
		{
			$( books[i] ).attr("class", "book available-book");
		}
		selected_book_steps = index - selected_book_index;
		if( selected_book_steps < 0 ) { selected_book_steps = 0; }
	}
}

function clearSelectedBook()
{
	if( selected_book_index == -1 ) { return; }
	// get all books
	var books = $(".book").toArray();
	// turn selected_book_index to normal
	for( i=0; i <= possible_book_end; i++ )
	{		
		$(books[ selected_book_index + i ]).attr("class","book");
	}
	
	selected_book_steps = 0;
	selected_book_index = -1;
}

// generate booking form
function generateBookingForm()
{
	locked = true;
	var startTime = book_start_time + timeline_offset + selected_book_index;
	var html = "";
	html+="Book from "+ minutesToTime( (startTime)*time_step ) +" to "+minutesToTime( (startTime + selected_book_steps + 1)*time_step );
	html+=" as <select id=\"isGroup\"><option value=\"false\">User</option><option value=\"true\">Group</option>" + "</select>";
	
	html+="<input type=\"button\" value=\"Book\" class=\"button\" onclick=\"sendBookingData();\"/>";
	html+="<p><i>Click outside of possible book times to clear</i></p>"
	$("#book-info").html( html );
}

function sendBookingData()
{
	var year  = book_start_year;
	var month = book_start_month;
	var day   = book_start_day;
	
	var startTime = (book_start_time + timeline_offset + selected_book_index ) * time_step;
	
	var hour  = parseInt(startTime / 60) % 24;
	var minute= parseInt(startTime % 60);

	// fix incorrect day and month
	day += parseInt(startTime / 1440);
	
	if( (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31 )
	{
		day -= 31;
		month++;
		if( month > 12 )
		{
			month = 0;
			year++;
		}
	}
	else if( month != 2 && day > 30)
	{
		day -= 30;
		month++;
		if( month > 12 )
		{
			month = 0;
			year++;
		}
	}
	else if( day > 28 )
	{
		day -= 28;
		month++;
	}

	var query = [
		["booking[start(1i)]" , year],
		["booking[start(2i)]", month],
		["booking[start(3i)]", day],
		["booking[start(4i)]", hour],
		["booking[start(5i)]", minute],
		["booking[step]", selected_book_steps ],
		["booking[lab_id]",1],
		["booking[user_id]",1],
		["booking[group_id]",3],
		["commit","Create Booking"]
	];

	post("", query, "get" ); 
}

function post(path, params, method) 
{
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
	
	for(var i = 0; i < params.length; i++)
	{
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name",  params[i][0]);
		hiddenField.setAttribute("value", params[i][1]);
		
		form.appendChild(hiddenField);
	}

    document.body.appendChild(form);
    form.submit();
}
