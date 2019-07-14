import Vue from 'vue'
import {
  Button,
  Input,
  Select,
  Option,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Message
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'
import './element-variables.scss'

locale.use(lang);
Vue.use(Button);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.prototype.$message = Message;

