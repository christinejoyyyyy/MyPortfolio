const hamburger = document.querySelector(".hamburger");
const cancel = document.querySelector(".cancel");
const dropdown = document.querySelector(".dropdown");
const navLinks = document.querySelector(".nav-container .links");

hamburger.addEventListener("click", () => {
  dropdown.style.transform = "translateY(0)";
  hamburger.style.display = "none";
  cancel.style.display = "block";
});

cancel.addEventListener("click", () => {
  dropdown.style.transform = "translateY(-500px)";
  hamburger.style.display = "block";
  cancel.style.display = "none";
});

function handleResize() {
  if (window.innerWidth > 900) {
    dropdown.style.transform = "translateY(-500px)"; 
    navLinks.style.display = "flex";
    hamburger.style.display = "none";
    cancel.style.display = "none";
  } else {
      navLinks.style.display = "none";
      hamburger.style.display = "block";
      cancel.style.display = "none";
  }
}

window.addEventListener("resize", handleResize);
handleResize(); 

window.addEventListener("scroll", function(){
  const nav = document.querySelector("nav");
  window.scrollY > 0 ? nav.classList.add("scrolled") : nav.classList.remove("scrolled");
})