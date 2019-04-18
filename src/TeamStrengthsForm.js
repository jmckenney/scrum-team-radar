import { html, LitElement, css } from 'lit-element';
import 'emoji-slider';
import nanoid from 'nanoid';

export default class TeamStrengthsForm extends LitElement {
  static get properties() {
    return {
      strengths: { type: Array },
    };
  }

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
    this.strengths = [];
  }

  _onSubmit() {
    const strengthValues = [
      this.ms0,
      this.ms1,
      this.ms2,
      this.ms3,
      this.ms4,
      this.ms5,
      this.ms6,
    ].filter(s => s && s > 0);

    const objToEmit = {
      memberName: this.memberName,
      memberId: nanoid(),
      strengths: strengthValues,
    };

    this.dispatchEvent(new CustomEvent('new-player', { detail: objToEmit }));
    this._reset();
    this._handleClose();
  }

  _processStrengths() {
    this.strengths = [this.s1, this.s2, this.s3, this.s4, this.s5, this.s6, this.s7].filter(
      s => s && s.length > 0 && s.length < 10,
    );

    this.dispatchEvent(new CustomEvent('new-strengths', { detail: this.strengths }));
    this.requestUpdate();
  }

  _handleClose() {
    this.classList.remove('open');
    this.dispatchEvent(new CustomEvent('new-player-closed'));
  }

  _reset() {
    this.shadowRoot.querySelector('#memberName').value = '';
    // eslint-disable-next-line no-return-assign
    this.shadowRoot.querySelectorAll('emoji-slider').forEach(e => (e.value = ''));
  }

  _handleChange(s) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(s.target.value)) {
      this[s.target.id] = s.target.value;
    } else {
      this[s.target.id] = Math.round(s.target.value * 100);
    }
  }

  _renderMemberEntryForm() {
    return html`
      <form>
        <label for="memberName">Name of resource:</label>
        <input
          name="memberName"
          id="memberName"
          type="text"
          required
          value=""
          @change="${this._handleChange}"
        />

        ${this.strengths.map(
          (strength, i) => html`
            <label for="one">${strength}</label>
            <emoji-slider emoji="👍" id="ms${i}" @change="${this._handleChange}"></emoji-slider>
          `,
        )}

        <input type="button" @click="${this._onSubmit}" value="Add Team Member" />
      </form>
    `;
  }

  _renderStrengthsForm() {
    return html`
      <form>
        <p>Strengths (Minimum 3):</p>
        <input name="s1" id="s1" type="text" @change="${this._handleChange}" />
        <input name="s2" id="s2" type="text" @change="${this._handleChange}" />
        <input name="s3" id="s3" type="text" @change="${this._handleChange}" />
        <input name="s4" id="s4" type="text" @change="${this._handleChange}" />
        <input name="s5" id="s5" type="text" @change="${this._handleChange}" />
        <input name="s6" id="s6" type="text" @change="${this._handleChange}" />
        <input name="s7" id="s7" type="text" @change="${this._handleChange}" />
        <input type="button" @click="${this._processStrengths}" value="Add Strengths" />
      </form>
    `;
  }

  _displayForm() {
    if (this.strengths.length >= 3) {
      return this._renderMemberEntryForm();
    }
    return this._renderStrengthsForm();
  }

  render() {
    return html`
      <a @click="${this._handleClose}" class="close-button">Close</a>
      ${this._displayForm()}
    `;
  }
}
