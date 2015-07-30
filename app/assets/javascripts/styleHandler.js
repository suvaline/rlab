$(document).ready(function()
{
	handleDynamicSize();
});

$( window ).resize( function ()
{
	handleDynamicSize();
} );

function handleDynamicSize()
{
	var window_width = parseInt($( window ).innerWidth());
	var window_height = parseInt($( window ).innerHeight());
	// debugging
	//$("#content").html("Width: " + window_width + "<br />Height: " + window_height + "<br />");

	handleCollums( window_width, window_height );

}

function handleCollums( window_width, window_height )
{
	var left_collumn_width = parseInt($("#navigator").outerWidth());
	
	// set distance and width of right collumn
	$("#content").css({ "left" : left_collumn_width, "max-width" : window_width - left_collumn_width });
	// set left collumn height to bottom of page
	var header_height = parseInt($("#header").outerHeight());
	$("#navigator").css("height", window_height - header_height);
	
	// debugging
	//$("#content").append("Left collumn width: " + left_collumn_width + "<br />");
}