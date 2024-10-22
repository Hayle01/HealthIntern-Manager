const hamburger = document.querySelector(".humberger");
const mobileMenu = document.querySelector(".side-bar");
const icons = document.querySelectorAll("i");

hamburger.addEventListener("click", () => {
  const isVisible = mobileMenu.getAttribute("data-visible");
  if (isVisible == "true") {
    mobileMenu.setAttribute("data-visible", "false");
    icons[0].setAttribute("data-visible", "true"); // Hamburger icon
    icons[1].setAttribute("data-visible", "false"); // Close (X) icon
    console.log("Hamburger icon shown");
  } else if (isVisible == "false") {
    mobileMenu.setAttribute("data-visible", "true");
    icons[0].setAttribute("data-visible", "false"); // Hamburger icon
    icons[1].setAttribute("data-visible", "true"); // Close (X) icon
    console.log("Close (X) icon shown");
  }
});
