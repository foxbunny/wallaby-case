const style = require<CSSModule>("./ErrorMessage.scss");

import Vue from "vue";
import {Component} from "vue-property-decorator";
import {CreateElement} from "vue/types";
import {VNode} from "vue/types/vnode";

import jsxHelper from "util/jsx-helper";

@Component
class Index extends Vue {
  public mounted() {
    // tslint:disable:no-console
    console.log("I've been mounted");
  }

  public render(createElement: CreateElement): VNode | null {
    const h = jsxHelper(createElement);

    return (
      <div class={style.Index}>
        Hello, {this.$store.state.name}
      </div>
    );
  }
}

export default Index;
