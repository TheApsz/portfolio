$(document).ready(function() {
  var data = lGet('LUMEN');

  if (data === null) {
    $('body').attr('data-firsttime', 'true');
    lSet('LUMEN', { GLOBAL: { 
      firstTime: 'true'
    }});
  } else {
    $('body').attr('data-firsttime', data.GLOBAL.firstTime);
  }

  if ($('body').attr('data-firsttime') === 'true') {
    $('#main').addClass('activeTutorial');
  }
});