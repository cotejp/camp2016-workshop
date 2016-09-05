var Particle = function(options) {
  this.alpha    = options.alpha || 1;
  this.color    = this.hexToRgb(options.color);
  this.radius   = options.radius || 5;
  this.speed    = options.speed || 10;
  this.x        = options.x || 0;
  this.y        = options.y || 0;
  this.vx       = (Math.random() * this.speed) - (this.speed / 2);
  this.vy       = (Math.random() * this.speed) - (this.speed / 2);
};

Particle.prototype.hexToRgb = function(hex) {
  let [, red, green, blue] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return { r: parseInt(red, 16), g: parseInt(green, 16), b: parseInt(blue, 16) };
};

Particle.prototype.draw = function(ctx) {
  this.x += this.vx;
  this.y += this.vy;
  this.alpha -= 0.01;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle =  `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha}`;
  ctx.fill();
};

Particle.startRendering = function(context, particles) {

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  for(let i = 0; i < particles.length; i++) {

    if (
      particles[i].x < 0 || particles[i].x > context.canvas.width ||
      particles[i].y < 0 || particles[i].y > context.canvas.height ||
      particles[i].alpha < 0
    ) {
      particles.splice(i, 1);
    } else {
      particles[i].draw(context);
    }

  }

  requestAnimationFrame(() => {
    this.startRendering(context, particles);
  });

};
