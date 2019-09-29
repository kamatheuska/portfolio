<template>
  <div class="icon__rain">
    <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns="http://www.w3.org/2000/svg"
         height="80.99mm"
         width="80.99mm"
         version="1.1"
         xmlns:cc="http://creativecommons.org/ns#"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         viewBox="0 0 286.97784 286.97525"
         class="icon__rain-svg">
      <g style="fill:#5579a6">
        <path style="fill:#5579a6" d="m226 218.8c22.19 1.213 41.92-14.43 46.78-33.8 7.222-23.45-3.45-52.92-29.87-60.48 1.258-37.88-31.9-82.81-77.1-81.92-35.39 2.675-61.47 23.73-69.79 58.62 0 0-60.56-9.914-73.79 48-1.485 14.97-1.045 31.26 9.038 43.87 13.77 18.84 39.24 27.06 63.2 26.1"/>
      </g>
      <path class="drop1" d="m137.6 216.5c-2.091 8.47-10.65 13.64-19.12 11.55-8.47-2.091-13.64-10.65-11.55-19.12 1.046-4.235 5.536-9.225 8.449-11.3l15.46-11.55 5.43 16.9c1.236 3.849 2.374 9.284 1.328 13.52z" style="fill-opacity:.8118"/>
      <path class="drop2" d="m172.9 192.8c-2.167 8.774-11.04 14.13-19.81 11.96-8.774-2.167-14.13-11.04-11.96-19.81 1.083-4.387 5.735-9.557 8.753-11.71l16.02-11.96 5.625 17.51c1.281 3.987 2.459 9.618 1.376 14.01z" style="fill-opacity:.8118"/>
      <path class="drop3"  d="m211 219.6c-1.287 11.79-11.89 20.31-23.68 19.02-11.79-1.287-20.31-11.89-19.02-23.68 0.6433-5.896 5.792-13.43 9.342-16.76l18.75-18.36 10.37 21.8c2.362 4.963 4.878 12.08 4.235 17.98z" style="fill-opacity:.8118"/>
      <path class="drop4"  d="m164.6 233c-0.72 6.599-6.653 11.37-13.25 10.65-6.599-0.72-11.37-6.653-10.65-13.25 0.36-3.3 3.242-7.518 5.228-9.38l10.49-10.27 5.806 12.2c1.322 2.778 2.73 6.762 2.37 10.06z" style="fill-opacity:.8118"/>
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
.icon__rain     { height: 100% }
.icon__rain-svg { height: 100% }
.icon__rain-svg .drop1 { animation: dropsColor 2s linear infinite }
.icon__rain-svg .drop2 { animation: dropsColor 4s linear infinite }
.icon__rain-svg .drop3 { animation: dropsColor 3s linear infinite }
.icon__rain-svg .drop4 { animation: dropsColor 5s linear infinite }

</style>
