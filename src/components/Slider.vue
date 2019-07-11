<template lang="pug">
  .siema(ref="slider")
    slot

</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import Siema from 'siema';

  @Component({
    components: {}
  })
  export default class Slider extends Vue {
    slider: any = null;

    initSlider() {
      this.slider = new Siema()
    }

    mounted() {
      this.initSlider();
    }

  }
</script>

<style>
  .slider {
    position: relative;
  }

  @media screen and (max-width: 1023px) and (orientation: landscape) {
    .js_slide {
      height: calc(100vh - 110px);
    }
  }
</style>