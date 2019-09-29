<template>
    <transition name="fade">
        <div class="IconsSvg">
            <component v-bind:is="iconName"></component>
        </div>
    </transition>
</template>

<script>
import Sun from '@/components/Weather/icons/Sun';
import Moon from '@/components/Weather/icons/Moon';
import Cloud from '@/components/Weather/icons/Cloud';
import Rain from '@/components/Weather/icons/Rain';
import Storm from '@/components/Weather/icons/Storm';
import Snow from '@/components/Weather/icons/Snow';
import Wind from '@/components/Weather/icons/Wind';
import SunAndRain from '@/components/Weather/icons/SunAndRain';
import MoonAndRain from '@/components/Weather/icons/MoonAndRain';

export default {
    name: 'IconsToggler',
    methods: {
        showWeatherIcon(responseIcon) {
            Object.keys(this.icons).forEach((iconName, i) => {
                if (iconName === responseIcon) {
                    console.log(iconName, i);
                    this.hideAllIcons().then(() => {
                        this.icons[iconName] = !this.icons[iconName];
                    });
                }
            });
        },

        hideAllIcons() {
            Object.keys(this.icons).forEach(key => {
                this.icons[key] = false;
            });
            return Promise.resolve();
        }
    },
    components: {
        'clear-day': Sun,
        'clear-night': Moon,
        'cloudy': Cloud,
        'fog': Cloud,
        'partly-cloudy-day': SunAndRain,
        'partly-cloudy-night': MoonAndRain,
        'rain': Rain,
        'sleet': SunAndRain,
        'snow': Snow,
        'wind': Wind,
        'thunder': Storm
    },
    props: ['iconName']
};
</script>
