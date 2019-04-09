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
        box-sizing: border-box;
      }

      :host(.open) {
        left: 0;
        min-height: 100vh;
        width: 100vw;
        height: 100vh;
        animation-duration: 0.7s;
        animation-name: slidein;
        animation-fill-mode: forwards;
      }

      @keyframes slidein {
        0% {
          left: 0;
          min-height: 100vh;
          width: 100vw;
          height: 100vh;
          transform: translateX(100vw);
          animation-iteration-count: 1;
          opacity: 0;
        }
        50% {
          transform: translateX(0vw);
          opacity: 0;
        }
        100% {
          opacity: 1;
          left: 0;
          min-height: 100vh;
          width: 100vw;
          height: 100vh;
          transform: translateX(0vw);
          animation-iteration-count: 1;
        }
      }

      form {
        width: 90vw;
        max-width: 700px;
        padding: 5%;
        height: 80vh;
        box-sizing: border-box;
        margin: 10vh auto 10vh;
      }

      label {
        display: block;
        width: 100%;
        margin-bottom: 6px;
      }

      input {
        width: 100%;
        margin-bottom: 15px;
        height: 20px;
        padding: 3px;
        font-size: 16px;
      }

      input[type='button'] {
        background-color: #1b0f0b;
        color: white;
        padding: 10px;
        height: auto;
      }

      .close-button {
        position: fixed;
        top: 3vh;
        right: 3vw;
        padding: 10px;
        background-color: #1b0f0b;
        color: white;
        transition: all 0.7s ease-in-out;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50px;
        text-align: center;
        line-height: 3;
        cursor: pointer;
      }

      emoji-slider {
        margin-bottom: 15px;
      }
    `;
  }

  constructor() {
    super();
    this.one = 0;
    this.two = 0;
    this.three = 0;
    this.four = 0;
    this.five = 0;
    this.six = 0;
  }

  _onSubmit() {
    const objToEmit = {
      memberName: this.memberName,
      one: this.testing,
      two: this.java,
      three: this.javascript,
      four: this.html,
      five: this.joke,
      six: this.scruming,
    };
    this.dispatchEvent(new CustomEvent('new-player', { detail: objToEmit }));
    this._reset();
    this._handleClose();
  }

  _handleClose() {
    this.classList.remove('open');
    this.dispatchEvent(new CustomEvent('new-player-closed'));
  }

  _reset() {
    this.one = 0;
    this.two = 0;
    this.three = 0;
    this.four = 0;
    this.five = 0;
    this.six = 0;
    this.shadowRoot.querySelector('#memberName').value = '';
    this.shadowRoot.querySelector('#testing').value = '';
    this.shadowRoot.querySelector('#java').value = '';
    this.shadowRoot.querySelector('#javascript').value = '';
    this.shadowRoot.querySelector('#html').value = '';
    this.shadowRoot.querySelector('#joke').value = '';
    this.shadowRoot.querySelector('#scruming').value = '';
  }

  _handleChange(s) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(s.target.value)) {
      this[s.target.id] = s.target.value;
    } else {
      this[s.target.id] = Math.round(s.target.value * 100);
    }
  }

  render() {
    return html`
      <a @click="${this._handleClose}" class="close-button">Close</a>
      <form>
        <label for="memberName">Name of resource:</label>
        <input
          name="memberName"
          id="memberName"
          type="text"
          required
          value=""
          placeholder="Jane Doe"
          @change="${this._handleChange}"
        />

        <label for="one">Testing</label>
        <emoji-slider emoji="👍" id="testing" @change="${this._handleChange}"></emoji-slider>

        <label for="two">Java</label>
        <emoji-slider emoji="👍" id="java" @change="${this._handleChange}"></emoji-slider>

        <label for="three">JavaScript</label>
        <emoji-slider emoji="👍" id="javascript" @change="${this._handleChange}"></emoji-slider>

        <label for="four">HTML & CSS</label>
        <emoji-slider emoji="👍" id="html" @change="${this._handleChange}"></emoji-slider>

        <label for="five">Joke Master</label>
        <emoji-slider emoji="👍" id="joke" @change="${this._handleChange}"></emoji-slider>

        <label for="six">Scruming</label>
        <emoji-slider emoji="👍" id="scruming" @change="${this._handleChange}"></emoji-slider>

        <input type="button" @click="${this._onSubmit}" value="Add Team Member" />
      </form>
    `;
  }
}
