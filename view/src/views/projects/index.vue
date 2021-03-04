<template>
    <div class="Projects">
        <Nav direction="horizontal" />
        <div class="Projects__detail">
            <router-view />
        </div>
        <div class="Projects__footer">
            <Footer />
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default {
    name: 'Projects',
    data() {
        return {
            project: {
                thumbnail: {
                    fileName: 'test__ok.png',
                    alt: 'Weather'
                },
                title: 'WeatherApp',
                projectUrl: '/projects/weather'
            }
        }
    },
    components: {
        Nav,
        Footer
    }
}
</script>

<style lang="scss">
.Projects {
    width: 100%;
    height: max-content;
    &__grid {
        padding: 10px;
    }
    &__detail {
        padding-bottom: 5rem;   
        height: max-content;
        display: flex;
        width: 100%;
        justify-content: center;
    }
}
</style>
