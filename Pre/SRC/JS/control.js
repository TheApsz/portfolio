$(document).ready(function() {
       $("#control-r").click(function() {
           let $activeSlide = $("[id^=slide].active"); // Find the active slide
           let $nextSlide = $activeSlide.next("[id^=slide]"); // Find the next slide
   
           if ($nextSlide.length) { // If there's a next slide
               $activeSlide.removeClass("active");
               $nextSlide.addClass("active");
           }
       });
   
       $("#control-l").click(function() {
           let $activeSlide = $("[id^=slide].active"); // Find the active slide
           let $prevSlide = $activeSlide.prev("[id^=slide]"); // Find the previous slide
   
           if ($prevSlide.length) { // If there's a previous slide
               $activeSlide.removeClass("active");
               $prevSlide.addClass("active");
           }
       });
   });

   $(document).ready(function() {
       function updateSlideNumber() {
           let $activeSlide = $("[id^=slide].active").first(); // Find the first active slide
           if ($activeSlide.length) {
               $("#slidenumber").text($activeSlide.attr("id")); // Update #slidernumber text
           }
       }
   
       // Run updateSlideNumber every 500ms (0.5s)
       setInterval(updateSlideNumber, 500);
   });
   