const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;
const maxDistance = 120;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.size = Math.random() * 3 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > canvas.width || this.x < 0) this.vx *= -1;
    if (this.y > canvas.height || this.y < 0) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#4da3ff"; // soft blue dots
    ctx.fill();
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(77, 163, 255, ${1 - distance / maxDistance})`;
        ctx.lineWidth = 1;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

function init() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  animate();
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

init();

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("customProjectForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let fbAccount = "ranjie.mariano"; // change this to the FB username or ID

      // you can still build the text if you want, but it won’t be used
      let projectName = document.getElementById("projectName").value;
      let websiteType = document.getElementById("websiteType").value;
      let designStyle = document.getElementById("designStyle").value;
      let preferredColor = document.getElementById("preferredColor").value;
      let pageCount = document.getElementById("pageCount").value;
      let selectedFunctionalities = Array.from(
        document.getElementById("functionality").selectedOptions
      )
        .map((option) => option.value)
        .join(", ");
      let projectDetails = document.getElementById("projectDetails").value;
      let clientName = document.getElementById("clientName").value.trim();
      let clientEmail = document.getElementById("clientEmail").value.trim();

      // open the FB profile (no message support)
      let facebookUrl = `https://www.facebook.com/${fbAccount}`;
      window.open(facebookUrl, "_blank");
    });
});

// other projects modal
const openModalBtn = document.getElementById("openOtherProjects");
const modal = document.getElementById("otherProjectsModal");
const closeModal = document.querySelector(".other-projects-close");

// Open Modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Close Modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close on Outside Click
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

const text = "Hi! I'm Carl";
const typingText = document.getElementById("typing-text");
let index = 0;
let isDeleting = false;

function type() {
  typingText.textContent = text.substring(0, index);

  if (!isDeleting && index < text.length) {
    index++;
    setTimeout(type, 150); // Typing speed
  } else if (isDeleting && index > 0) {
    index--;
    setTimeout(type, 100); // Deleting speed
  } else {
    isDeleting = !isDeleting;
    setTimeout(type, 1000); // Pause before retyping
    type();
  }
}

window.onload = type; // Ensure it runs after page load
