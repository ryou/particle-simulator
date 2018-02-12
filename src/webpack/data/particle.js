const PIXI = require('pixi.js');

module.exports = {
  alpha: {
    start: 0.8,
    end: 0.1,
  },
  scale: {
    start: 1,
    end: 0.3,
  },
  color: {
    start: 'fb1010',
    end: 'f5b830',
  },
  speed: {
    start: 200,
    end: 100,
  },
  startRotation: {
    min: 0,
    max: 360,
  },
  rotationSpeed: {
    min: 0,
    max: 0,
  },
  lifetime: {
    min: 0.5,
    max: 0.5,
  },
  frequency: 0.008,
  blendMode: PIXI.BLEND_MODES.NORMAL,
  maxParticles: 1000,
  pos: {
    x: 128,
    y: 128,
  },
  addAtBack: false,
  spawnType: 'circle',
  spawnCircle: {
    x: 0,
    y: 0,
    r: 0,
  },
  spawnRectangle: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  move: 'mouse',
};
