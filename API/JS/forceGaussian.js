// Run as soon as <body> is available, but before all elements load
(function injectSVGwhenBodyReady() {
  function injectSVG() {
    // Create the SVG element as a string
    var svgElement = `
      <svg xmlns=\"http://www.w3.org/2000/svg\">
        <filter id=\"frost-high\" color-interpolation-filters=\"sRGB\">
          <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"100\"/>
        </filter>
        <filter id=\"frost-med\" color-interpolation-filters=\"sRGB\">
          <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"50\"/>
        </filter>
        <filter id=\"frost-low\" color-interpolation-filters=\"sRGB\">
          <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"25\"/>
        </filter>
      </svg>`;

    // Use jQuery to insert before first <style> in <body>, else append to <body>
    var $body = $("body");
    if ($body.length === 0) return; // body not yet available
    var $firstStyle = $body.children("style").first();
    if ($firstStyle.length) {
      $firstStyle.before(svgElement);
    } else {
      $body.append(svgElement);
    }
  }

  // If body is already available, run now; else, poll until it is
  if (document.body) {
    injectSVG();
  } else {
    var interval = setInterval(function() {
      if (document.body) {
        clearInterval(interval);
        injectSVG();
      }
    }, 1);
  }
})();