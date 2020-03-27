<template>
  <div class="icon__cloud">
    <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns="http://www.w3.org/2000/svg"
         height="80.99mm"
         width="80.99mm"
         version="1.1"
         xmlns:cc="http://creativecommons.org/ns#"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         viewBox="0 0 286.97784 286.97525"
         class="icon__cloud-svg">
      <g>
        <path style="stroke-opacity:.9333;stroke:#7195be;stroke-linecap:round;stroke-width:1.643;fill:#5179A6"
              d="m235 56.37a27.5 27.5 0 0 0 -27.38 25.09h-3.133c-13.85 0-25 9.873-25 22.14v3.562c0 12.26 11.15 22.14 25 22.14h24.64v-0.0597l28.92-0.1016c9.391-0.0331 16.93-8.776 16.9-19.6-0.0249-9.357-5.694-17.11-13.29-19.03a27.5 27.5 0 0 0 0.8482 -6.637 27.5 27.5 0 0 0 -27.5 -27.5z"
              class="icon__cloud--back" />
      </g>
      <g>
        <path style="stroke-opacity:.9333;stroke:#fff;stroke-linecap:round;stroke-width:4.35;fill:#7195be"
              d="m154.8 34.19a72.82 72.82 0 0 0 -72.49 66.41h-8.296c-36.68 0-66.21 26.15-66.21 58.62v9.434c0 32.48 29.53 58.62 66.21 58.62h65.25v-0.158l76.58-0.2691c24.87-0.0877 44.83-23.24 44.75-51.91-0.066-24.78-15.08-45.32-35.21-50.39a72.82 72.82 0 0 0 2.246 -17.57 72.82 72.82 0 0 0 -72.82 -72.82z"
              class="icon__cloud--front"/>
      </g>
    </svg>

  </div>
</template>

<style scoped>
@keyframes cloudMoves {
  0%{
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.icon__cloud     { height: 100% }
.icon__cloud-svg { height: 100% }
.icon__cloud--back {
  background-color:#556A8A;
  animation: cloudMoves 2s linear infinite;
  animation-direction: alternate;
}

</style>
