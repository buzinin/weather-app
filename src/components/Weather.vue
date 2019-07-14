<template lang="pug">
  .weather
    .weather__body
      slot(name="body")
    .weather__footer
      slot(name="footer")

</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';

  @Component
  export default class Weather extends Vue {

    mounted() {
      this.$loader.hide()
    }
  }
</script>

<style>
  .weather {
    width: 100%;
    height: calc(100vh - 50px);
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .weather__body {
    height: calc(100vh - 250px);
    padding: 0 16px;
  }

  /* Info */
  .weather__footer {
    width: 100%;
    height: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1366px) {

  }
</style>