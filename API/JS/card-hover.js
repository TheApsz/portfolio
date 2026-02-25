$(document).ready(function () {
  $(".card-hover").each(function () {
    const card = this;
    let currentX = 0,
      currentY = 0;
    let targetX = 0,
      targetY = 0;

    // rotates the card based on mouse position
    $(card).on("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetX = ((y - centerY) / centerY) * 20;
      targetY = ((x - centerX) / centerX) * 20;
    });

    $(card).on("mouseleave", function () {
      targetX = 0;
      targetY = 0;
    });

    // animation loop
    function animate() {
      currentX += (targetX - currentX) * 0.1; // smooths out the thing
      currentY += (targetY - currentY) * 0.1;

      $(card).css(
        "transform",
        `rotateX(${-currentX}deg) rotateY(${currentY}deg)`
      );

      requestAnimationFrame(animate);
    }

    animate();
  });
});
