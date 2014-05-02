$(document).ready(function() {
	$('#exif').hide();
	$('#capture_exif').click(function() {
		var fRange = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22, 32];
		var sRangeStr = ['960', '480', '240', '120', '60', '30', '15', '8', '4', '2', '1', '1/2', '1/4', '1/8', '1/15', '1/30', '1/60', '1/125', '1/250', '1/500', '1/1000', '1/2000', '1/4000', '1/8000', '1/15000', '1/30000', '1/60000'];

		$('#capture_exif').hide();
		$('#exif').show();

		//get values from div
		var iso = $('#iso_select').find('option:selected').text();
		var aperture = $("#f_slider").slider("option", "value");
		var shutter = $("#s_slider").slider("option", "value");

		//write values to table elements
		$('#td_iso').text(iso);
		$('#td_aperture').text(fRange[aperture]);
		$('#td_shutter').text(sRangeStr[shutter]);
	});	
}); // end document js