import { JapComponent } from "./jap-component.js";

const japComponent1 = new JapComponent();
japComponent1.html = `
<slot name="top"></slot>
<h1>Jap Component 1</h1>
<slot></slot>
`;
japComponent1.take()

const button1 = document.createElement('button')
button1.textContent = "button1"
japComponent1.add_component(button1, {})

const button2 = document.createElement('button')
button2.textContent = "button2"
japComponent1.add_component(button2, {slot: 'top'})

const button3 = document.createElement('button')
button3.textContent = "button3"
japComponent1.add_component(button3, {slot: 'top'})

//japComponent1.remove_from_parent()
//japComponent1.remove_component(button1)
//japComponent1.remove_component(button1)

console.log(japComponent1.get_components({}))
console.log(japComponent1.get_components({slot: ''}))
console.log(japComponent1.get_components({slot: 'top'}))
console.log(japComponent1.get_slots())

//japComponent1.clear({})
//japComponent1.clear({slot: 'top'})
//japComponent1.clear({slot: ''})
//japComponent1.clear({slot: ''})


const japComponent2 = new JapComponent();
japComponent2.html = `
<slot name="top"></slot>
<h2>Jap Component 2</h2>
<slot></slot>
`;

japComponent1.add_component(japComponent2, {})
//japComponent2.remove_from_parent()
//japComponent2.remove_from_parent()



