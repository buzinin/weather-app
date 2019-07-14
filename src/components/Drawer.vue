<template lang="pug">
  .drawer
    header.drawer-header
      .drawer-search
        .drawer-close(@click="close" v-if="isSearch === false")
          span.el-icon-close
        .drawer-back(@click="closeSearch" v-else)
          span.el-icon-back
        .drawer-search__input(v-if="isSearch")
          input(placeholder="Введите название города" :value="city" @input="input" ref="input")
        .drawer-search__icon(@click="openSearch")
          span.el-icon-search

    section.drawer-content
      .search-results(v-if="isSearch")
        .search-results__empty(v-if="!cities.length") Ничего не найдено
        CityListItem(v-for="city in cities" :city="city" :key="city.id" @click="select(city)")
      .drawer-content(v-else)
        .drawer-tabs
          .drawer-tabs__item(
          :class="{'is-active': i === activeTab}"
          v-for="(tab, i) in tabs"
          @click="changeTab(i)") {{tab.name}}
        .drawer-content__scroll
          component(:is="tabs[activeTab].value")
      el-button(
      v-if="tabs[activeTab].value === 'CityList' && !isSearch"
      class="city-list__add"
      circle
      icon="el-icon-plus"
      type="primary"
      @click="openSearch")



</template>

<script lang="ts">
  import {Component, Vue,} from 'vue-property-decorator';
  import {State, Action, Getter, Mutation} from 'vuex-class';
  import CityList from '@/components/CityList.vue'
  import CityListItem from '@/components/CityListItem.vue'
  import Config from '@/components/Config.vue'
  import { debounce } from "@/utils";

  @Component({
    components: {
      CityList,
      CityListItem,
      Config
    }
  })
  export default class Drawer extends Vue {
    @Action getCityByName;
    @Action addCity;
    $refs: {
      input: HTMLInputElement
    };

    tabs: any[] = [
      {
        value: "CityList",
        name: "Города"
      },
      {
        value: "Config",
        name: "Настройки"
      }
    ];

    activeTab: any = 0;
    isLoading: boolean = false;
    isSearch: boolean = false;
    cities: any[] = [];
    city: string = '';

    input(e) {
      const value = e.target.value;
      console.log(value);
      this.city = value;
      this.debounceFind(value);
    }

    debounceFind: Function = debounce(this.findCity, 800);

    findCity(value: string) {
      if (value.length === 0) {
        this.isLoading = false;
        return;
      }

      this.getCityByName(value)
        .then(res => {
          this.isLoading = false;
          this.cities = res
        })
        .catch(() => {
          this.isLoading = false;
        })
    }

    select(city) {
      this.addCity(city)
        .then(() => {
          this.city = '';
          this.closeSearch();
        })
    }

    openSearch() {
      if (this.isSearch) return;
      this.isSearch = true;
      this.$nextTick(() => this.$refs.input.focus());
    }

    closeSearch() {
      this.isSearch = false;
    }

    changeTab(index) {
      this.activeTab = index;
    }

    close() {
      this.$emit('close', false);
    }

    private mounted(): void {

    }
  }
</script>

<style>
  .drawer {
    width: 450px;
    height: 100vh;
    max-width: 100%;
    background: #fbfbfb;
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.16);
  }

  .drawer-header {
    width: 100%;
    padding: 0 16px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: var(--shadow-dark-8dp);
    position: relative;
  }

  .drawer-search {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }


  .drawer-close,
  .drawer-back {
    width: 24px;
    height: 24px;
    font-size: 24px;
    line-height: 1;
    cursor: pointer;
  }

  .drawer-search__input {
    margin: 0 auto;

    input {
      background: transparent;
      border: 1px solid transparent;
      outline: none;
      display: inline-block;
      margin-left: auto;
      font-size: 16px;
      line-height: 24px;
    }

    input:focus {
      border-bottom: 1px solid #06a9f4;
    }


  }

  .drawer-search__icon {
    width: 24px;
    height: 24px;
    margin-left: auto;
    font-size: 24px;
  }

  .drawer-search__input + .drawer-search__icon {
    margin-left: 0;
  }

  .drawer-tabs {
    width: 100%;
    display: flex;
    padding: 16px;
    padding-bottom: 0;
  }

  .drawer-tabs__item {
    width: 50%;
    padding: 8px;
    text-align: center;
    font-size: 20px;
    line-height: 1;
    border-bottom: 2px solid #ccc;
    color: #ccc;
    cursor: pointer;
    transition: border 0.2s ease-in-out, color 0.2s ease-in-out;

    &.is-active {
      border-bottom: 2px solid #06a9f4;
      color: #06a9f4;
    }
  }

  .search-results {
    height: calc(100vh - 50px);
    padding: 16px;
    overflow-y: auto;
  }

  .search-results__empty {
    text-align: center;
  }

  .drawer-content__scroll{
    height: calc(100vh - 120px);
    padding: 0 16px;
    padding-top: 16px;
    position: relative;
    display: flex;
    overflow-y: auto;
  }

  .search-results,
  .drawer-content__scroll {
    &::-webkit-scrollbar {
      background-color: #fbfbfb;
      width: 8px;
      border-radius: 16px;
    }

    &::-webkit-scrollbar-track {
      background-color: #fbfbfb;
    }

    &::-webkit-scrollbar-track:hover {
      background-color: #fbfbfb;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--gray-30);
      border-radius: 16px;
      border: none;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--gray-40);
      border: none;
    }

    &::-webkit-scrollbar-button {
      display: none
    }
  }

  @media screen and (max-width: 1366px) {

  }
</style>