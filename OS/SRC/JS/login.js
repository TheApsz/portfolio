function LoginDateTime() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  $('#login .time').text(`${hours}:${minutes}`);

  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const dayNumber = now.getDate();
  $('#login .date').text(`${dayName}, ${monthName} ${dayNumber}`);
}
LoginDateTime();
setInterval(LoginDateTime, 1000);


$(document).ready(function() {
    $('.loginSelect .card').on("click", function() {
        if ($(this).hasClass("active")) {
            // Nothing
        } else {
            console.log("Switched user")
            $('.loginSelect .card').removeClass('active');
            $(this).addClass('active');
            var username = $(this).find('.cardDetail h1').text();
            $('.loginSelectedUser').text(username);
            $('.loginSelectedUser').removeClass("pop");
            void $('.loginSelectedUser')[0].offsetWidth;
            $('.loginSelectedUser').addClass("pop");

            if (username === "Guest") {
                $('.loginRemind').addClass("hidden");
                $('.loginType').addClass("hidden");
            } else {
                $('.loginRemind').removeClass("hidden");
                $('.loginType').removeClass("hidden");
            }
        };
    });
});

$(document).ready(function() {
    var prevLength = 0;
    var cleared = false;
    var initialText = $('.loginTypePassword').html();

    $('.loginTypeBack').on('input', function() {
        if (!cleared) {
            $('.loginTypePassword').empty();
            cleared = true;
        }

        var val = $(this).val();

        if (val.length === 0) {
            $('.loginTypePassword').html(initialText);
            cleared = false;
            prevLength = 0;
            return;
        }
    
        if (val.length > prevLength) {
            $('.loginTypePassword').append('<span>' + val[val.length - 1] + '</span>');
        } else {
            var diff = prevLength - val.length;
            for (var i = 0; i < diff; i++) {
                $('.loginTypePassword span:last-child').remove();
            }
        }
    
        prevLength = val.length;
    });
    $('.loginTypeBack').on('keyup', function(e) {
        if (e.getModifierState('CapsLock')) {
            $('.loginFlexCaps').text('Caps lock on');
            $('.loginFlexCaps').addClass('active');
        } else {
            $('.loginFlexCaps').text('Caps lock off');
            $('.loginFlexCaps').removeClass('active');
        }
    });
});