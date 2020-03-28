<template>
    <div class="weather">
        <header>
            <h1>{{ title }}</h1>
            <h3>{{ subtitle }}</h3>
            <h6 v-if="error">{{ error.message || defaultError }}</h6>
            <h5 v-if="vendor">
                <a :href="vendor.href" target="_blank">
                    {{ vendor.message }}
                </a>
            </h5>
        </header>
        <button
            class="weather__button--small"
            @click="fetchWeather()">
            weather on my location
        </button>
        <br>
        <button
            class="weather__button--small"
            @click="fetchWeather('other')">
            weather on other places
        </button>
        <input
            v-model="location"
            class="weather__input--text"
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

        <div class="weather__data">
            <div>
                <span class="weather__data--temp h--bold">
                    {{ currently.temperature | toFixedDecimal(0) }}
                    <span>{{ unitTemp.current }}</span>
                </span>
            </div>
            <div>
                <button class="button__tiny" @click="changeUnits()">
                    Change to {{ unitTemp.other }}
                </button>
            </div>
            <div class="weather__data--sum">
                <span>{{ currently.summary }}</span>
            </div>
            <div class="weather__data--other">
                <span>Wind <strong>{{ currently.windSpeed | toFixedDecimal(1) }}km/h</strong></span>
                <br>
                <span>Precip. <strong>{{ currently.precipProbability }}</strong></span>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('weather')

export default {
    name: 'weather-controller',
    data () {
        return {
            defaultError: 'Some Error ocurred.',
            title: 'The Weather',
            error: {
                message: 'AJA!!!',
                status: false
            },
            currentIcon: 'clear-day',
            subtitle: 'An app to check your Weather',
            vendor: {
                href: 'https://darksky.net/poweredby/',
                message: 'Powered by Dark Sky',
                altText: 'Go to darksky.net'
            },
            curWeather: {},
            currentTime: new Date().getHours(),
            unitTemp: {
                current: 'ºC',
                other: 'ºF'
            },
            currently: {
                temperature: 22,
                summary: 'Hello FooBar',
                windSpeed: 2.2312,
                precipProbability: 1000
            },
            show: false,
            geolocation: '',
            location: '',
            status: ''
        }
    },
    computed: {
        setBackground() {
            return {
                'weather__night': this.currentTime < 6 ||
                    this.currentTime > 19
            }
        }
    },
    methods: {

        fetchWeather(type = 'local') {
            this.$store.commit(SET_APP_SERVICE, {
                primary: 'weather',
                secondary: type
            })

            this.checkGeoSupport()
                .then(() => this.getClientGeolocation())
                .then(() => this.$store.dispatch('requestApi', this.geolocation))
                .then((res) => this.setCurrentWeather(res.data))
                .catch(this.errorHandler)
        },

        errorHandler(error) {
            console.error('Error on fetchWeather:', error)
        }

    },
    filters: {
        toFixedDecimal (num) {
            return Number.parseFloat(num).toFixed(1)
        }
    }
}
</script>

<style>
.weather {
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1rem;
    justify-items: center;
    transition: all 1s ease;
    color: #204775;
    text-align: center;
    font-size: 1.3rem;
    display: grid;
    height: 100%;
    width: 100%;
}

.weather .IconsSvg {
    height: 100%;
    grid-column: 2 / span 2;
    grid-row: 2 / span 2;
    padding: 2rem;
    justify-items: center;
    text-align: center;
    height: 38vh;
}
/*............POSIBLE BACKGROUNDS DEPENDING ON ICON............*/
.weather__data {
    padding-top: 2rem;
    grid-column: 4 / -1;
    grid-row: 2;
}

.weather__data--sum {
    font-size: 1.6em;
    margin: 0.7rem 0;
}

.weather .ProjectHeader {
    font-family: "Oswald", sans-serif;
}

.weather__data--temp {
    font-size: 2.2em;
}

/*............NIGHT............*/
.weather__night {
    background-color: #0b1a2c;
    color: #f2f2f2;
}

.weather__night .button__small {
    background-color: #0b1a2c;
    border: 2px solid #f2f2f2;
    color: #f2f2f2;
}

.weather__night .button__small:hover {
    background-color: #f2f2f2;
    border: 2px solid #f2f2f2;
    color: #0b1a2c;
}

/*............MEDIA QUERIES............*/
@media only screen
and (min-device-width: 320px)
and (orientation: portrait) {

    .weather {
        padding: 0.4rem;
        grid-gap: 0.2rem;
        grid-template-columns: auto;
        grid-template-rows: repeat(4, auto);
    }

    .weather .ProjectHeader {
        font-size: 0.7em;
    }

    .weather .IconsSvg {
        grid-column: 1 / -1;
        grid-row: 2 / span 1;
        padding: 0.2rem;
        height: 23vh;
    }

    .weather__data {
        grid-column: 1 / -1;
        grid-row: 3 / span 1;
    }

}

@media only screen
and (min-device-width: 320px)
and (max-device-width: 812px)
and (orientation: landscape) {

    .weather {
        padding: 0.4rem;
        grid-gap: 0.2rem;
        grid-template-columns: auto auto;
        grid-template-rows: repeat(3, auto);
    }

    .weather .ProjectHeader {
        font-size: 0.8em;
        grid-column: 1 / -1;
    }

    .weather .IconsSvg {
        grid-column: 1 / span 1;
        grid-row: 2 / span 1;
        padding: 0;
        height: 23vh;
    }

    .weather__data {
        grid-column: 2 / -1;
        grid-row: 2 / span 2;
        padding: 0;
    }

}
/* 
.weather {
    width: 100%;
    grid-column: 4 / -1;
    grid-row: 3;
}

@media only screen and (min-device-width: 320px) and (orientation: portrait) {

    .weather {
        grid-column: 1 / -1;
        grid-row: 4 / span 1;
    }
}

@media only screen and (min-device-width: 320px) and (max-device-width: 812px) and (orientation: landscape) {

    .weather {
        grid-column: 1 / span 1;
        grid-row: 3 / span 1;
    }
} */
</style>
