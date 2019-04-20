/* eslint-disable radix */
import { html, LitElement, css } from 'lit-element';
import './chart-component';
import './team-strengths-form';
import nanoid from 'nanoid';

export default class AppComponent extends LitElement {
  static get properties() {
    return {};
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      :host {
        position: absolute;
        top: 0;
        min-height: 100vh;
        display: flex;
        flex-direction: row;
      }

      .open-button {
        position: absolute;
        bottom: 3vh;
        right: 15px;
        padding: 29px 0;
        background-color: rgba(255, 255, 255, 0.6);
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        text-align: center;
        line-height: 1;
      }

      .open-button.active {
        width: 94vw;
        height: 94vh;
        right: 3vw;
        background-color: rgba(255, 255, 255, 0.9);
        color: transparent;
      }

      .open-button:hover {
        background-color: rgba(255, 255, 255, 0.8);
      }

      .reset-button {
        position: absolute;
        bottom: 3vh;
        right: 95px;
        padding: 29px 0;
        background-color: rgba(255, 255, 255, 0.6);
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        text-align: center;
        line-height: 1;
      }

      .hide {
        display: none;
      }
    `;
  }

  firstUpdated() {
    this.chart = this.shadowRoot.querySelector('chart-component');
    this.form = this.shadowRoot.querySelector('team-strengths-form');
    this.addLink = this.shadowRoot.getElementById('openFormLink');
    this.resetLink = this.shadowRoot.getElementById('resetLink');

    const defaultTestMembers = [
      {
        name: 'Default Jimmy',
        strengths: [55, 76, 99, 99, 2, 20],
        id: nanoid(),
      },
      {
        name: 'Default Janice',
        strengths: [89, 67, 56, 45, 34, 49],
        id: nanoid(),
      },
    ];
    this.chart.members = defaultTestMembers;

    this.chart.strengths = [
      'Testing',
      'Java',
      'JavaScript',
      'HTML & CSS',
      'Joke Master',
      'Scruming',
    ];
    this.shadowRoot.querySelector('team-strengths-form').addEventListener('new-player', e => {
      const newMember = {
        name: e.detail.memberName,
        id: e.detail.memberId,
        strengths: e.detail.strengths,
      };

      this.chart.members = [...this.chart.members, newMember];
    });

    this.shadowRoot.querySelector('team-strengths-form').addEventListener('new-strengths', e => {
      this._handleChartReset();
      const strengths = e.detail;
      this.chart.strengths = strengths;
    });

    this.shadowRoot
      .querySelector('team-strengths-form')
      .addEventListener('new-player-closed', () => {
        this.addLink.classList.remove('active');
        this.resetLink.classList.remove('hide');
      });
  }

  _handleFormOpen() {
    this.addLink.classList.add('active');
    this.form.classList.add('open');
    this.resetLink.classList.add('hide');
  }

  _handleChartReset() {
    this.chart.members = [];
    this.chart.strengths = [];
  }

  _handleAppReset() {
    this._handleChartReset();
    this._handleFormReset();
  }

  _handleFormReset() {
    this.form.strengths = [];
  }

  render() {
    return html`
      <chart-component></chart-component>
      <a id="openFormLink" class="open-button" @click=${this._handleFormOpen}>Add</a>
      <team-strengths-form></team-strengths-form>
      <a id="resetLink" class="reset-button" @click=${this._handleAppReset}>Reset</a>
    `;
  }
}
