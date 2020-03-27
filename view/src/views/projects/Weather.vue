<template>
    <h2>testing weather</h2>
<!-- <div class="Weather">
    <button
        class="Weather__button--small"
        @click="fetchWeather()">
        weather on my location
    </button>
    <br>
    <button
        class="Weather__button--small"
        @click="fetchWeather('other')">
        weather on other places
    </button>
    <input
        v-model="location"
        class="Weather__input--text"
        type="text"
        style="margin-bottom: 0.5rem; text-align: center"
        placeholder="New York">
    <br>
    <span>
        <em>
            <strong>
                <small>Try typing the name of a city</small>
            </strong>
        </em>
    </span>
</div> -->
</template>

<script>
// import { createNamespacedHelpers } from 'vuex'
// const { mapActions, mapState } = createNamespacedHelpers('weather')

// export default {
//     name: 'weather-controller',
//     data () {
//         return {
//             title: 'WEATHERZILLA',
//             error: {
//                 message: 'AJA!!!',
//                 status: false
//             },
//             currentIcon: 'clear-day',
//             subtitle: 'An app to check your Weather',
//             vendor: {
//                 href: 'https://darksky.net/poweredby/',
//                 message: 'Powered by Dark Sky',
//                 altText: 'Go to darksky.net'
//             },
//             curWeather: {},
//             currentTime: new Date().getHours(),
//             unitTemp: {
//                 current: 'ºC',
//                 other: 'ºF'
//             },
//             currently: {
//                 temperature: 22,
//                 summary: 'Hello FooBar',
//                 windSpeed: 2.2312,
//                 precipProbability: 1000
//             },
//             show: false,
//             geolocation: '',
//             location: '',
//             status: ''
//         }
//     },
//     computed: {
//         setBackground() {
//             return {
//                 'Weather__night': this.currentTime < 6 ||
//                     this.currentTime > 19
//             }
//         }
//     },
//     methods: {

//         fetchWeather(type = 'local') {
//             this.$store.commit(SET_APP_SERVICE, {
//                 primary: 'weather',
//                 secondary: type
//             })

//             this.checkGeoSupport()
//                 .then(() => this.getClientGeolocation())
//                 .then(() => this.$store.dispatch('requestApi', this.geolocation))
//                 .then((res) => this.setCurrentWeather(res.data))
//                 .catch(this.errorHandler)
//         },

//         errorHandler(error) {
//             console.error('Error on fetchWeather:', error)
//         }

//     }
// }
</script>

<style>
.Weather {
    width: 100%;
    grid-column: 4 / -1;
    grid-row: 3;
}

@media only screen and (min-device-width: 320px) and (orientation: portrait) {

    .Weather {
        grid-column: 1 / -1;
        grid-row: 4 / span 1;
    }
}

@media only screen and (min-device-width: 320px) and (max-device-width: 812px) and (orientation: landscape) {

    .Weather {
        grid-column: 1 / span 1;
        grid-row: 3 / span 1;
    }
}
</style>
