<template>
  <div class="icon__sunrain">
    <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns="http://www.w3.org/2000/svg"
         height="80.99mm"
         width="80.99mm"
         version="1.1"
         xmlns:cc="http://creativecommons.org/ns#"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         viewBox="0 0 286.97784 286.97525"
         class="icon__sunrain-svg">
      <g class="icon__sunrain-sun">
        <g style="fill:#ffe302;fill-opacity:.8118" transform="matrix(.7083 0 0 .7083 92.09 22.86)">
          <g style="fill:#ffe302;fill-opacity:.8118" transform="translate(2,-2.996)">
            <circle cy="144.5" cx="143.5" r="98.65" style="opacity:.932;fill:#ffe302;fill-opacity:.8118"/>
          </g>
        </g>
        <path style="fill:#ffe302;fill-opacity:.8118"
              d="m296.8-120v31.4c1.777-9.564 39.82-38.83 29.16-31.4h-29.16z"
              transform="matrix(.8368 0 0 .8368 -126.5 153)"/>
        <path style="fill:#ffe302;fill-opacity:.8118"
              d="m437.2-120c9.564 1.777 38.84 39.82 31.4 29.16v-29.16h-31.4z"
              transform="matrix(.8368 0 0 .8368 -126.5 153)"/>
        <path style="fill:#ffe302;fill-opacity:.8118"
              d="m468.6 20.41c-1.772 9.581-39.82 38.84-29.16 31.4h29.16v-31.4z"
              transform="matrix(.8368 0 0 .8368 -126.5 153)"/>
        <path style="fill:#ffe302;fill-opacity:.8118"
              d="m296.8 20.58v31.22h31.4c-12.5-7.95-23.4-18.7-31.4-31.23z"
              transform="matrix(.8368 0 0 .8368 -126.5 153)"/>
        <path style="fill:#ffe302;fill-opacity:.8118"
              d="m194.4 22.86c-6.18 6.193-12.38 12.39-18.59 18.59 6.721-4.614 46.55 0.5856 35.85-1.324-5.737-5.758-11.55-11.51-17.28-17.26z"/>
        <path style="fill:#ffe302;fill-opacity:.8118"
              d="m482-56.36c5.514 8.023-0.6986 55.63 1.584 42.82 6.869-6.843 13.74-13.74 20.64-20.61-7.411-7.386-14.82-14.8-22.21-22.21z"
              transform="matrix(.8368 0 0 .8368 -126.5 153)"/>
        <path style="fill:#ffe301;fill-opacity:.7569"
              d="m216.1 200c-7.664 5.269-53.14-0.669-40.9 1.513l19.7 19.7 21.22-21.22z"/>
        <path style="fill:#ffe302;fill-opacity:.8118"
              d="m283.3-56.19-22.08 22.09 22.21 22.18c-3.29-14.52-3.331-29.75-0.1265-44.28z"
              transform="matrix(.8368 0 0 .8368 -126.5 153)"/>
      </g>
      <g style="fill:#5579a6" transform="translate(-21.97 33.15)">
        <path style="fill:#5579a6"
              d="m226 218.8c22.19 1.213 41.92-14.43 46.78-33.8 7.222-23.45-3.45-52.92-29.87-60.48 1.258-37.88-31.9-82.81-77.1-81.92-35.39 2.675-61.47 23.73-69.79 58.62 0 0-60.56-9.914-73.79 48-1.485 14.97-1.045 31.26 9.038 43.87 13.77 18.84 39.24 27.06 63.2 26.1"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
    data () {
        return {

        }
    }
}
</script>

<style scoped>

@keyframes dropsColor {
  0%, 100%{
    fill:#BFEBFF;
  }
  50% {
    fill:#00afff;
  }
}
.icon__sunrain {
  height: 100%;
  width: 100%;
}
.icon__sunrain-svg {
  height: 100%;
  width: 100%;
}
.icon__sunrain-svg .drop1 { animation: dropsColor 2s linear infinite }
.icon__sunrain-svg .drop2 { animation: dropsColor 4s linear infinite }
.icon__sunrain-svg .drop3 { animation: dropsColor 3s linear infinite }
.icon__sunrain-svg .drop4 { animation: dropsColor 5s linear infinite }

@keyframes sunBeams {
  0%{
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.icon__sunrain-sun {
  transform-origin: 210px 120px;
  animation: sunBeams 10s linear infinite;
}
</style>
