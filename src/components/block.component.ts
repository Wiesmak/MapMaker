import { Clickable, Hoverable,  Selectable, Scalable } from '@/interfaces/_interfaces'
import { HistoryRepositoryInterface, KeyboardRepositoryInterface, MouseRepositoryInterface } from "@/repositories/_repositories.ts"
import { Grid, HistoryRepositoryProvider, MouseRepositoryProvider, KeyboardRepositoryProvider } from "@/components/_components.ts"

/**
 * Enumeration for border colors.
 * @enum {string}
 * @property {string} White - Represents the CSS class for a white border color.
 * @property {string} Red - Represents the CSS class for a red border color.
 *
 * @example
 * <mm-block>
 * </mm-block>
 */
enum BorderColor {
  /**
   * Represents the CSS class for a white border color.
   */
  White = 'border-on-surface',

  /**
   * Represents the CSS class for a red border color.
   */
  Red = 'border-red-700',
}

/**
 * Block class represents a block element in the application.
 * It implements Clickable, Hoverable, Selectable, Scalable interfaces.
 */
export class Block extends HTMLElement implements Clickable, Hoverable, Selectable, Scalable {
  /**
   * X-coordinate of the block
   */
  protected _x: number = 0;

  /**
   * Y-coordinate of the block
   */
  protected _y: number = 0;

  /**
   * Border color of the block
   */
  protected _borderColor: BorderColor = BorderColor.White;

  /**
   * Indicates if the block is selected
   */
  protected _selected: boolean = false;

  /**
   * Indicates if the block is hovered
   */
  protected _hovered: boolean = false;

  /**
   * Background image of the block
   */
  protected _backgroundImage: string = '';

  /**
   * Keyboard repository
   */
  protected keyboardRepository: KeyboardRepositoryInterface;

  /**
   * Mouse repository
   */
  protected mouseRepository: MouseRepositoryInterface;

  /**
   * History repository
   */
  protected historyRepository: HistoryRepositoryInterface;

  /**
   * Keyboard listeners
   */
  protected keyboardListeners: Map<string, string> = new Map();

  /**
   * Mouse listeners
   */
  protected mouseListeners: Map<string, string> = new Map();

  /**
   * Get the x-coordinate of the block
   * @returns {number} The x-coordinate
   */
  get x(): number {
    return this._x;
  }

  /**
   * Get the y-coordinate of the block
   * @returns {number} The y-coordinate
   */
  get y(): number {
    return this._y;
  }

  /**
   * Set the x-coordinate of the block
   * @param {number} value The new x-coordinate
   */
  set x(value: number) {
    this._x = value;
    void this.render();
  }

  /**
   * Set the y-coordinate of the block
   * @param {number} value The new y-coordinate
   */
  set y(value: number) {
    this._y = value;
    void this.render();
  }

  /**
   * Get the selected state of the block
   * @returns {boolean} The selected state
   */
  get selected(): boolean {
    return this._selected;
  }

  /**
   * Set the selected state of the block
   * @param {boolean} value The new selected state
   */
  set selected(value: boolean) {
    this._selected = value;
    this._borderColor = value ? BorderColor.Red : BorderColor.White;
    this.render();
  }

  /**
   * Get the hovered state of the block
   * @returns {boolean} The hovered state
   */
  get hovered(): boolean {
    return this._hovered;
  }

  /**
   * Set the hovered state of the block
   * @param {boolean} value The new hovered state
   */
  set hovered(value: boolean) {
    this._hovered = value;
    this._borderColor = value ? BorderColor.Red : this.selected ? BorderColor.Red : BorderColor.White;
    this.render();
  }

  /**
   * Get the background image of the block
   * @returns {string} The background image
   */
  get backgroundImage(): string {
    return this._backgroundImage;
  }

  /**
   * Set the background image of the block
   * @param {string} value The new background image
   */
  set backgroundImage(value: string) {
    this._backgroundImage = value;
    this.render();
  }

  /**
   * Get the scale factor of the block
   * @returns {number} The scale factor
   */
  get scaleFactor(): number {
    return 0.9;
  }

  /**
   * Selects the block
   */
  public select(): void {
    this.selected = true;
  }

  /**
   * Deselects the block
   */
  public deselect(): void {
    this.selected = false;
  }

  /**
   * Toggles the selected state of the block
   */
  public toggle(): void {
    this.selected = !this.selected;
  }

  /**
   * Handles the click event on the block
   */
  public click(): void {
    if (this.keyboardRepository.isKeyDown('Control') || this.keyboardRepository.isKeyDown('Meta')) {
      if (this.selected) this.deselect();
      else this.select();
    } else {
      const grid = document.querySelector('mm-grid') as Grid;
      const blocks = grid.querySelectorAll('mm-block') as NodeListOf<Block>;
      blocks.forEach(block => block.deselect());
      this.select();
    }
  }

  /**
   * Handles the hover event on the block
   */
  public hover(): void {
    this.hovered = true;
  }

  /**
   * Handles the unhover event on the block
   */
  public unhover(): void {
    this.hovered = false;
  }

  /**
   * Deletes the block if it is selected
   */
  protected delete(): void {
    if (this.selected) {
      const blockCords = { x: this.x, y: this.y };
      const undoAction = () => {
        const grid = document.querySelector('mm-grid') as Grid;
        const gridBlocks = grid.querySelectorAll('mm-block');
        const block = Array.from(gridBlocks).find(block => (block as Block).x === blockCords.x && (block as Block).y === blockCords.y);
        if (block) {
          (block as Block).backgroundImage = this.backgroundImage;
        }
      };
      const redoAction = () => {
        const grid = document.querySelector('mm-grid') as Grid;
        const gridBlock = grid.querySelectorAll('mm-block');
        const block = Array.from(gridBlock).find(block => (block as Block).x === blockCords.x && (block as Block).y === blockCords.y);
        if (block) {
          (block as Block).backgroundImage = '';
        }
      };
      this.historyRepository.addToHistory(undoAction, redoAction);
      this.deselect();
      this.backgroundImage = '';
    }
  }

  /**
   * Handles the window resize event
   */
  private onWindowResize(): void {
    this.mouseListeners.forEach((select, deselect) => {
      this.mouseRepository.unlistenSelect(select)
      this.mouseRepository.unlistenDeselect(deselect)
    })
    this.mouseListeners.set(
      this.mouseRepository.listenSelect(this.getClientRects()[0], () => this.select()),
      this.mouseRepository.listenDeselect(this.getClientRects()[0], () => this.deselect())
    )
  }

  /**
   * Constructor for the Block class
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const keyboardProvider = document.querySelector('mm-keyboard-repository-provider') as KeyboardRepositoryProvider
    const mouseProvider = document.querySelector('mm-mouse-repository-provider') as MouseRepositoryProvider
    const historyProvider = document.querySelector('mm-history-repository-provider') as HistoryRepositoryProvider
    this.keyboardRepository = keyboardProvider.getRepository()
    this.mouseRepository = mouseProvider.getRepository()
    this.historyRepository = historyProvider.getRepository()
  }

  /**
   * Lifecycle method called when the block is connected to the DOM
   */
  connectedCallback(): void {
    this.render();
    this.addEventListener('click', this.click);
    this.addEventListener('mouseenter', () => this.hover());
    this.addEventListener('mouseleave', () => this.unhover());
    this.keyboardListeners.set('Delete', this.keyboardRepository.listen('Delete', (_) => this.delete()));
    console.log(this)
    this.mouseListeners.set(
      this.mouseRepository.listenSelect(this.getClientRects()[0], () => this.select()),
      this.mouseRepository.listenDeselect(this.getClientRects()[0], () => this.deselect())
    );
    this.addEventListener('resize', this.onWindowResize.bind(this));
  }

  /**
   * Lifecycle method called when the block is disconnected from the DOM
   */
  disconnectedCallback(): void {
    this.removeEventListener('click', this.click);
    this.removeEventListener('mouseenter', () => this.hover());
    this.removeEventListener('mouseleave', () => this.unhover());
    this.keyboardListeners.forEach((id, key) => this.keyboardRepository.unlisten(key, id));
    this.mouseListeners.forEach((select, deselect) => {
      this.mouseRepository.unlistenSelect(select);
      this.mouseRepository.unlistenDeselect(deselect);
    });
    this.removeEventListener('resize', this.onWindowResize.bind(this));
  }

  /**
   * Renders the block
   */
  render(): void {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          background-image: url(${this._backgroundImage});
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          width: ${3 * this.scaleFactor}vh;
          height: ${3 * this.scaleFactor}vh;
  
          ${ this._hovered ? 'box-shadow: 0 0 2px 0 orange;' : ''}
          ${ this._selected ? 'box-shadow: 0 0 2px 0 red;' : '' }
        }
      </style>
    `;
    this.className = `border border-dotted ${this._borderColor}`;
  }
}