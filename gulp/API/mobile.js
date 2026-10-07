$(document).ready(function() {
  function updateClasses() {
    if ($(window).width() < $(window).height()) {
      $('.responsive').addClass('mobile');
      console.log('Mobile');
    } else {
        $('.responsive').addClass('desktop');
        console.log('Desktop')
    }
  }
  
  updateClasses();
  window.addEventListener('resize', updateClasses);
});