<template lang="pug">
  header.header
    .header-inner.content
      .header-menu(@click="openDrawer")
        span



</template>

<script lang="ts">
  import { Component, Vue, } from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class Header extends Vue {

    openDrawer() {
      this.$emit('openDrawer', true)
    }

    private mounted(): void {

    }
  }
</script>

<style>
  .header {
    width: 100%;
    position: relative;
    background: transparent;
  }

  .header-inner {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-menu {
    width: 32px;
    height: 30px;
    margin-left: auto;
    position: relative;
    cursor: pointer;

    span,
    &::before,
    &::after {
      content: '';
      height: 3px;
      border-radius: 20px;
      position: absolute;
      background: var(--white-base);
    }

    span {
      width: 100%;
      margin: auto;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &::before {
      content: '';
      width: 85%;
      top: 5px;
      right: 0;
    }

    &::after {
      content: '';
      width: 70%;
      bottom: 5px;
      right: 0;
    }
  }
</style>