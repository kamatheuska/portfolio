<template>
    <div class="Drums">
        <h1 class="Drums__heading">
            The Drums
        </h1>
        <DrumMachine />
    </div>
</template>

<script>
import DrumMachine from '@/components/DrumMachine'

export default {
    name: 'Drums',
    components: {
        DrumMachine
    },
    mounted() {
        let recaptchaScript = document.createElement('script')
        recaptchaScript.setAttribute('src', 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js')
        document.head.appendChild(recaptchaScript)
    },
}

</script>

<style lang="less" scoped>
.Drums {
    margin-top: 2rem;
}
</style>