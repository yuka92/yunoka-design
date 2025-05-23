// 糸のアニメーション
window.addEventListener('scroll', () => {
  const path = document.querySelector('.thread path');
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const drawLength = 1000 - (scrollTop / docHeight) * 1000;
  path.style.strokeDashoffset = drawLength;

  const glow = Math.max(0.2, 1 - scrollTop / docHeight);
  path.style.filter = `drop-shadow(0 0 5px rgba(229, 169, 184, ${glow * 0.4}))`;
});

// キラキラ粒子
const canvas = document.getElementById("sparkle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2.2 + 0.5,
    opacity: Math.random() * 0.5 + 0.3,
    speedY: Math.random() * 0.3 + 0.1,
    lifespan: Math.random() * 150 + 100
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.y -= p.speedY;
    p.lifespan--;
    if (p.lifespan <= 0 || p.y < 0) {
      particles[i] = createParticle();
      particles[i].y = canvas.height;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 245, 250, ${p.opacity})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}

for (let i = 0; i < 150; i++) {
  particles.push(createParticle());
}
animate();