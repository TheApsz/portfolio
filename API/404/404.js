$(function() {
    $("#reportSend").on("click", function() {
        $("#reportFeedback").addClass("active");
        console.log("Evil report has been sent")
        
        setTimeout(function() {
            $("#reportFeedback").removeClass("active");
        }, 1500);
    });
});

$(function() {
    var $text = $(".contentDescription");
    
    var messages = [
        "Well, this is awkward.",
        "oops..?",
        "Maybe lets try that again next time?",
        "Okay! so what you want to do is either report the problem and go home... or just go home",
        "Check if the link youre on is valid. or dont. i dont care",
        "418 would be a lot funnier but i kinda HAVE to follow the actual error codes... evil.",
    ];
    
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];
    $text.text(randomMessage);
});