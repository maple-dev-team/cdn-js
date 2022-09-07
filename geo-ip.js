import {html, css, LitElement} from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';
const privateOpen = Symbol('open');

class OneDialog extends LitElement {

  static get properties() {
    return { 
      open: { type: Boolean, attribute: 'open', reflect: true }
    };
  }
  
  static get styles() {
    return [css`
      :host .wrapper {
        opacity: 0;
        transition: visibility 0s, opacity 0.25s ease-in;
      }
      :host .wrapper:not(.open) {
        visibility: hidden;
      }
      :host .wrapper.open {
        align-items: center;
        display: flex;
        justify-content: center;
        height: 100vh;
        position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        opacity: 1;
        visibility: visible;
      }
      :host .overlay {
        background: rgba(0, 0, 0, 0.8);
        height: 100%;
        position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        width: 100%;
      }
      :host .dialog {
        background: #000;
        max-width: 600px;
        padding: 1rem;
        position: fixed;
      }`];
  }
  
  firstUpdated() {
    this._watchEscape = this._watchEscape.bind(this);
  }
  
  render() {
    return html`
    <div class="wrapper ${this.open ? 'open' : ''}" aria-hidden="${!this.open}">
      <div class="overlay" @click="${this.close}"></div>
      <div class="dialog" role="dialog" aria-labelledby="title" aria-describedby="content">
        <div id="content" class="content">
          <div class="main-div">
            <div style="font-size: 36px;">
            <img src="https://cdn.shopify.com/s/files/1/0003/6192/2624/files/stlthlogo_white_160x160.png?v=1662582043" alt="" data-mce-src="https://cdn.shopify.com/s/files/1/0003/6192/2624/files/stlthlogo_white_160x160.png?v=1662582043">
            </div>
            <div class="div-padding">IT SEEMS LIKE YOU ARE SEARCHING FROM</div>
            <div class="div-padding flex-center">
              <slot name="country-content"></slot>
            </div>
            <div class="div-padding">WOULD YOU LIKE TO VISIT THE UA SITE?</div>
            <div class="div-padding-buttons flex-around">
              <a href="#" class="button-stay">
                NO STAY ON THE CANADA SITE
              </a>
              <a href="#" class="button-yes">
                YES, TAKE ME TO THE UA SITE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  createRenderRoot() {
    return this;
  }
  
  get open() { return this[privateOpen]; }
  set open(isOpen) {
    this[privateOpen] = isOpen;
    const { activeElement } = document;
    if (isOpen) {
      if (activeElement) {
        this._wasFocused = activeElement;
      }
      document.addEventListener('keydown', this._watchEscape);
    } else {
      this._wasFocused && this._wasFocused.focus && this._wasFocused.focus();
      document.removeEventListener('keydown', this._watchEscape);
    }
  }
  close() {
    this.open = false
    const closeEvent = new CustomEvent('dialog-closed');
    this.dispatchEvent(closeEvent);
  }
  _watchEscape(event) {
    if (event.key === 'Escape') {
        this.close();   
    }
  }
}

customElements.define('one-dialog', OneDialog);

document.addEventListener("DOMContentLoaded", function(event) {
  var myDiv = document.createElement("div");
  myDiv.id = 'one-dialog-popup';
  myDiv.innerHTML = `
    <one-dialog>
      <span slot="country-content">
        <img src="https://flagcdn.com/w40/ua.png" alt="Ukraine">
        <span style="font-size: 36px;margin-left: 14px;">UKRAINE</span>
      </span>
    </one-dialog>`;
  document.body.appendChild(myDiv);
  document.querySelector('one-dialog').open = true;
});

