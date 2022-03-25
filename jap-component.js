class JapComponent extends HTMLElement {
  constructor({name="no-name"}) {
    super();
    this.name = name;
    this.parentComponent = null;
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
  addComponent(component, { clear = false, slot = '' }) {
    if (component.parentComponent) {
      throw `Cannot add component '${component.name || component}'. Component already added to '${component.parentComponent.name}'.`;
    }
    this._checkSlot(slot);
    if (clear === true) {
      this.clear(slot);
    }
    component.setAttribute('slot', slot);
    this.appendChild(component);  // Note: Appends to 'this' (NOT 'this._root').
    component.parentComponent = this;
    if (!('removeFromParent' in component)) {
      component.removeFromParent = () => {
        component.parentComponent.removeComponent(component);
      };
    }
  }

  /* Removes components added to slot. */
  clear({slot}) {
    if ((slot === undefined) || (slot === null)) {
      this.getComponents({}).forEach(component => this.removeComponent(component));
    }
    else {
      this._checkSlot(slot);
      this.getComponents({slot}).forEach(component => this.removeComponent(component));
    }
  }

  /* Returns components added to slot'. */
  getComponents({slot}) {
    if ((slot === undefined) || (slot === null)) {
      return [...this.querySelectorAll(`*[slot]`)];
    }
    else {
      this._checkSlot(slot);
      return [...this.querySelectorAll(`*[slot="${slot}"]`)];
    }
  }

  /* Returns array of slot names. Unnamed slot's name is ''.*/
  getSlots() {
    return [...this._root.querySelectorAll(`slot`)].map(element => element.name);
  }

  /* Hides component */
  hide() {
    this.style.display = 'none';
  }

  /* Removes components from the DOM and dissociates it fro this component (as parent component). */
  removeComponent(component) {
    component.removeAttribute('slot');
    component.parentComponent = null;
    component.remove();
  }

  /* If this component has a parent component, removes this components from the DOM and dissociates it from parent component. */
  removeFromParent() {
    if (this.parentComponent) {
      this.parentComponent.removeComponent(this);
    }
  }

  /* Shows component */
  show() {
    this.style.display = 'initial';
  }

  /* Makes the component fill the app's root element (with id 'appGoesHere') */
  take() {
    const appRoot = document.getElementById('appGoesHere');
    if (appRoot) {
      while (appRoot.firstChild) {
        appRoot.removeChild(appRoot.firstChild);
      }
      appRoot.appendChild(this);
    }
  }

  /* Checks that this component has a given slot and throws an error if not. */
  _checkSlot(slot) {
    // Throw exception if slot does not exist:
    if (!this.getSlots().includes(slot)) {
      throw `Slot '${slot}' could not be found in component '${this.name}'.`;
    }
  }

}

const componentTag = 'jap-component';
customElements.get(componentTag) || customElements.define(componentTag, JapComponent);


export { JapComponent };