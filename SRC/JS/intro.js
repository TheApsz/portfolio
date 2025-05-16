$(document).ready(function() {
  $('#introChar, #introSkip').on('click', function() {
    $('#intro').removeClass('active').addClass('animation');

    setTimeout(function() {
      $('#intro').removeClass('animation').addClass('inactive');
      // Add the transition for #hero here
      $('#hero').removeClass('inactive').addClass('active');
    }, 2000); // 2000 milliseconds = 2 seconds
  });
});


