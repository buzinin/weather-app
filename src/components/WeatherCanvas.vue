<template lang="pug">
  canvas(id="weather")


</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {City} from "@/types/src/RootState";

  @Component
  export default class WeatherCanvas extends Vue {
    ctx: any = null;
    particles: any = [];
    w: number = null;
    h: number = null;

    letItRain(){
      //Rain Canvas
      const maxParts = 300;
      const canvas: any = document.getElementById('weather');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if(canvas.getContext) {
        this.ctx = canvas.getContext('2d');
        this.w = canvas.width;
        this.h = canvas.height;
        this.ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = 'round';

        for(let i = 0; i < maxParts; i++) {
          this.particles.push({
            x: Math.random() * this.w,
            y: Math.random() * this.h,
            l: Math.random(),
            xs: -4 + Math.random() * 4 + 2,
            ys: Math.random() * 10 + 10
          })
        }

        const drawFn = this.draw.bind(this);
        setInterval(drawFn, 30);
      }
    }

    draw() {
      this.ctx.clearRect(0, 0, this.w, this.h);
      for(var i = 0; i < this.particles.length; i++) {
        var p = this.particles[i];
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        this.ctx.stroke();
      }
      this.move();
    }

    move() {
      for(var i = 0; i < this.particles.length; i++) {
        var p = this.particles[i];
        p.x += 0.1;
        p.y += 5;
        if(p.x > this.w || p.y > this.h) {
          p.x = Math.random() * this.w;
          p.y = -20;
        }
      }
    }

    mounted() {
      this.letItRain();
    }
  }
</script>

<style>
  #weather {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>