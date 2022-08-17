document.addEventListener("alpine:init", () => {

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      span, button {
        font-size: 120%;
      }

      span {
        width: 2rem;
        display: inline-block;
        text-align: center;
      }

      button {
        width: 2rem;
        height: 2rem;
        border: none;
        border-radius: 6px;
        background-color: blue;
        color: white;
      }
    </style>
    <button @click="dec">-</button>
    <span x-text="counter"></span>
    <button @click="$wc.inc()">+</button>
  `;

  class MyComponent extends HTMLElement {

    // The state must be defined as an object to be reactive
    state = Alpine.reactive({
      counter: this.hasAttribute("start") ? parseInt(this.getAttribute('start')) : 0,
      inc: this.inc.bind(this),
      dec: this.dec.bind(this),
    });

    constructor() {
      super();

      const shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(template.content.cloneNode(true));

      Alpine.addScopeToNode(shadow,this.state);
      Alpine.initTree(shadow);
    }

    connectedCallback() {
    }

    inc() {
      this.state.counter++;
    }
    dec() {
      this.state.counter--;
    }
  }

  customElements.define("my-reactive-shadow", MyComponent);
});
