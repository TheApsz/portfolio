window.onload = function() {
    console.log("Window loaded, checking for elements");

    // Declare the interval variable
    var checkInterval;

    function checkLoadStatus() {
        var allLoaded = true;
        console.log("Checking load status...");

        // Check if all elements with the class 'loadCheck' and their children have been loaded
        $('.loadCheck').each(function() {
            if (!$(this).hasClass('loaded') || $(this).find('.loadCheck:not(.loaded)').length > 0) { // If the element or its children don't have 'loaded' class
                allLoaded = false;
                console.log("Element or its children not loaded: ", this);
            }
        });

        // If all elements are loaded, remove the #loading element and stop the loop
        if (allLoaded) {
            console.log("All elements loaded. Removing #loading.");
            $('#loading').removeClass('active');

            setTimeout(function() {
                $('#loading').remove();
            }, 500);

            // Stop the interval loop
            clearInterval(checkInterval);
            console.log("Interval stopped.");
        } else {
            console.log("Some elements are still not loaded.");
        }
    }

    checkInterval = setInterval(checkLoadStatus, 1000);

    // Manually add 'loaded' class when the div or any element is ready
    $('.loadCheck').each(function() {
        if (!$(this).hasClass('loaded')) {
            $(this).addClass('loaded');
            console.log(`Loaded element: ${this.id ? this.id : 'No ID'}`);
        } else {
            console.log('Element is already loaded');
        }
    });
};