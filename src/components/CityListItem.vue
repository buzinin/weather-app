<template lang="pug">
  .city-item(@click="$emit('click')")
    .city-item__name
      span {{city.label}}
    .city-item__temp(v-if="city.weather")
      span {{city.weather.main.temp}}






</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { State, Action, Getter, Mutation } from 'vuex-class';

  @Component({
    components: {}
  })
  export default class CityItem extends Vue {
    @Prop() city;


    private mounted(): void {

    }
  }
</script>

<style>
.city-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.city-item__name {
  width: 70%;
}

.city-item__temp {
  width: 30%;
}
</style>