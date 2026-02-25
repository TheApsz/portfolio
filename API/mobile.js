function updateClasses() {
    if ($(window).width() < 1100) {
      $('.Wcheck').removeClass('Wcheck').addClass('mobile');
      $('.desktop').hide();
    } else {
      $('.Wcheck').removeClass('Wcheck').addClass('desktop');
      $('.mobile').hide();
    }
  }

  updateClasses();
  
  $(window).resize(updateClasses);
