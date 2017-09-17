const style = require<CSSModule>("./ErrorMessage.scss");

import * as Vue from "vue";
import {Component} from "vue-property-decorator";
import {CreateElement} from "vue/types";
import {VNode} from "vue/types/vnode";

import jsxHelper from "util/jsx-helper";

@Component
class Index extends Vue {
  public render(createElement: CreateElement): VNode | null {
    const h = jsxHelper(createElement);

    return (
      <div class={style.Index}>
        Hello, Wallaby
      </div>
    );
  }
}

export default Index;
