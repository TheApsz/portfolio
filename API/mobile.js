$(document).ready(function() {
  function updateClasses() {
    if ($(window).width() < $(window).height()) {
      $('.desktop').removeClass('desktop').addClass('mobile');
      console.log('Mobile');
    } else {
        console.log('Desktop');
    }
  }
  
  updateClasses();
  window.addEventListener('resize', updateClasses);
});