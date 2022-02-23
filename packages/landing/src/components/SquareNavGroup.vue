<template>
  <div
    class="square-nav-group"
    style="groupStyles"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'SquareNavGroup',
  // props: {
  //     amount: {
  //         type: Number,
  //         required: true,
  //     },
  // },
  computed: {
    groupStyles() {
      return `
            `;
    },
  },
};
</script>

<style lang="scss" scoped>
.square-nav-group {
    width: 6rem;
    margin: 3rem auto;
    margin-top: 1rem;
    padding: 1rem;
    min-height: max-content;
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .square-nav {
        grid-column-end: span 1;
        grid-row-end: span 1;

        &:nth-child(odd) {
            grid-column-start: 1;
        }
        &:nth-child(even) {
            grid-column-start: 2;
        }
        &:nth-child(2) {
            grid-row-start: 2;
        }
        &:nth-child(3) {
            grid-row-start: 3;
        }
        &:nth-child(4) {
            grid-row-start: 4;
        }
        &:nth-child(5) {
            grid-row-start: 5;
        }
    }
}
</style>
