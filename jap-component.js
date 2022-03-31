class JapComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

}

const componentTag = 'jap-component';
customElements.get(componentTag) || customElements.define(componentTag, JapComponent);


export { JapComponent };