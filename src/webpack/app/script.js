const PIXI = require('pixi.js');
const Emitter = require('../libs/Emitter');
const particleData = require('../data/particle');

export default {
  data() {
    return {
      app: null,
      emitter: null,
      particle: particleData,
      particleImageUrl: './assets/images/particle.png',
      imageOptions: [
        {
          text: 'gradient circle',
          value: './assets/images/particle.png',
        },
        {
          text: 'solid circle',
          value: './assets/images/circle.png',
        },
      ],
      blendOptions: [
        {
          text: 'NORMAL',
          value: PIXI.BLEND_MODES.NORMAL,
        },
        {
          text: 'ADD',
          value: PIXI.BLEND_MODES.ADD,
        },
        {
          text: 'MULTIPLY',
          value: PIXI.BLEND_MODES.MULTIPLY,
        },
        {
          text: 'SCREEN',
          value: PIXI.BLEND_MODES.SCREEN,
        },
        {
          text: 'OVERLAY',
          value: PIXI.BLEND_MODES.OVERLAY,
        },
        {
          text: 'DARKEN',
          value: PIXI.BLEND_MODES.DARKEN,
        },
        {
          text: 'LIGHTEN',
          value: PIXI.BLEND_MODES.LIGHTEN,
        },
        {
          text: 'COLOR_DODGE',
          value: PIXI.BLEND_MODES.COLOR_DODGE,
        },
        {
          text: 'COLOR_BURN',
          value: PIXI.BLEND_MODES.COLOR_BURN,
        },
        {
          text: 'HARD_LIGHT',
          value: PIXI.BLEND_MODES.HARD_LIGHT,
        },
        {
          text: 'SOFT_LIGHT',
          value: PIXI.BLEND_MODES.SOFT_LIGHT,
        },
        {
          text: 'DIFFERENCE',
          value: PIXI.BLEND_MODES.DIFFERENCE,
        },
        {
          text: 'EXCLUSION',
          value: PIXI.BLEND_MODES.EXCLUSION,
        },
        {
          text: 'HUE',
          value: PIXI.BLEND_MODES.HUE,
        },
        {
          text: 'SATURATION',
          value: PIXI.BLEND_MODES.SATURATION,
        },
        {
          text: 'COLOR',
          value: PIXI.BLEND_MODES.COLOR,
        },
        {
          text: 'LUMINOSITY',
          value: PIXI.BLEND_MODES.LUMINOSITY,
        },
      ],
    };
  },
  watch: {
    particle: {
      handler(newValue) {
        this.emitter.changeOption(newValue);
      },
      deep: true,
    },
    particleImageUrl(newValue) {
      this.emitter.changeImages([newValue]);
    },
  },
  methods: {
    initEmitter() {
      this.emitter = new Emitter(
        this.app.stage,
        [PIXI.Texture.fromImage(this.particleImageUrl)],
        this.particle,
      );
    },
    updateEmitter() {
      requestAnimationFrame(this.updateEmitter);

      this.emitter.update();
    },
    onMouseMove(e) {
      const point = {
        x: e.offsetX,
        y: e.offsetY,
      };
      const { root } = this.$refs;
      const rate = 256 / root.offsetWidth;

      this.emitter.setSpawnPos(
        point.x * rate,
        point.y * rate,
      );
    },
    onMouseLeave() {
      this.emitter.resetSpawnPos();
    },
  },
  mounted() {
    this.$refs.root.appendChild(this.app.view);
    this.initEmitter();
    this.updateEmitter();
  },
  created() {
    this.app = new PIXI.Application({
      width: 256,
      height: 256,
    });
    this.app.renderer.backgroundColor = 0x303030;
  },
};
