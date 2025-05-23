(() => {
  const canvas = document.getElementById('threadCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Sparkle {
    constructor(x, y, size, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedY = speedY;
      this.alpha = Math.random() * 0.5 + 0.3;
      this.alphaDir = Math.random() < 0.5 ? 1 : -1;
    }
    update() {
      this.y += this.speedY;
      if (this.y > window.scrollY + window.innerHeight + 10) {
        this.y = window.scrollY - 10;
      }
      this.alpha += 0.01 * this.alphaDir;
      if (this.alpha > 0.8) this.alphaDir = -1;
      if (this.alpha < 0.3) this.alphaDir = 1;
    }
    draw(ctx) {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, `rgba(255,255,255,${this.alpha})`);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let sparkles = [];
  function generateSparkles() {
    sparkles = [];
    const count = 50;
    for(let i=0; i<count; i++) {
      const x = Math.random() * canvas.width;
      const y = window.scrollY + Math.random() * window.innerHeight;
      const size = Math.random() * 1.5 + 0.5;
      const speedY = 0.3 + Math.random() * 0.3;
      sparkles.push(new Sparkle(x, y, size, speedY));
    }
  }
  generateSparkles();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles.forEach(sparkle => {
      sparkle.update();
      sparkle.draw(ctx);
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('scroll', () => {});
  window.addEventListener('resize', () => {
    generateSparkles();
    resize();
  });
})();
