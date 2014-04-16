$(document).ready(function() {
  /* slider js */
  
  // aperture slider
  $( "#f_slider" ).slider({ 
    animate: "slow", // or "fast"
    max: 22,
    min: 1,
    step: 0.5,
    value: 3.5
  });
  // shutter speed slider
  $( "#s_slider" ).slider({ 
    animate: "slow", // or "fast"
    max: 30,
    min: 0.00025, // 1/4000
    step: 1,
    value: 1
  });
  // end slider js

  //$( "button#f_lock" ).click(fuction() {
    //$( "f_slider" ).slider( "disable" );
  //});
}); // end document js