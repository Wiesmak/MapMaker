export class Grid extends HTMLElement {

  protected generateBlocks(sizeX: number, sizeY: number) {
    Array.from({ length: sizeX * sizeY }).forEach(() =>
      this.appendChild(document.createElement('mm-block'))
    );
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const sizeX = parseInt(this.getAttribute('sx') || '0')
    const sizeY = parseInt(this.getAttribute('sy') || '0')
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: grid;
          grid-template-columns: repeat(${sizeY}, 1fr);
          grid-template-rows: repeat(${sizeX}, 1fr);
          width: ${(sizeY * 96) / 32}vh;
          height: ${(sizeX * 96) / 32}vh; 
        }
      </style>
      <slot></slot>
    `

    this.generateBlocks(sizeX, sizeY)
  }
}