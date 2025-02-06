$(document).ready(function() {
       $("#control-settings-button").click(function() {
              $("#control-settings").toggleClass("active");
       });
});

$(document).ready(function() {
       setInterval(function() {
           let randomNum = Math.floor(Math.random() * 21) + 40; // Random number between 40 and 60
           $("#tick-random").text(randomNum);
       }, 50);
   });
   
   $(document).ready(function() {
       let backendPing = 0;
   
       // Increase backendPing by 1 every 30ms
       setInterval(function() {
           backendPing++;
           $("#backendping").text(backendPing);
       }, 30);
   
       // Add 3650 when any .control-button is clicked
       $(".control-button").click(function() {
           backendPing += 3650;
           $("#backendping").text(backendPing);
       });
   });
   
   