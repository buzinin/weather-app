<template lang="pug">
  .city-list
    .city-list__title Выбранный город
    .city-list__current
      CityListItem(:city="currentCity")
    .city-list__title Все города
    .city-list__all
      CityListItem(v-for="(city, index) in cities" :city="city" @click="setCityIndex(index)")







</template>

<script lang="ts">
  import { Component, Vue, } from 'vue-property-decorator';
  import { State, Action, Getter, Mutation } from 'vuex-class';
  import CityListItem from "@/components/CityListItem.vue";

  @Component({
    components: {CityListItem}
  })
  export default class CityList extends Vue {
    @Getter currentCity;
    @Mutation setCityIndex;
    @State cities;
    test: any[] = Array(15);


    private mounted(): void {

    }
  }
</script>

<style>
  .city-list {
    width: 100%;
  }
  .city-list__current {
    margin-bottom: 16px;
  }
  .city-list__title {
    padding: 8px 0;
  }

  .city-list__add {
    width: 50px;
    height: 50px;
    z-index: 1;
    position: fixed;
    bottom: 30px;
    right: 20px;
    box-shadow: var(--shadow-dark-8dp);
  }

</style>