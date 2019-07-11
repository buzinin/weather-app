<template lang="pug">
  .sc-loader(v-if="visible" :class="loaderCss")
    .sc-loader__panel
      .spinner
        .rect1
        .rect2
        .rect3
        .rect4
        .rect5
      .vox-loader__message(v-if="message") {{message}}
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {  LoaderOptions } from "@/types/src/Global";

  @Component
  export default class Loader extends Vue {
    private visible: boolean = false;
    private fullscreen: boolean = true;
    private message: string = '';
    private transparent: boolean = false;

    get loaderCss() {
      return [
        this.message ? 'with-message' : '',
        this.fullscreen ? 'fullscreen' : '',
        this.transparent ? 'transparent' : ''
      ]
    }

    public show<Function>({fullscreen = true, transparent = false, message = ''}: LoaderOptions = {}) {
      this.visible = true;
      this.fullscreen = fullscreen;
      this.transparent = transparent;
      this.message = message;
    }

    public hide<Function>() {
      this.visible = false;
    }
  }
</script>

<style lang=scss>
  .sc-loader {
    display: flex;
    align-items: center;
    justify-content: center;

    &.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #fff;
      z-index: 9999;
    }

    &.transparent {
      background: rgba(255, 255, 255, 0.85);
    }

    .sc-loader__panel {
      text-align: center;
    }

    .spinner {
      margin: 0 auto;
      width: 150px;
      height: 40px;
      text-align: center;
      font-size: 10px;
    }

    .spinner > div {
      background-color: #9013fe;
      height: 100%;
      width: 4px;
      margin-right: 3px;
      display: inline-block;
      border-radius: 4px;
      animation: sc-stretchdelay 1.2s infinite ease-in-out;

      &:last-child {
        margin-right: 0;
      }
    }

    .spinner .rect2 {
      animation-delay: -1.1s;
    }

    .spinner .rect3 {
      animation-delay: -1.0s;
    }

    .spinner .rect4 {
      animation-delay: -0.9s;
    }

    .spinner .rect5 {
      animation-delay: -0.8s;
    }
  }


  @keyframes sc-stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1.0);

    }
  }
</style>
