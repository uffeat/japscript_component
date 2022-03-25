class JapComponent extends HTMLElement {
  constructor() {
    super();
    this.parent_component = null;
    this._root = this.attachShadow({ mode: 'open' });
  }

  /* Returns component's html. */
  get html() {
    return this._root.innerHTML;
  }

  /* Sets component's html. */
  set html(html) {
    while (this._root.firstChild) {
      this._root.removeChild(this._root.firstChild);
    }
    this._root.innerHTML = html || '';  // Falsy html results in empty html (and not e.g., 'undefined').
  }

  /* Adds component to slot in this component. */
  add_component(component, { clear = false, slot = '' }) {
    this._check_slot(slot);
    if (clear === true) {
      this.clear(slot);
    }
    component.setAttribute('slot', slot);
    this.appendChild(component);  // Note: Appends to 'this' (NOT 'this._root').
    component.parent_component = this;
  }

  /* Removes components added to slot. */
  clear({slot}) {
    if (slot === undefined) {
      this.get_components({}).forEach(component => this.remove_component(component));
    }
    else {
      this._check_slot(slot);
      this.get_components({slot}).forEach(component => this.remove_component(component));
    }
  }

  /* Returns components added to slot'. */
  get_components({slot}) {
    if (slot === undefined) {
      return [...this.querySelectorAll(`*[slot]`)];
    }
    else {
      this._check_slot(slot);
      return [...this.querySelectorAll(`*[slot="${slot}"]`)];
    }
  }

  /* Returns array of slot names. Unnamed slot's name is ''.*/
  get_slots() {
    return [...this._root.querySelectorAll(`slot`)].map(element => element.name);
  }

  remove_component(component) {
    component.removeAttribute('slot');
    component.parent_component = null;
    component.remove();
  }

  take() {
    const appRoot = document.getElementById('appGoesHere');
    if (appRoot) {
      while (appRoot.firstChild) {
        appRoot.removeChild(appRoot.firstChild);
      }
      appRoot.appendChild(this);
    }
  }

  _check_slot(slot) {
    // Throw exception if slot does not exist:
    if (!this.get_slots().includes(slot)) {
      throw `Slot '${slot}' could not be found.`;
    }
  }

  /* Hides component */
  hide() {
    this.style.display = 'none';
  }

  remove_from_parent() {
    if (this.parent_component) {
      this.parent_component.remove_component(this);
    }
  }

  /* Shows component */
  show() {
    this.style.display = 'initial';
  }

}

const componentTag = 'jap-component';
customElements.get(componentTag) || customElements.define(componentTag, JapComponent);


export { JapComponent };