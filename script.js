// Plexus Animation
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Dot {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.radius = Math.random() * 2 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = document.documentElement.classList.contains("dark")
      ? "rgba(200, 200, 200, 0.8)"
      : "rgba(255, 255, 255, 0.8)";
    ctx.fill();
  }
}

const dots = [];
const numDots = 100;
for (let i = 0; i < numDots; i++) {
  dots.push(new Dot());
}

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function connectDots() {
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = document.documentElement.classList.contains("dark")
          ? `rgba(200, 200, 200, ${1 - distance / 100})`
          : `rgba(255, 255, 255, ${1 - distance / 100})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
    const dx = dots[i].x - mouse.x;
    const dy = dots[i].y - mouse.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 150) {
      const angle = Math.atan2(dy, dx);
      dots[i].vx += Math.cos(angle) * 0.05;
      dots[i].vy += Math.sin(angle) * 0.05;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot) => {
    dot.update();
    dot.draw();
  });
  connectDots();
  requestAnimationFrame(animate);
}

animate();

// Preloader
window.onload = () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
  }, 2000);
};

// Dark Mode Toggle
function toggleMode() {
  document.documentElement.classList.toggle("dark");
}

// Parallax Effect
document.addEventListener("mousemove", (e) => {
  const objects = document.querySelectorAll(".parallax-object");
  objects.forEach((obj, i) => {
    const speed = (i + 1) * 10;
    const x = (window.innerWidth / 2 - e.pageX) / speed;
    const y = (window.innerHeight / 2 - e.pageY) / speed;
    obj.style.transform = `translate(${x}px, ${y}px)`;
  });
});
