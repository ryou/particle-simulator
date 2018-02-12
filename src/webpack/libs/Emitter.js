const PIXI = require('pixi.js');
PIXI.particles = require('pixi-particles');

module.exports = class {
  constructor(stage, image, options) {
    this.emitter = new PIXI.particles.Emitter(
      stage,
      image,
      options,
    );
    this.options = options;
    this.emitter.emit = true;
    this.emitter.particleBlendMode = PIXI.BLEND_MODES.ADD;

    this.beforeUpdateAt = null;
  }

  update() {
    const now = Date.now();
    if (this.beforeUpdateAt === null) this.beforeUpdateAt = now;

    this.emitter.update((now - this.beforeUpdateAt) * 0.001);

    this.beforeUpdateAt = now;
  }

  changeOption(option) {
    this.emitter.startAlpha = option.alpha.start;
    this.emitter.endAlpha = option.alpha.end;

    this.emitter.startScale = option.scale.start;
    this.emitter.endScale = option.scale.end;

    this.emitter.minStartRotation = option.startRotation.min;
    this.emitter.maxStartRotation = option.startRotation.max;

    this.emitter.startSpeed = option.speed.start;
    this.emitter.endSpeed = option.speed.end;

    this.emitter.minLifetime = option.lifetime.min;
    this.emitter.maxLifetime = option.lifetime.max;

    this.emitter.frequency = option.frequency;
  }

  changeImages(urlArray) {
    this.emitter.particleImages = urlArray.map(url => PIXI.Texture.fromImage(url));
  }

  setSpawnPos(x, y) {
    this.emitter.updateSpawnPos(x, y);
  }

  resetSpawnPos() {
    this.emitter.updateSpawnPos(this.options.pos.x, this.options.pos.y);
  }

  destroy() {
    this.emitter.destroy();
  }
};
