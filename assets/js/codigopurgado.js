//La navbar
let mainNav = document.querySelector('#mainNav');

if (mainNav) {

  // Collapse Navbar
  let collapseNavbar = function() {

    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

    if (scrollTop > 100) {
      mainNav.classList.add("navbar-shrink");
    } else {
      mainNav.classList.remove("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  collapseNavbar();
  // Collapse the navbar when page is scrolled
  document.addEventListener("scroll", collapseNavbar);
}

//Galería
  // bageutteBox init
  if (document.getElementsByClassName('popup-gallery').length > 0) {
    baguetteBox.run('.popup-gallery', { animation: 'slideIn' });
  }


//Productos
  document.addEventListener('DOMContentLoaded', function() {

	var products = document.querySelectorAll('[data-bss-dynamic-product]');

	for (var product of products) {
		var param = product.dataset.bssDynamicProductParam;
		product.dataset.reflowProduct = new URL(location.href).searchParams.get(param)
	}

}, false);