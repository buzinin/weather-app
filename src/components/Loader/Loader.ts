import Vue, {PluginObject, VNodeDirective, VueConstructor} from 'vue';
import LoaderView from './Loader.vue';
import {LoaderOptions} from '@/types/src/Global';

interface MyVue extends Vue{
  show?: any;
  hide?: any;
}

class Loader implements PluginObject<{}> {
  private instance?: MyVue;
  private loader?: Element;

  public install(Vue: VueConstructor<Vue>) {
    const globalLoader: LoaderView = new LoaderView({
      el: document.createElement('div'),
    });
    Vue.prototype.$loader = globalLoader;
    this.insertInDOM(document.body, globalLoader.$el);
    this.registerDirective();
  }

  private insertInDOM(parent: HTMLElement, loader: Node) {
    parent && parent.appendChild(loader);
  }

  private registerDirective() {
    Vue.directive('loading', {
      bind: (el: HTMLElement, binding: VNodeDirective) => {
        const loader: LoaderView = new LoaderView({
          el: document.createElement('div'),
          data: {
            fullscreen: !!binding.modifiers.fullscreen,
            size: binding.modifiers.s ? 's' : binding.modifiers.xs ? 'xs' : 'l',
            color: binding.modifiers.white ? 'white' : 'violet',
            transparent: !!binding.modifiers.transparent,
            visible: !!binding.value
          }
        });

        this.instance = loader;
        this.loader = loader.$el;
        el.style.position = 'relative';
        this.insertInDOM(el, this.loader);
      },
      update: (el: HTMLElement, binding: VNodeDirective) => {
        if (binding.oldValue !== binding.value && this.instance) {
          binding.value
            ? this.instance.show(binding.modifiers as LoaderOptions)
            : this.instance.hide();
        }
      },
      unbind: () => {
        if (this.loader && this.loader.parentNode)  {
          this.loader.parentNode.removeChild(this.loader);
        }
      }
    });
  }
}

export default new Loader();