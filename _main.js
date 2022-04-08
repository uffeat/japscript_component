import { getWebComponent, WebComponent } from "./web-component.js";

const $app = document.getElementById('app')

const $webComponent1 = new WebComponent()
$webComponent1.shadowRoot.innerHTML = `
<h1>Web Component 1</h1>
`

$app.appendChild($webComponent1)

const $webComponent2 = getWebComponent()
$webComponent2.shadowRoot.innerHTML = `
<h1>Web Component 2</h1>
`

$app.appendChild($webComponent2)





