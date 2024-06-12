export class Grid extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: repeat(32, 1fr);
          grid-template-rows: repeat(32, 1fr);
          width: 96vh;
          height: 96vh; 
        }
      </style>
      <slot></slot>
    `

    Array.from({ length: 1024 }).forEach(() =>
      this.appendChild(document.createElement('mm-block'))
    );
  }
}