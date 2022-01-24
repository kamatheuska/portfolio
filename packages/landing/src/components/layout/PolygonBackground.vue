<template>
  <Teleport :to="`[data-teleport=${portalSelector}]`">
    <transition name="fade-in">
      <div
        v-if="show"
        class="polygon-background"
        :style="polygonStyle"
      />
    </transition>
  </Teleport>
</template>

<script>
export default {
  props: {
    show: Boolean,
    portalSelector: String,
    gradientSpecs: Object,
    polygon: Object,
    marginTop: String,
    height: String,
  },
  computed: {
    polygonStyle() {
      const expression = this.getGradientExpression();
      const polygon = this.getPolygon();

      let styles = `background: linear-gradient(${expression}); margin-top: ${this.marginTop}; `;
      if (polygon) {
        styles += `--polygon: ${polygon}; `;
      }
      if (this.height) {
        styles += `height: ${this.height}; `;
      }

      return styles.trim();
    },
  },
  methods: {
    getGradientExpression() {
      let colorsExpr = '';

      if (!this.gradientSpecs || !this.gradientSpecs.colors || this.gradientSpecs.colors.length < 2) return null;

      const { colors, angle } = this.gradientSpecs;

      for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const isLast = i === colors.length - 1;

        colorsExpr += `${color}`;

        if (!isLast) {
          colorsExpr += ', ';
        }
      }

      const angleExpr = angle ? `${angle},` : '';

      return `${angleExpr} ${colorsExpr}`;
    },

    getPolygon() {
      if (!this.polygon || !this.polygon.points || this.polygon.points.length < 2) return null;

      return this.polygon.points.reduce((acc, point, i, arr) => {
        const isLast = i === arr.length - 1;
        let partial = `${acc} ${point[0]} ${point[1]}`;

        if (!isLast) {
          partial += ', ';
        }
        return partial;
      }, ' ');
    },
  },
};
</script>

<style lang="scss" scoped>
.polygon-background {
    --polygon__first-point: 10%;
    --polygon: 0% var(--polygon__first-point), 100% 0, 100% 90%, 0% 100%;

    position: relative;
    width: 100vw;
    height: 100vh;
    top: 80vh;
    -webkit-clip-path: polygon(var(--polygon));
    clip-path: polygon(var(--polygon));

    @include tablet {
        --polygon__first-point: 20%;
    }
}
</style>
