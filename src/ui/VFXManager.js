export class VFXManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.active = true;
    this.particleColor = 'rgba(201, 168, 76, 0.3)'; // Default Gold
    
    this.init();
  }

  init() {
    this.container.appendChild(this.canvas);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    for (let i = 0; i < 150; i++) {
      this.particles.push(this.createParticle());
    }
    
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 4 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.1,
      opacity: Math.random() * 0.7 + 0.2
    };
  }

  setYuga(yuga) {
    switch (yuga) {
      case 'satya': this.particleColor = 'rgba(255, 230, 150, 0.4)'; break; // Pure Gold
      case 'treta': this.particleColor = 'rgba(255, 120, 50, 0.3)'; break; // Saffron Flame
      case 'dvapara': this.particleColor = 'rgba(100, 200, 255, 0.3)'; break; // Electric Blue
      case 'kali': this.particleColor = 'rgba(180, 80, 255, 0.7)'; break; // Sharp Violet Haze
      default: this.particleColor = 'rgba(200, 200, 200, 0.2)';
    }
  }

  animate() {
    if (!this.active) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = this.particleColor;
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;
      
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    
    requestAnimationFrame(() => this.animate());
  }
}
