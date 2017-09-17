import Vue from "vue";
import {CreateElement} from "vue/types/vue";

declare type HelperFunction = (tag: string | Vue | ((...args: any[]) => any), attribs: any, ...children: any[]) => any;

const includes = (val: any, arr: any[]) =>
(arr as any).includes(val);

const GLOBAL_ATTRIBUTES: string[] = [
  "accesskey",
  "contenteditable",
  "contextmenu",
  "dir",
  "draggable",
  "dropzone",
  "id",
  "itemprop",
  "lang",
  "slot",
  "spellcheck",
  "style",
  "tabindex",
  "title",
];

/**
 * Mapping from HTML attributes to tags for which they are valid.
 *
 * `null` represent global attributes (those that are valid for all tags).
 */
const HTML_ATTRIBUTES = {
  // "class" is omitted, because it is handled separately
  "accept": ["form", "input"],
  "accept-charset": ["form"],
  "action": ["form"],
  "alt": [
    "applet",
    "area",
    "img",
    "input",
  ],
  "async": ["script"],
  "autocomplete": [
    "form",
    "input",
  ],
  "autofocus": [
    "button",
    "input",
    "keygen",
    "select",
    "textarea",
  ],
  "autoplay": [
    "audio",
    "video",
  ],
  "autosave": ["input"],
  "buffered": [
    "audio",
    "video",
  ],
  "challenge": ["keygen"],
  "charset": ["meta", "script"],
  "checked": ["command", "input"],
  "cite": [
    "blockquote",
    "del",
    "ins",
    "q",
  ],
  "code": ["applet"],
  "codebase": ["applet"],
  "cols": ["textarea"],
  "colspan": [
    "td",
    "th",
  ],
  "content": [
    "meta",
  ],
  "controls": [
    "audio",
    "video",
  ],
  "coods": ["area"],
  "crossorigin": [
    "audio",
    "img",
    "link",
    "scripts",
    "video",
  ],
  "data": ["object"],
  "datetime": [
    "del",
    "ins",
    "time",
  ],
  "default": ["track"],
  "defer": ["script"],
  "dirname": [
    "input",
    "textarea",
  ],
  "disabled": [
    "button",
    "command",
    "fieldset",
    "input",
    "keygen",
    "optgroup",
    "option",
    "select",
    "textarea",
  ],
  "download": [
    "a",
    "area",
  ],
  "enctype": ["form"],
  "for": ["label"],
  "form": [
    "button",
    "fieldset",
    "input",
    "keygen",
    "label",
    "meter",
    "object",
    "output",
    "progress",
    "select",
    "textarea",
  ],
  "formaction": [
    "input",
    "button",
  ],
  "headers": [
    "td",
    "th",
  ],
  "height": [
    "canvas",
    "embed",
    "iframe",
    "img",
    "input",
    "object",
    "video",
  ],
  "high": ["meter"],
  "href": [
    "a",
    "area",
    "base",
    "link",
  ],
  "hreflang": [
    "a",
    "area",
    "link",
  ],
  "http-equiv": ["meta"],
  "integrity": [
    "link",
    "script",
  ],
  "ismap": ["img"],
  "keytype": ["keygen"],
  "kind": ["track"],
  "label": ["track"],
  "language": ["script"],
  "list": ["input"],
  "loop": [
    "audio",
    "bgsound",
    "marquee",
    "video",
  ],
  "low": ["meter"],
  "manifest": ["html"],
  "max": [
    "input",
    "meter",
    "progress",
  ],
  "maxlength": [
    "input",
    "textarea",
  ],
  "media": [
    "a",
    "area",
    "link",
    "source",
    "style",
  ],
  "method": ["form"],
  "min": [
    "input",
    "meter",
  ],
  "minlength": [
    "input",
    "textarea",
  ],
  "multiple": [
    "input",
    "select",
  ],
  "muted": ["video"],
  "name": [
    "button",
    "form",
    "fieldset",
    "iframe",
    "input",
    "keygen",
    "object",
    "output",
    "select",
    "textarea",
    "map",
    "meta",
    "param",
  ],
  "novalidate": ["form"],
  "open": ["details"],
  "optimum": ["meter"],
  "pattern": ["input"],
  // "ping" is omitted becase it is obscure and its purpose is unclear
  "placeholder": [
    "input",
    "textarea",
  ],
  "poster": ["video"],
  "preload": ["audio", "video"],
  "radiogroup": ["command"],
  "readonly": ["input", "textarea"],
  "rel": [
    "a",
    "area",
    "link",
  ],
  "required": [
    "input",
    "select",
    "textarea",
  ],
  "reversed": ["ol"],
  "rows": ["textarea"],
  "rowspan": [
    "td",
    "th",
  ],
  "sandbox": ["iframe"],
  "scope": ["th"],
  "scoped": ["style"],
  "selected": ["option"],
  "shape": ["area"],
  "size": ["input", "select"],
  "sizes": [
    "link",
    "img",
    "source",
  ],
  "span": [
    "col",
    "colgroup",
  ],
  "src": [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video",
  ],
  "srcdoc": ["iframe"],
  "srclang": ["track"],
  "srcset": ["img"],
  "start": ["ol"],
  "step": ["input"],
  "summary": ["table"],
  "target": [
    "a",
    "area",
    "base",
    "form",
  ],
  "type": [
    "button",
    "input",
    "command",
    "embed",
    "object",
    "script",
    "source",
    "style",
    "menu",
  ],
  "usemap": [
    "img",
    "input",
    "object",
  ],
  "value": [
    "button",
    "option",
    "input",
    "li",
    "meter",
    "progress",
    "param",
  ],
  "width": [
    "canvas",
    "embed",
    "iframe",
    "img",
    "input",
    "object",
    "video",
  ],
  "wrap": ["textarea"],
};

const PASSTHROUGH_OPTIONS = [
  "directives",
  "key",
  "ref",
  "slot",
];

const HTML_PASSTHROUGH_OPTIONS = [
  "class",
  "style",
];

const VUE_PASSTHROUGH_OPTIONS = [
  "props",
];

const isValidHTMLAttribute = (tag: string, attrib: string): boolean => {
  const tags: string[] = HTML_ATTRIBUTES[attrib] || [];
  return includes(tag, tags);
};

const buildOptions = (tagName: string, attributes: any): any => {
  if (attributes === null) {
    return {};
  }
  return Object.keys(attributes).reduce((options: any, attrib: string): any => {
    const val = attributes[attrib];
    if (includes(attrib, PASSTHROUGH_OPTIONS) || includes(attrib, HTML_PASSTHROUGH_OPTIONS)) {
      options[attrib] = val;
    } else if (attrib in HTML_ATTRIBUTES) {
      if (!isValidHTMLAttribute(tagName, attrib)) {
        return options;
      }
      (options.attrs = options.attrs || {})[attrib] = val;
    } else if (includes(attrib, GLOBAL_ATTRIBUTES) || attrib.startsWith("data-")) {
      (options.attrs = options.attrs || {})[attrib] = val;
    } else if (attrib.startsWith("n-on")) {
      const eventName = attrib.replace(/^n-on/, "");
      (options.nativeOn = options.nativeOn || {})[eventName] = val;
    } else if (attrib.startsWith("on")) {
      const eventName = attrib.replace(/^on/, "");
      (options.on = options.on || {})[eventName] = val;
    } else if (attrib.startsWith("slot-")) {
      const slotName = attrib.replace(/^slot-/, "");
      (options.scopedSlots = options.scopedSlots || {})[slotName] = val;
    } else {
      (options.domProps = options.domProps || {})[attrib] = val;
    }
    return options;
  }, {});
};

const buildComponentOptions = (component: Vue | ((...args: any[]) => any) | "transition", attributes: any): any => {
  if (attributes === null) {
    return {};
  }
  return Object.keys(attributes).reduce((options: any, attrib) => {
    const val = attributes[attrib];
    if (includes(attrib, PASSTHROUGH_OPTIONS) || includes(attrib, VUE_PASSTHROUGH_OPTIONS)) {
      options[attrib] = val;
    } else if (attrib.startsWith("slot-")) {
      const slotName = attrib.replace(/^slot-/, "");
      (options.scopedSlots = options.scopedSlots || {})[slotName] = val;
    } else {
      (options.props = options.props || {})[attrib] = val;
    }
    return options;
  }, {});
};

const jsxHelper = (h: CreateElement): HelperFunction =>
  (tag, attribs, ...children) => {
    const options = typeof tag === "string" && tag !== "transition" ?
      buildOptions(tag, attribs)
      : buildComponentOptions(tag, attribs);
    return h(tag as any, options, children);
  };

export default jsxHelper;
export {HelperFunction};
