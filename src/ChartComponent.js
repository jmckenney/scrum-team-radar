import { html, LitElement, svg, css } from 'lit-element';

export default class ChartComponent extends LitElement {
  static get properties() {
    return {
      members: { type: Array },
      strengths: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-size: 22px;
        display: flex;
        justify-content: center;
      }

      svg {
        width: var(--chart-width);
        height: 90%;
        max-height: 90vh;
      }

      .chart-size {
        position: relative;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      @media only screen and (min-width: 900px) {
        .chart-size {
          flex-direction: row;
        }
      }

      polygon {
        transition: all 0.6s ease-in-out;
      }

      polygon:hover {
        transform: scale(1.1);
      }

      ul {
        text-align: center;
        margin: 0;
        padding: 0;
      }

      @media only screen and (min-width: 900px) {
        ul {
          text-align: right;
          display: flex;
          flex-direction: column;
        }
      }

      li {
        list-style-type: none;
        color: white;
        display: inline-block;
        background-color: #d0a0842e;
        border-radius: 4px;
        padding: 2px 8px;
        margin: 6px 4px;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 -2px 1px rgba(255, 255, 255, 0.08);
        transform: scale(1);
        transition: all 0.3s ease-in;
      }

      li:hover,
      li.active {
        background-color: white;
        color: #1b0f0b;
        cursor: pointer;
      }

      li:hover {
        transform: scale(1.1);
      }
    `;
  }

  constructor() {
    super();
    this.members = [];
    this.strengths = [];
  }

  _renderGraph() {
    return svg`
      <svg viewBox="-300 -300 600 600" width="600">
        <radialGradient id="headerShape">
          <stop offset="0%" stop-color="#e2ae77" />
          <stop offset="100%" stop-color="rgba(226, 174, 119, 0.36)" />
        </radialGradient>
        <filter id="f3" x="0" y="0" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
        <g>
            <circle stroke-width=".3" cx="0" cy="0" r="270" stroke="var(--chart-grid-line-color)" fill="var(--chart-circle-background-color)"></circle>
            <circle stroke-width=".3" cx="0" cy="0" r="180" stroke="var(--chart-grid-line-color)" fill="transparent"></circle>
            <circle stroke-width=".3" cx="0" cy="0" r="100" stroke="var(--chart-grid-line-color)" fill="transparent"></circle>
            ${this._renderPolygonLabels()}
            ${this._renderLineFromCenterToOuterPolygonPoint()}
            ${this._renderMemberRadarPolygons()}
        </g>
      </svg>
    `;
  }

  _renderMemberNames() {
    return html`
      <ul>
        ${this.members.map(
          member => html`
            <li
              data-member-id="${member.id}"
              class="${member.active ? 'active' : ''}"
              @click=${this._handleNameClick}
            >
              ${member.name}
            </li>
          `,
        )}
      </ul>
    `;
  }

  _handleNameClick(e) {
    const memberId = e.target.getAttribute('data-member-id');
    this.members = this.members.map(member => {
      const thisMember = member.id === memberId;
      return { ...member, active: thisMember };
    });
  }

  _renderMemberRadarPolygons() {
    return svg`
        ${this.members.map(member => {
          const opacity = member.active ? 1 : 0.5;
          return svg`
                <polygon fill="url(#headerShape)" fill-opacity="${opacity}" filter="url(#f3)" 
                  points="${ChartComponent._getPolygonPoints(member)}" id="${member.id}">
                </polygon>
            `;
        })}
    `;
  }

  _renderPolygonLabels() {
    return svg`
        ${this.strengths.map((strength, i) => {
          const point = ChartComponent._valueToPoint(100, i, this.strengths.length);
          return svg`
                <text fill="var(--chart-text-label-color)" dominant-baseline="middle" text-anchor="middle" x="${
                  point.x
                }" y="${point.y}">${strength}</text>
            `;
        })}
    `;
  }

  _renderLineFromCenterToOuterPolygonPoint() {
    return svg`
        ${this.strengths.map((strength, i) => {
          const point = ChartComponent._valueToPoint(100, i, this.strengths.length);
          return svg`
                <line stroke-width=".5" x1="0" y1="0" x2="${point.x}" y2="${
            point.y
          }" stroke="var(--chart-grid-line-color)" />
            `;
        })}
    `;
  }

  static _getPolygonPoints(member) {
    const totalStrengths = member.strengths.length;
    return member.strengths
      .map((strength, i) => {
        const point = ChartComponent._valueToPoint(strength, i, totalStrengths);
        return `${point.x} , ${point.y}`;
      })
      .join(' ');
  }

  static _valueToPoint(value, index, total) {
    const maxV = 100;
    const maxR = 300 * 0.9;
    const r = (maxR / maxV) * value;
    const angle = ((Math.PI * 2) / total) * index + Math.PI / 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tx = r * cos;
    const ty = r * sin;
    return {
      angle,
      radius: r,
      x: tx,
      y: ty,
    };
  }

  render() {
    return html`
      <div class="chart-size">
        ${this._renderMemberNames()} ${this._renderGraph()}
      </div>
    `;
  }
}
