
document.addEventListener("alpine:init", () => {

  const template = document.createElement("template");
  template.innerHTML = `
    <button @click="dec">-</button>
    <span x-text="counter"></span>
    <button @click="inc">+</button>
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
        // Attaching the state directly to the element does not work as Alpine will not be able to observe it.
        // There are 2 solutions though:
        //  1. Attach the state as an attribute to the element
        //  2. Attach the scope to the node an reinitialize the tree
        // The second solution is the one used here.
        //
        //this.setAttribute("x-data", "$el.state");

        this.appendChild(template.content.cloneNode(true));

        Alpine.addScopeToNode(this,this.state);
        Alpine.initTree(this);
    }

    inc() {
      this.state.counter++;
    }
    dec() {
      this.state.counter--;
    }
  }

  customElements.define("my-reactive-light", MyComponent);
});
