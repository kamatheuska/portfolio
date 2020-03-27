<template>
  <div class="icon__sun">
    <svg class="icon__sun-svg"  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="80.99mm" viewBox="0 0 286.97784 286.97525" width="80.99mm" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <g transform="translate(2 -2.996)">
       <circle r="98.65" style="opacity:.9320;fill:#ffe204" cx="143.5" cy="144.5"/>
      </g>
      <g transform="translate(2 -2.996)" class="icon__sun-beams">
        <g transform="matrix(.3051 0 0 .3051 -2 2.996)">
          <path style="fill:#ffe204"
            d="m137.8 137.8v121.6c6.879-37.05 154.2-150.4 112.9-121.6h-112.9z"/>
          <path style="fill:#ffe204"
            d="m681.3 137.8c37.05 6.879 150.4 154.2 121.6 112.9v-112.9h-121.6z"/>
          <path style="fill:#ffe204"
            d="m802.9 681.3c-6.864 37.09-154.2 150.4-112.9 121.6h112.9v-121.6z"/>
          <path style="fill:#ffe204"
            d="m137.8 682v120.9h121.6c-48.7-30.7-90.6-72.3-121.6-120.9z"/>
          <path style="fill:#ffe204"
            d="m470.3 0c-28.6 28.66-57.3 57.33-86 85.99 31.1-21.35 215.4 2.71 165.9-6.13-26.6-26.62-53.3-53.24-79.9-79.86z"/>
          <path style="fill:#ffe204"
            d="m854.7 384.3c21.35 31.07-2.705 215.4 6.131 165.8 26.6-26.5 53.2-53.2 79.9-79.8-28.7-28.6-57.4-57.3-86-86z"/>
          <path style="fill:#ffe204"
            d="m556.3 854.7c-31.07 21.36-215.4-2.712-165.8 6.134l79.86 79.86 85.99-85.99z"/>
          <path style="fill:#ffe204"
            d="m85.5 384.8l-85.5 85.5 85.99 85.99c-12.74-56.2-12.9-115.2-0.49-171.5z"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
    name: 'clear-day',
    data () {
        return {

        }
    }
}
</script>

<style scoped>
@keyframes sunBeams {
  0%{
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.icon__sun {
  height: 100%;
  width: 100%;
}
.icon__sun-svg {
  /*transform-origin: center;*/
  transform: scale(2);
  height: 100%;
  width: 100%;
  animation: sunBeams 10s linear infinite;
}
</style>
