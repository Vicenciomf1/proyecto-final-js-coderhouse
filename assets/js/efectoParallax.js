(function() { //Este efecto parallax venía por defecto en el tema de bootstrap, así que decidí dejarlo pq se veía bonito, y cambiarle los var por let
  "use strict"; // Start of use strict

  function initParallax() {

    if (!('requestAnimationFrame' in window)) return;
    if (/Mobile|Android/.test(navigator.userAgent)) return;

    let parallaxItems = document.querySelectorAll('[data-bss-parallax]');

    if (!parallaxItems.length) return;

    let defaultSpeed = 0.5;
    let visible = [];
    let scheduled;

    window.addEventListener('scroll', scroll);
    window.addEventListener('resize', scroll);

    scroll();

    function scroll() {

      visible.length = 0;

      for (let i = 0; i < parallaxItems.length; i++) {
        let rect = parallaxItems[i].getBoundingClientRect();
        let speed = parseFloat(parallaxItems[i].getAttribute('data-bss-parallax-speed'), 10) || defaultSpeed;

        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          visible.push({
            speed: speed,
            node: parallaxItems[i]
          });
        }

      }

      cancelAnimationFrame(scheduled);

      if (visible.length) {
        scheduled = requestAnimationFrame(update);
      }

    }

    function update() {

      for (let i = 0; i < visible.length; i++) {
        let node = visible[i].node;
        let speed = visible[i].speed;

        node.style.transform = 'translate3d(0, ' + (-window.scrollY * speed) + 'px, 0)';
      }

    }
  }

  initParallax();
})(); // End of use strict

