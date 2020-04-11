<template>
<footer class="footer"
    :class="footerClassProject"
>
    <div class="footer__social">
        <a target="_blank" href="https://www.instagram.com/kamatheuska">
            <div class="footer__icon--container">
                <svg
                    class="footer__icon"
                    viewBox="0 0 512 512"
                >
                    <path d="M352,0H160C71.648,0,0,71.648,0,160v192c0,88.352,71.648,160,160,160h192c88.352,0,160-71.648,160-160V160
                        C512,71.648,440.352,0,352,0z M464,352c0,61.76-50.24,112-112,112H160c-61.76,0-112-50.24-112-112V160C48,98.24,98.24,48,160,48
                        h192c61.76,0,112,50.24,112,112V352z"/>
                    <path d="M256,128c-70.688,0-128,57.312-128,128s57.312,128,128,128s128-57.312,128-128S326.688,128,256,128z M256,336
                        c-44.096,0-80-35.904-80-80c0-44.128,35.904-80,80-80s80,35.872,80,80C336,300.096,300.096,336,256,336z"/>
                    <circle cx="393.6" cy="118.4" r="17.056"/>
                </svg>
            </div>
        </a>
        <a target="_blank" href="https://github.com/kamatheuska/">
            <div class="footer__icon--container">
                <svg 
                    class="footer__icon"
                    viewBox="0 0 24 24"
                >
                    <path d="m12 .5c-6.63 0-12 5.28-12 11.792 0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56 4.801-1.548 8.236-5.97 8.236-11.173 0-6.512-5.373-11.792-12-11.792z"/>
                </svg>
            </div>
        </a>
    </div>
    <p>Copyright <strong>Nicolas Ramirez 2020</strong></p>
    <p class="footer__tribute">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>

</footer>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Footer',
    computed: {
        ...mapGetters([
            'currentProject'
        ]),

        footerClassProject () {
            return {
                'footer__drums': this.currentProject === 'drumMachine',
                'footer__writting': this.currentProject === 'writting'
            }
        }
    },
}
</script>

<style lang="less" scoped>
.footer {
    height: max-content;
    padding-top: 1.8rem;
    background-color: #00000033;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px @portfolio-white solid;
    transition: background-color 700ms linear;
    color: @portfolio-white;
    font-size: 1rem;
    &__drums {
        background-color: fade(darken(@portfolio-purple, 30%), 80%)
    }
    &__writting {
        background-color: fade(darken(@portfolio-brick, 15%), 40%)
    }

    &__icon {
        height: 100%;
        width: auto;
        fill: @portfolio-white;
        &--container {
            height: 2rem;
        }
    }

    &__social {
        display: flex;
        justify-content: space-evenly;

    }

    &__tribute {
        font-size: .8rem;
        a {
            display: inline;
        }
    }

}
@media screen and (min-width : 850px) {
    .footer {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
}
</style>