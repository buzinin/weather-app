<template lang="pug">
  .city-search
    el-select(
    :autofocus="true"
    :filterable="true"
    :remote="true"
    default-first-option
    :popper-append-to-body="false"
    v-on="$listeners"
    v-bind="$attrs"
    ref="select")
      slot
    .city-search__icon
      .city-search__spinner(v-if="$attrs.loading")
        include ../assets/img/spinner.svg
      .el-icon-edit(v-else)


</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {ElSelect} from "element-ui/types/select";

  @Component({
    inheritAttrs: false
  })
  export default class CitySearch extends Vue {

    $refs!: {
      select: ElSelect
    };

    mounted() {

    }

  }
</script>

<style>

  .city-search {
    max-width: 100%;
    position: relative;
    margin-bottom: 16px;

    .el-select {
      width: 410px;
      max-width: 100%;

    }

    .el-select-dropdown {
      max-width: 300px;
      left: 0 !important;
      text-align: left;
    }

    .el-input__inner {
      padding-right: 40px;
      border: none !important;
      outline: none !important;
    }
  }

  .city-search__icon {
    position: absolute;
    top: 50%;
    right: 10px;
    font-size: 24px;
    color: #03A9F4;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .city-search__spinner {
    .spinner .path {
      stroke: #03A9F4;
    }
  }
</style>
