<template>
    <div :class="$style.root">
        <header :class="$style.date">
            <span>
                {{ date }}
            </span>
        </header>
        <div :class="$style.content">
            <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer">
                <h3>
                    {{ workTitle }}
                    <span>
                        <font-awesome-icon :icon="['fa', 'arrow-up']" />
                    </span>
                </h3>
            </a>

            <h3 v-else>
                {{ workTitle }}
            </h3>
            <h4>{{ company }}</h4>
            <p>{{ description }}</p>
            <ul>
                <li v-for="(tag, i) in tags" :key="`${company}-tag-${i}`">
                    {{ tag }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
export interface ExperienceCardProps {
    date: string;
    workTitle: string;
    company: string;
    description: string;
    tags: string[];
    link?: string;
}

withDefaults(defineProps<ExperienceCardProps>(), {
    date: '',
    tags: () => [],
});
</script>

<style module>
.root {
    display: grid;
    padding: 1rem;
    padding-bottom: 1.5rem;
    backdrop-filter: blur(10px);
    background-color: rgba(30, 53, 62, 0.3);
    border-radius: 1rem;
    gap: 1rem;
}

.date {
    font-size: 0.8rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
}
.content h3,
h4 {
    margin: 0;
}
.content ul {
    display: flex;
    font-size: 0.9rem;
    padding: 0;
    flex-wrap: wrap;
    gap: 5px;
}
.content h3 svg {
    transform: rotate(45deg);
    font-size: 0.7em;
}
.content li {
    background-color: var(--darkGreen);
    color: var(--lightGreen);
    padding: 5px 10px;
    border-radius: 1rem;
}

@media (min-width: 768px) {
    .root {
        grid-template-columns: 8rem auto;
    }
    .date {
        padding-top: 5px;
    }
}
</style>
