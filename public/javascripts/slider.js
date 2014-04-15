$(document).ready(function() {
  // slider js
  // aperture slider
  $('#f_slider').slider({
    formater: function(value) {
      return 'f/' + value;
    }
  });
  $('#f_lock').click(function() {
    if(this.checked) {
      var status = $('#f_slider').slider('isEnabled');
      alert(status);
      $('#f_slider').slider('enable');
    }
    else {
      $('#f_slider').slider('disable'); 
    }
  });

  // shutter speed slider
  $('#s_slider').slider({
    formater: function(value) {
      return value + 's';
    }
  });
  $('#s_lock').click(function() {
    if(this.checked) {
      $('#s_slider').slider('enable');
    }
    else {
      $('#s_slider').slider('disable'); 
    }
  }); // end slider js
}); // end document js