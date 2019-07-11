<template lang="pug">
  main.main
    .weather
      slot(name="cities")
    .info
      slot(name="info")

</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';

  @Component
  export default class Main extends Vue {

    mounted() {
      this.$loader.hide()
    }
  }
</script>

<style>
  .main {
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .weather {
    height: calc(100vh - 260px);
    background:  transparent url("../../public/img/clouds-bg.svg") repeat-x 5px bottom / auto;
  }

  /* Info */
  .info {
    width: 100%;
    height: 200px;
    margin-top: auto;
    position: relative;
    background: #fff;
  }

  @media screen and (max-width: 1023px) and (orientation : landscape) {
    .weather {
      height: calc(100vh - 110px);
    }
    .info {
      height: 50px;
    }
  }
</style>