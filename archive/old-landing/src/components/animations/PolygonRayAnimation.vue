<template>
  <Teleport to="[data-teleport=overlay]">
    <transition name="fade-in">
      <div
        v-if="show"
        class="polygon-ray"
      >
        <svg
          v-for="(polygon, i) in polygons"
          :key="`polygon-${i}`"
          class="responsive-svg polygon-ray__svg"
          :class="`polygon-ray__svg--${polygon.type}`"
          version="1.1"
          viewBox="0 0 1872.2 649.84"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m25.329 1178 1844.9 242.71-248.57-2191.3-1620 532.17z" />
        </svg>
      </div>
    </transition>
  </Teleport>
</template>

<script>
export default {
  props: {
    show: Boolean,
  },

  data: () => ({
    polygons: [
      {
        type: 'link',
      },
      {
        type: 'warning',
      },
      {
        type: 'info',
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
$skew-duration: 11s;
$shrink-duration: 10s;

@keyframes shrink {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}

@keyframes skew {
  0% {
    transform: skew(0deg);
  }
  10% {
    transform: skew(15deg);
  }
  50% {
    transform: scale(-0.8);
  }
  80% {
    transform: skew(0, 15deg);
  }
}

.polygon-ray {
  top: -5rem;
  right: 15rem;

  position: absolute;
  width: 15rem;
  height: 18rem;
  z-index: 1000;
  animation: shrink $shrink-duration;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  @include tablet {
    top: -2rem;
    left: 4rem;
    width: 25rem;
    height: 36rem;
  }

  &__svg {
    width: 100%;
    height: 100%;
    stroke-width: 10px;
    animation: skew infinite;
    animation-timing-function: ease-out;
    position: absolute;
    opacity: 0.7;

    @include tablet {
      stroke-width: 5px;
    }

    &--info {
      fill: lighten($p-pink, 4%);
      animation-duration: calc($skew-duration);
    }
    &--link {
      fill: lighten($link, 10%);
      animation-duration: calc($skew-duration * 2);
    }

    &--warning {
      fill: lighten($warning, 35%);
      animation-duration: calc($skew-duration * 3);
    }
  }
}
</style>
