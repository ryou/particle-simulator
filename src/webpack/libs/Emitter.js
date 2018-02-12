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
    this.emitter.particleBlendMode = options.blendMode;

    this.beforeUpdateAt = null;
  }

  update() {
    const now = Date.now();
    if (this.beforeUpdateAt === null) this.beforeUpdateAt = now;

    switch (this.move) {
      case 'circle':
        {
          const rad = now / 100;
          this.emitter.startSpeed = 0;
          this.emitter.endSpeed = 0;
          this.setSpawnPos(
            (50 * Math.cos(rad)) + 128,
            (50 * Math.sin(rad)) + 128,
          );
        }
        break;
      case 'cross':
        {
          const rad = now / 100;
          this.emitter.startSpeed = 0;
          this.emitter.endSpeed = 0;
          this.setSpawnPos(
            (50 * Math.cos(rad * 0.5)) + 128,
            (30 * Math.sin(rad)) + 128,
          );
        }
        break;
      case 'cross02':
        {
          const rad = now / 100;
          this.emitter.startSpeed = 0;
          this.emitter.endSpeed = 0;
          this.setSpawnPos(
            (50 * Math.cos(rad * 0.7)) + 128,
            (50 * Math.sin(rad)) + 128,
          );
        }
        break;
      default:
        break;
    }

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

    this.emitter.particleBlendMode = option.blendMode;

    this.move = option.move;
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
