import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {customElement, property} from 'https://cdn.jsdelivr.net/gh/lit/dist@2.3.0/all/lit-all.min.js';

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
