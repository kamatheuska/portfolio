<template>
    <div class="writting">
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
            <label for="speed" class="writting__label">How slow should I type? </label>
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
        }       
    },
}
</script>

<style lang="less" scoped>
.writting {
    height: 40rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 70vh;
    &__input {
        height: 3rem;

    }
    &__fieldset {
        border: none;
        width: 30rem;
        padding: 2rem;
    }

    &__button {
        width: 10rem;
    }

    &__container {
        display: flex;
    }
}
</style>