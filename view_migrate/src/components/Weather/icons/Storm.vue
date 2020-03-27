<template>
  <div class="icon__storm">
    <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns="http://www.w3.org/2000/svg"
         height="80.99mm"
         width="80.99mm"
         version="1.1"
         xmlns:cc="http://creativecommons.org/ns#"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         viewBox="0 0 286.97784 286.97525"
         class="icon__storm-svg">
      <g style="fill:#5579a6"
         transform="translate(-3.657 -11.48)">
        <path style="fill:#5579a6"
              d="m226 218.8c22.19 1.213 41.92-14.43 46.78-33.8 7.222-23.45-3.45-52.92-29.87-60.48 1.258-37.88-31.9-82.81-77.1-81.92-35.39 2.675-61.47 23.73-69.79 58.62 0 0-60.56-9.914-73.79 48-1.485 14.97-1.045 31.26 9.038 43.87 13.77 18.84 39.24 27.06 63.2 26.1"/>
      </g>
      <g>
        <path d="m160 103.3-66 79.72 30.64 6.191-11.7 57.89 66-79.72-30.64-6.191 11.7-57.89z"
              style="fill-opacity:.9333;fill-rule:evenodd"
              id="thunder1"/>
        <path d="m191.2 172.2-34.43 41.59 15.98 3.23-6.103 30.2 34.43-41.59-15.98-3.23 6.103-30.2z"
              style="fill-opacity:.9333;fill-rule:evenodd"
              id="thunder2"/>
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
@keyframes lightningHits {
  0%        { fill: #8BFAFF }
  10%       { fill: #446a97 }
  15%, 100% { fill: #446a97 }
}
.icon__storm     { height: 100% }
.icon__storm-svg { height: 100% }
.icon__storm #thunder1 {
  animation: lightningHits 2s linear infinite;
}
.icon__storm #thunder2 {
  animation: lightningHits 3s linear infinite;
}

</style>
