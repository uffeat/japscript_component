import { JapComponent } from "./jap-component.js";

const japComponent1 = new JapComponent({name: 'japComponent1'});
japComponent1.html = `
<style>
  .top {
    color: white;
    background-color: blue;
    margin: 0 32px;
  }
  
  .unnamed {
    color: brown;
    background-color: cornsilk;
    margin: 0 32px;
  }
  
  .bottom {
    color: darkgreen;
    background-color: pink;
    margin: 0 32px;
  }
</style>

<h1>Jap Component 1</h1>
<div class="top">
  <h2>top slot</h2>
  <slot name="top"></slot>
</div>
<div class="unnamed">
  <h2>unnamed slot</h2>
  <slot></slot>
</div>
<div class="bottom">
  <h2>bottom slot</h2>
  <slot name="bottom"></slot>
</div>
`;
japComponent1.take()

const button1 = document.createElement('button')
button1.name = 'button1';
button1.textContent = "button1"
japComponent1.addComponent(button1, {})
button1.removeFromParent();
japComponent1.addComponent(button1, {slot: 'top'})

//const button2 = document.createElement('button')
//button2.textContent = "button2"
//japComponent1.addComponent(button2, {slot: 'top'})

//const button3 = document.createElement('button')
//button3.textContent = "button3"
//japComponent1.addComponent(button3, {slot: 'top'})

//japComponent1.removeFromParent()
//japComponent1.removeFromParent(button1)
//japComponent1.removeFromParent(button1)

//console.log(japComponent1.getComponents({}))
//console.log(japComponent1.getComponents({slot: ''}))
//console.log(japComponent1.getComponents({slot: 'top'}))
//console.log(japComponent1.getSlots())

//japComponent1.clear({})
//japComponent1.clear({slot: 'top'})
//japComponent1.clear({slot: ''})
//japComponent1.clear({slot: ''})


//const japComponent2 = new JapComponent();
//japComponent2.html = `
//<slot name="top"></slot>
//<h2>Jap Component 2</h2>
//<slot></slot>
//`;

//japComponent1.addComponent(japComponent2, {})
//japComponent2.removeFromParent()
//japComponent2.removeFromParent()



