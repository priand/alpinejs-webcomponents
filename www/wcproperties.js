document.addEventListener("alpine:init", () => {

  const template = document.createElement("template");
    template.innerHTML = `
    <div>num=<span x-text="JSON.stringify(num)"></span></div>
    <div>bol=<span x-text="JSON.stringify(bol)"></span></div>
    <div>str=<span x-text="JSON.stringify(str)"></span></div>
    <div>obj=<span x-text="JSON.stringify(obj)"></span></div>
    <div>arr=<span x-text="JSON.stringify(arr)"></span></div>
  `;

  /*
   * Sample web component using Alpine.js for templating and reactive state.
   *
   * This component is using ShadowDOM
   */
  class MyComponent extends HTMLElement {

    /*
     * Component recative state.
     * The state is wrap with a reactive proxy. This could be made simpler in the
     * future when Javascript decorators will be available.
     * This is equivalent the Salesforce LWC @track decorator.
     *   https://developer.salesforce.com/docs/component-library/documentation/en/lwc/reference_decorators
     */
    state = Alpine.reactive({
      num: 0,
      bol: false,
      str: "xy",
      obj: {x:-1, y:-2},
      arr: [-1,-2],
    });

    constructor() {
      super();

      const shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(template.content.cloneNode(true));

      Alpine.addScopeToNode(shadow,this.state);
      Alpine.initTree(shadow);
    }

    get num() {
      return this.state.num;
    }
    set num(v) {
      this.state.num = v;
    }

    get bol() {
      return this.state.bol;
    }
    set bol(v) {
      this.state.bol = v;
    }

    get str() {
      return this.state.str;
    }
    set str(v) {
      this.state.str = v;
    }

    get obj() {
      return this.state.obj;
    }
    set obj(v) {
      this.state.obj = v;
    }

    get arr() {
      return this.state.arr;
    }
    set arr(v) {
      this.state.arr = v;
    }
  }

  customElements.define("my-prop", MyComponent);
});
