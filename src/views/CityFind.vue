<template lang="pug">
  .city-find
    .city-find__content.content
      .city-find__icon
        .el-icon-location-information
      .city-find__message(v-html="isError ? msg.error : msg.success")
      .city-find__form
        transition(name="el-fade-in")
          .city-find__field(v-if="isHandle")
            CitySearch(
            placeholder="Ваш город"
            v-model="city"
            :remote-method="input"
            :loading="isLoading"
            @change="change"
            ref="search")
              el-option(v-for="item in cities" :value="item" :label="item.value" :key="item.id")
                .city-find__value {{item.value}}
                .city-find__label {{item.label}}

            //el-button.app-btn( @click="submit" :disabled="!city" ) Готово
          .city-search__buttons(v-else)
            el-button.app-btn( @click="getCity") Мое местоположение
            el-button.app-btn( @click="toggleFindType" type="text") Добавить вручную

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {State, Action, Getter, Mutation} from 'vuex-class';
  import Header from '../components/Header.vue';
  import Main from '../components/Main.vue';
  import CitySearch from '../components/CitySearch.vue';
  import { debounce } from "@/utils";
  import {ElSelect} from "element-ui/types/select";

  @Component({
    components: {
      Header,
      Main,
      CitySearch
    },
  })
  export default class CityFind extends Vue {
    @Action getCityByName;
    @Action getCityByPosition;
    @Action addCity;
    @Getter currentCity;

    $refs!: {
      search: Vue
    };

    cities: any[] = [];
    city: any = null;
    isHandle: boolean = false;
    isLoading: boolean = false;
    isError: boolean = false;
    msg: any = {
      success: `Добавьте город <br>для отображения погоды`,
      error: `Неудалось определить местоположение <br>Введите город в ручную`,
    };

    toggleFindType() {
      this.isHandle = !this.isHandle;

      if(this.isHandle) setTimeout(() => (this.$refs.search.$refs.select as ElSelect).focus(), 300)
    }

    input(e) {
      this.isLoading = true;
      this.debounceFind(e)
    }

    change(e){
      console.log(e);
      this.addCity(e)
    }

    debounceFind: Function = debounce(this.findCity, 800);

    findCity(queryString) {
      if (queryString.length === 0) {
        this.isLoading = false;
        return;
      }

      this.getCityByName(queryString)
        .then(res => {
          this.isLoading = false;
          this.cities = res
        })
        .catch(() => {
          this.isLoading = false;
        })
    }

    getCity() {
      this.getCityByPosition()
        .then(res => this.addCity(res));
    }

    showError(code) {
      code = 'err.' + code;
      this.isError = true;
      this.$message({
        showClose: true,
        message: `${this.$t(code)}`,
        type: 'error',
        duration: 50000
      });
    }

    submit() {
      this.addCity(this.city)
        .catch(err => {
          console.log(err);
          this.showError(err)
        });
    }

    mounted() {
      this.$loader.hide()
    }

  }
</script>

<style>
  .city-find {
    width: 100%;
    height: 100vh;
    padding: 32px 0;
    background: #03A9F4;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .city-find__content {
    width: 100%;
    max-width: 600px;
    text-align: center;
  }

  .city-find__icon {
    font-size: 50px;
  }

  .city-find__message {
    margin-bottom: 16px;
    font-size: 26px;
    line-height: 1.15;
  }


  .city-find__form {
    width: 410px;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .city-find__field {
    max-width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .app-btn {
      width: 100%;
    }

    .el-select-dropdown__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .city-find__value {
    line-height: 1;
    font-weight: 500;
  }

  .city-find__label {
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    color: var(--gray-80);
  }


  @media screen and (max-width: 767px) {
    .city-find {
      align-items: flex-start;
    }
  }


</style>
