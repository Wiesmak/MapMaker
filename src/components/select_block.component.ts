import Sprites from "@/resources/sprites.png"
import {Block, Grid} from "@/components/_components"
import {AutoRepositoryProvider} from "@/components/providers/_providers"

/**
 * SelectBlock class represents a selectable block element in the application.
 * It extends the Block class and overrides some of its methods.
 *
 * @example
 * <mm-select-block>
*  </mm-select-block>
 */
export class SelectBlock extends Block {
  /**
   * Get the scale factor of the block
   * @returns {number} The scale factor
   */
  get scaleFactor(): number {
    return 0.65
  }

  /**
   * Set the x-coordinate of the block and re-render
   * @param {number} value The new x-coordinate
   */
  set x(value: number) {
    this.setAttribute('px', value.toString())
    void this.render()
  }

  /**
   * Set the y-coordinate of the block and re-render
   * @param {number} value The new y-coordinate
   */
  set y(value: number) {
    this.setAttribute('py', value.toString())
    void this.render()
  }

  /**
   * Calculate the background position for the sprite
   * @param {number} spriteX The x-coordinate of the sprite
   * @param {number} spriteY The y-coordinate of the sprite
   * @returns {string} The calculated background position
   */
  private calculateBackgroundPosition(spriteX: number, spriteY: number): string {
    const spriteSize = 47
    const padding = 1
    const x = (spriteSize + padding) * spriteX + padding
    const y = (spriteSize + padding) * spriteY + padding
    return `-${x}px -${y}px`
  }

  /**
   * Load the sprite image from a URL
   * @param {string} url The URL of the sprite image
   * @returns {Promise<HTMLImageElement>} A promise that resolves to the loaded image
   */
  private loadSpriteImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = url
    })
  }

  /**
   * Scale the sprite to the specified width and height
   * @param {HTMLImageElement} img The image to scale
   * @param {string} position The position of the sprite in the image
   * @param {number} width The width to scale to
   * @param {number} height The height to scale to
   * @returns {string} The data URL of the scaled image
   */
  private scaleSprite(img: HTMLImageElement, position: string, width: number, height: number): string {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    const [x, y] = position.split(' ').map(val => Math.abs(parseInt(val)))

    canvas.width = width
    canvas.height = height

    ctx.drawImage(img, x, y, 47, 47, 0, 0, width, height)

    return canvas.toDataURL()
  }

  /**
   * Constructor for the SelectBlock class
   */
  constructor() {
    super()
  }

  /**
   * Handles the click event on the block
   */
  public click(): void {
    const grid = document.querySelector('mm-grid') as Grid
    let lastX = 0
    let lastY = 0
    const blocks: {x: number, y: number, oldImg: string}[] = []
    Array.from(grid.querySelectorAll('mm-block'))
      .filter((block: Element) => (block as Block).selected)
      .forEach(block => {
        blocks.push({x: (block as Block).x, y: (block as Block).y, oldImg: (block as Block).backgroundImage})
        ;(block as Block).backgroundImage = this._backgroundImage
        ;(block as Block).selected = false
        lastX = (block as Block).x
        lastY = (block as Block).y
      })

    const undoAction = () => blocks.forEach(block => {
      const blocks = grid.querySelectorAll('mm-block')
      blocks.forEach(blockElement => {
        if ((blockElement as Block).x === block.x && (blockElement as Block).y === block.y) {
          // @ts-ignore
          blockElement.backgroundImage = block.oldImg
        }
      })
    })

    const redoAction = () => blocks.forEach(block => {
      const blocks = grid.querySelectorAll('mm-block')
      blocks.forEach(blockElement => {
        if ((blockElement as Block).x === block.x && (blockElement as Block).y === block.y) {
          // @ts-ignore
          blockElement.backgroundImage = this._backgroundImage
        }
      })
    })

    this.historyRepository.addToHistory(undoAction, redoAction)
    // @ts-ignore
    const autoRepository = document.querySelector('mm-auto-repository-provider') as AutoRepositoryProvider
    autoRepository.getRepository().nextAutoEvent(
      grid,
      {x: lastX, y: lastY},
      // @ts-ignore
      (block: Block) => (block as SelectBlock).select()
    )
  }

  /**
   * Lifecycle method called when the block is connected to the DOM
   */
  async connectedCallback() {
    this.addEventListener('click', this.click)
    this.addEventListener('mouseenter', () => this.hover())
    this.addEventListener('mouseleave', () => this.unhover())
    await this.render()
  }

  /**
   * Lifecycle method called when the block is disconnected from the DOM
   */
  disconnectedCallback() {
    this.removeEventListener('click', this.click)
    this.removeEventListener('mouseenter', () => this.hovered = true)
    this.removeEventListener('mouseleave', () => this.hovered = false)
  }

  /**
   * Renders the block
   */
  async render() {
    const spriteX = parseInt(this.getAttribute('px') || '0');
    const spriteY = parseInt(this.getAttribute('py') || '0');
    const spritePosition = this.calculateBackgroundPosition(spriteX, spriteY)
    const spriteImage = await this.loadSpriteImage(Sprites)
    this._backgroundImage = this.scaleSprite(spriteImage, spritePosition, this.clientWidth, this.clientHeight)

    super.render()
    this.className = `${this.className} ${this._selected || this.hovered ? 'brightness-100' : 'brightness-50'}`
  }
}