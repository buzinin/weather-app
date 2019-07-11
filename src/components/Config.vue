<template lang="pug">
  .config
    div Configuration






</template>

<script lang="ts">
  import { Component, Vue, } from 'vue-property-decorator';
  import { State, Action, Getter, Mutation } from 'vuex-class';
  import CityItem from "@/components/CityListItem.vue";

  @Component({
    components: {CityItem}
  })
  export default class Config extends Vue {
    @Getter currentCity;


    private mounted(): void {

    }
  }
</script>

<style>

</style>