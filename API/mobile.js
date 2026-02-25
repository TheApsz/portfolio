$(document).ready(function() {
  function updateClasses() {
    if ($(window).width() < 1100) {
      $('.desktop').hide();
      $('.mobile').show();
    } else {
      $('.desktop').show();
      $('.mobile').hide();
    }
  }
  
  updateClasses();
  window.addEventListener('resize', updateClasses);
});