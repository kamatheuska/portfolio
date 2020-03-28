<template>
    <div class="Projects">
        <Nav direction="horizontal" />
        <div class="Projects__grid"
            v-if="$route.path == '/projects'">
            <h1>Projects Here</h1>
            <ProjectBox
                v-bind="project"    
                />
        </div>
        <div class="Projects__detail">
            <router-view />
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import ProjectBox from '@/components/ProjectBox'

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
        ProjectBox
    }
}
</script>

<style lang="less">
.Projects {
    width: 100%;
    height: max-content;
    &__grid {
        padding: 10px;
    }
    &__detail {
        height: max-content;
        display: flex;
        width: 100%;
        justify-content: center;
    }
}
</style>
