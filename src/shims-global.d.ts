import Vue, { VNode } from 'vue'
import {LoaderOptions} from "@/types/src/Global"

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $loader: {
      show: (options?: LoaderOptions) => void,
      hide: () => void
    };
    $message?: any;
  }
}

declare module "*.json" {
  const value: any;
  export default value;
}
