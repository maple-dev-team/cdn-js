import {html, css, LitElement} from 'https://cdn.jsdelivr.net/npm/lit-element@3.2.2/index.min.js';
import {customElement, property} from 'https://cdn.jsdelivr.net/npm/lit-element@3.2.2/decorators.js';

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
  static styles = css`p { color: blue }`;

  @property()
  name = 'Somebody';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
document.getElementById("liquid-body").innerHTML+= '<simple-greeting name="World"></simple-greeting>'
