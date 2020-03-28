<template>
    <div class="writting">
        <div class="writting__form">
            <h1 class="writting__heading">Writting Machine <i>(random speeds)</i></h1>
            <fieldset class="writting__fieldset">
                <label for="textToType" class="writting__label">Write some text in here: </label>
                <input
                    v-model="text"
                    class="writting__input"
                    type="text"
                    id="textToType"
                    placeholder="Type something..."
                >
            </fieldset>
            <fieldset class="writting__fieldset">
                <label for="speed" class="writting__label">Give me a number from 1 to 10 </label>
                <input
                    v-model="speed"
                    class="writting__input"
                    type="number"
                    max="10"
                    min="1"
                    id="speed"
                    placeholder="Type something..."
                >
            </fieldset>
            <button class="button writting__button" @click="startWrittingMachine()">
                SEE THE MAGIC
            </button>
        </div>
        <div ref="wmachineContainer" class="writting__container"></div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
import WrittingMachine from '@/components/WrittingMachine'
import Vue from 'vue'

export default {
    name: 'WrittingView',
    data() {
        return {
            textToType: [
                {
                    text: '',
                    delay: 400,
                    maxTime: 100,
                    minTime: 80
                }
            ],
            text: 'type something...',
            speed: 2
        }
    },
    methods: {
        startWrittingMachine () {
            this.textToType[0].text = this.text
            this.textToType[0].maxTime *= this.speed;

            this.createWrittingMachine()
            this.resetSettings()
        },
        createWrittingMachine () {
            const ComponentContructor = Vue.extend(WrittingMachine)
            const instance = new ComponentContructor({
                propsData: {
                    textToType: this.textToType
                }
            })
            instance.$mount()
            this.$refs.wmachineContainer.appendChild(instance.$el)
        },
        resetSettings () {
            this.textToType.pop();
            this.textToType.push({
                text: '',
                delay: 400,
                maxTime: 100,
                minTime: 80
            })
        }
    },
}
</script>

<style lang="less" scoped>
.writting {
    margin-top: 4rem;
    height: 40rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vh;
    &__label {
        margin-bottom: 1rem;
    }
    &__input {
        height: 3rem;
        width: 100%;
    }
    &__fieldset {
        border: none;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__button {
        width: 10rem;
    }

    &__container {
        display: flex;
        flex-wrap: wrap;
        font-size: 2rem;
    }
}

</style>