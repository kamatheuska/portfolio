<template>
    <div class="about p-4">
        <section class="hero is-medium">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <p class="title is-1">About Me</p>
                </div>
            </div>
        </section>
        <div class="columns mb-5">
            <div class="column is-offset-1 is-4">
                <h2 class="title is-3">{{ about.carrer.title }}</h2>
                <p class="block is-size-5 about__paragraph has-text-justified">
                    {{ about.carrer.texts[0] }}
                </p>
                <p class="block is-size-5 about__paragraph has-text-justified">
                    {{ about.carrer.texts[1] }}
                </p>
            </div>
        </div>
        <section class="section is-medium">
            <h2 class="title is-3 has-text-centered mb-6">{{ about.tech.title }}</h2>
            <nav class="level py-5">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Vanilla Javascript</p>
                        <img src="@/assets/images/js-logo.png" style="height: 100px" />
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Responsive CSS styles</p>
                        <img src="@/assets/images/css3-logo.png" style="height: 100px" />
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Accesibility focused HTML5</p>
                        <img src="@/assets/images/html5-logo.png" style="height: 100px" />
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Web APIs</p>
                        <img src="@/assets/images/webapi-logo.png" style="height: 100px" />
                    </div>
                </div>
            </nav>
        </section>
        <div class="columns">
            <div class="column is-offset-6 is-4">
                <h2 class="title is-3">{{ about.passions.title }}</h2>
                <p class="block is-size-5 about__paragraph has-text-justified">
                    {{ about.passions.texts[0] }}
                </p>
            </div>
        </div>
        <div class="about__background"></div>
    </div>
</template>

<script>
export default {
    name: 'About',
    data: () => ({
        about: {
            carrer: {
                title: 'Carrer and aspirations',
                texts: [
                    `For the past three years, I have been working as a Fullstack Developer on an
                    e-commerce company. Although my main focus is in frontend development and its
                    technologies, I was required to do a bit of every rol and have learned a great
                    deal about software development and working in a complex team.`,
                    `I have an artistic background, studying music composition in Berlin in the
                    Musikschule Friedrichshain-Kreuzberg and the UdK Berlin. After a while, artistic
                    endeavour wasn't enough, so I decided to learn to code. Almost five years after,
                    I can see how the rigurosity of german music theory influence my love for clean
                    and expresive code.`,
                    `I am passionate about languages and the things that you can build with them.
                    Music and software are like twins separated at birth and given to different 
                    purposes, one for the soul and the divine, the other for body and finding solutions
                    to the necessities we face every day as human beings.`,
                ],
            },
            tech: {
                title: 'Core Web Technologies',
            },
            passions: {
                title: 'Music and Software were separated at birth',
                texts: [
                    `I am passionate about languages and the things that you can build with them.
                    Music and software are like twins separated at birth and given to different 
                    purposes, one for the soul and the divine, the other for body and finding solutions
                    to the necessities we face every day as human beings.`,
                ],
            },
        },
    }),
};
</script>

<style lang="scss" scoped>
.about {
    .column {
        padding: 1rem;
        background: rgb(255, 255, 255);
        border-radius: 50%;
        background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.5) 20%,
            rgba(255, 255, 255, 0) 80%
        );
        @include tablet {
            font-size: $size-1;
        }
    }

    &__paragraph {
        @include tablet {
            font-size: $size-1;
        }
    }
    &__background {
        top: 65%;
        left: -10%;
        background-image: url('~@/assets/svg/gray-waves.svg');
        background-size: 70vh auto;
        background-repeat: no-repeat;
        height: 100vh;
        width: 100vh;
        position: absolute;
        z-index: -10;

        @include tablet {
            left: -60%;
            top: 20%;
            background-size: 130vw auto;
            width: 130vw;
        }
    }
}
</style>
