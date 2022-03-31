import { JapComponent } from "./jap-component.js";

const root = document.getElementById('appGoesHere');

const japComponent1 = new JapComponent();
japComponent1.shadowRoot.innerHTML = `
<h1>Jap Component 1</h1>
`;

root.appendChild(japComponent1);



