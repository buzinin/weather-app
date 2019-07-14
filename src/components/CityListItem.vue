<template lang="pug">
  .city-item
    .city-item__name(@click="$emit('click')")
      .city-item__value {{city.value}}
      .city-item__label {{city.fullName}}
    .city-item__temp(v-if="city.weather")
      span {{Math.round(city.weather.main.temp)}}°C
    .city-item__menu
      el-dropdown(trigger="click" placement="bottom" v-if="menu" @command="select")
        span.el-icon-more
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item Редактировать
          el-dropdown-item(:command="'remove'") Удалить


</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { State, Action, Getter, Mutation } from 'vuex-class';

  @Component({
    components: {}
  })
  export default class CityItem extends Vue {
    @Prop() city;
    @Prop({ default: false }) menu: boolean;

    select(value) {
     if (value === 'remove') this.$emit('remove');
    }

    private mounted(): void {

    }
  }
</script>

<style>
.city-item {
  width: 100%;
  margin-bottom: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  cursor: pointer;
}

.city-item__name {
  width: calc(100% - 70px);
}

.city-item__label {
  font-size: 12px;
  font-weight: 400;
  line-height: 1;
  color: var(--gray-80);
}

.city-item__temp {
  width: 50px;
  text-align: center;
}

.city-item__menu {
  width: 20px;
  text-align: center;

  .el-icon-more {
    font-size: 20px;
    display: inline-block;
    transform: rotate(90deg);
  }
}
</style>