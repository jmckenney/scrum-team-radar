import { html, LitElement, css } from 'lit-element';
import 'emoji-slider';

export default class TeamStrengthsForm extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        max-width: 100vw;
        height: 100vh;
        transform: translateX(100vw);
        transition: transform 0.7s ease-in-out;
      }

      :host(.open) {
        left: 0;
        min-height: 100vh;
        background-color: white;
        width: 100vw;
        height: 100vh;
        transform: translateX(0vw);
      }

      form {
        width: 90%;
        padding: 5%;
        background-color: white;
        height: 100%;
      }

      label {
        width: 100%;
      }

      input {
        width: 100%;
      }

      .close-button {
        position: fixed;
        bottom: 0;
        right: 0;
        padding: 10px;
        color: white;
        background-color: black;
        transition: all 0.7s ease-in-out;
        cursor: pointer;
      }
    `;
  }

  constructor() {
    super();
    this.josh = '';
  }

  _onSubmit() {
    const objToEmit = {};
    const formData = new FormData(this.shadowRoot.querySelector('form'));
    const formDataEntries = formData.entries();
    // eslint-disable-next-line no-restricted-syntax
    for (const pair of formDataEntries) {
      const [prop, value] = pair;
      objToEmit[prop] = value;
    }
    this.dispatchEvent(new CustomEvent('new-player', { detail: objToEmit }));
    this._handleClose();
  }

  _handleClose() {
    this.classList.remove('open');
  }

  render() {
    return html`
      <a @click="${this._handleClose}" class="close-button">Close</a>
      <form>
        <label for="memberName">Member Name</label>
        <input name="memberName" id="memberName" type="text" required value="yo" />

        <label for="one">One</label>
        <input name="one" id="one" type="text" required value="5" />

        <label for="two">Two</label>
        <input name="two" id="two" type="text" required value="5" />

        <label for="three">Three</label>
        <input name="three" id="three" type="text" required value="5" />

        <label for="four">Four</label>
        <input name="four" id="four" type="text" required value="5" />

        <label for="five">Five</label>
        <input name="five" id="five" type="text" required value="5" />

        <label for="six">Six</label>
        <input name="six" id="six" type="text" required value="5" />

        <input type="button" @click="${this._onSubmit}" value="Click Me" />

        <emoji-slider emoji="😍"></emoji-slider>
      </form>
    `;
  }
}
