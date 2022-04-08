class WebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}

const getWebComponent = () => { return new WebComponent() }

customElements.get('web-component') || customElements.define('web-component', WebComponent);

export { getWebComponent, WebComponent };