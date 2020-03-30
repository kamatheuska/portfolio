<template>
    <div class="Drums shadow">
        <div class="Drums__heading--container">
            <h1 class="Drums__heading">
                The Drums
            </h1>
            <h3>Play it with your keyboard!</h3>
        </div>
        <div class="Drums__drum-machine">
            <DrumMachine />
        </div>
    </div>
</template>

<script>
import DrumMachine from '@/components/DrumMachine'

export default {
    name: 'Drums',
    components: {
        DrumMachine
    }
}

</script>

<style lang="less" scoped>
.Drums {
    font-family: 'Roboto', sans-serif;
    color: @portfolio-white;
    background-color: @portfolio-purple;
    margin-top: 2rem;
    text-align: center;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: max-content;
    padding-top: 3rem;
    padding-bottom: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-radius: 10px;
    &__heading {
        text-align: center;
        &--container {
            padding-bottom: 2rem;
        }
    }

}
</style>