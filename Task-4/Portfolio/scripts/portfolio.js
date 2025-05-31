const text = "Frontend Developer | JavaScript Enthusiast";
let index = 0;

function typeEffect() {
    document.getElementById("typing").textContent = text.slice(0, index);
    index++;
    if (index > text.length) index = 0;
    setTimeout(typeEffect, 150);
}

typeEffect();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
