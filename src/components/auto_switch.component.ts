import { Clickable } from "@/interfaces/_interfaces.ts"
import {AutoRepositoryProvider} from "@/components/providers/_providers"
import {AutoRepositoryInterface} from "@/repositories/auto.interface.ts"

export class AutoSwitch extends HTMLElement implements Clickable {
  protected autoRepository: AutoRepositoryInterface

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const provider = document.querySelector('mm-auto-repository-provider') as AutoRepositoryProvider;
    this.autoRepository = provider.getRepository();
  }

  click() {
    const checkbox = this.shadowRoot?.querySelector('#switch') as HTMLInputElement;
    this.autoRepository.setAutoMode(checkbox.checked);
  }

  connectedCallback() {
    this.addEventListener('click', this.click);
    this.render();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.click);
  }

  render() {
    // language=HTML
    this.shadowRoot!.innerHTML = `
        <style>
            :host {
                --md-sys-color-background: 28, 27, 31;
                --md-sys-color-on-background: 230, 225, 229;
                --md-sys-color-primary: 208, 188, 255;
                --md-sys-color-primary-container: 79, 55, 139;
                --md-sys-color-on-primary-container: 234, 221, 255;
                --md-sys-color-on-primary: 55, 30, 115;
                --md-sys-color-secondary: 204, 194, 220;
                --md-sys-color-secondary-container: 74, 68, 88;
                --md-sys-color-on-secondary-container: 232, 222, 248;
                --md-sys-color-surface: 28, 27, 31;
                --md-sys-color-on-surface: 230, 225, 229;
                --md-sys-color-surface-variant: 73, 69, 79;
                --md-sys-color-on-surface-variant: 202, 196, 208;
                --md-sys-color-surfac-tint: var(--md-sys-color-primary);
                --md-sys-color-outline: 147, 143, 153;
            }
            :host {
                background-color: rgb(var(--md-sys-color-background));
                transition: background-color .1s ease-in-out;
                color: rgb(var(--md-sys-color-on-background));
                user-select: none;
            }

            .md3.switch {
                user-select: none;
                position: relative;
                height: 32px;
                width: 50px;
                -webkit-tap-highlight-color: transparent;
                margin: 10px;
                font-family: "Roboto", sans-serif;
                float: left;
            }

            .md3.switch input {
                opacity: 0;
                width: 0;
                height: 0;
                margin: 0;
                padding: 0;
            }

            /* track */
            .md3.switch span.slider {
                position: absolute;
                cursor: pointer;
                background-color: rgb(var(--md-sys-color-surface-variant));
                width: 48px;
                height: 28px;
                border-radius: 28px;
                border: 2px solid rgb(var(--md-sys-color-outline));
                transition: background-color .1s ease-in-out,
                border-color .1s ease-in-out;
            }

            /* thumb */
            .md3.switch span.slider::before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 0px;
                margin: 6px;
                background-color: rgb(var(--md-sys-color-outline));
                border-radius: 28px;
                transition: left 175ms cubic-bezier(0, .5, .5, 1.5),
                background-color .1s ease-in-out,
                height 50ms ease-in-out,
                width 50ms ease-in-out,
                margin 50ms ease-in-out;
            }

            /* icon */
            .md3.switch span.slider span.icon {
                position: relative;
                left: 0px;
                margin: 6px 0px;
                height: 16px;
                width: 16px;
                font-size: 16px;
                text-align: center;
                opacity: 0;
                transition: left 175ms cubic-bezier(0, .5, .5, 1.5);
                color: rgb(var(--md-sys-color-surface-variant));
            }

            /* active track */
            .md3.switch input:checked+span.slider {
                background-color: rgb(var(--md-sys-color-primary));
                border-color: transparent;
            }

            /* active thumb */
            .md3.switch input:checked+span.slider::before {
                background-color: rgb(var(--md-sys-color-on-primary));
                height: 24px;
                width: 24px;
                left: 20px;
                margin: 2px;
            }

            /* hover thumb */
            .md3.switch input:not(:disabled):hover+span.slider::before {
                background-color: rgb(var(--md-sys-color-on-surface-variant));
            }

            /* active hover thumb */
            .md3.switch input:not(:disabled):checked:hover+span.slider::before {
                background-color: rgb(var(--md-sys-color-primary-container));
            }

            /* click thumb */
            .md3.switch input:not(:disabled):active+span.slider::before {
                height: 28px;
                width: 28px;
                margin: 0px;
            }

            /* active click thumb */
            .md3.switch input:not(:disabled):checked:active+span.slider::before {
                background-color: rgb(var(--md-sys-color-primary-container));
            }

            /* active icon */
            .md3.switch input:checked+span.slider span.icon {
                left: 26px;
                opacity: 1;
                color: rgb(var(--md-sys-color-on-primary-container));
            }

            /* disabled track */
            .md3.switch input:disabled+span {
                cursor: not-allowed;
            }

            .md3.switch input:disabled+span.slider {
                background-color: rgba(var(--md-sys-color-surface-variant), .12);
                border-color: rgba(var(--md-sys-color-on-surface), .12);
            }

            .md3.switch input:disabled:checked+span.slider {
                background-color: rgba(var(--md-sys-color-on-surface), .12);
                border-color: rgba(var(--md-sys-color-on-surface), 0);
            }

            /* disabled thumb */
            .md3.switch input:disabled+span.slider::before {
                background-color: rgba(var(--md-sys-color-on-surface), .38);
            }

            .md3.switch input:disabled:checked+span.slider::before {
                background-color: rgba(var(--md-sys-color-surface), 1);
            }

            /* disabled icon */
            .md3.switch input:disabled:checked+span.slider span.icon {
                color: rgba(var(--md-sys-color-on-surface), .38);
            }

            .md3.switch input:focus-visible + span.slider {
                outline: 2px solid rgb(var(--md-sys-color-primary));
            }

            .material-symbols-rounded {
                font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 48
            }
        </style>
        <label class="md3 switch">
            <slot></slot>
            <br>
            <input type="checkbox" id="switch"  name="switch">
            <span class="slider">
                <span class="material-symbols-rounded icon">
                </span>
            </span>
        </label>
    `;
  }
}