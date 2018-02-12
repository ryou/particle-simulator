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
