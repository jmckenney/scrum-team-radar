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
        align-items: center;
        justify-content: center;
      }

      polygon {
        transition: all 0.6s ease-in-out;
      }

      polygon:hover {
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
        <g>
            <circle cx="0" cy="0" r="270" stroke="var(--chart-grid-line-color)" fill="var(--chart-circle-background-color)"></circle>
            <circle cx="0" cy="0" r="180" stroke="var(--chart-grid-line-color)" fill="transparent"></circle>
            <circle cx="0" cy="0" r="100" stroke="var(--chart-grid-line-color)" fill="transparent"></circle>
            ${this._renderPolygonLabels()}
            ${this._renderLineFromCenterToOuterPolygonPoint()}
            ${this._renderMemberRadarPolygons()}
        </g>
      </svg>
    `;
  }

  _renderMemberRadarPolygons() {
    return svg`
        ${this.members.map(
          member => svg`
                <polygon fill="var(--chart-polygon-color)" fill-opacity="0.5" points="${ChartComponent._getPolygonPoints(
                  member,
                )}"></polygon>
            `,
        )}
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
                <line x1="0" y1="0" x2="${point.x}" y2="${
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
        ${this._renderGraph()}
      </div>
    `;
  }
}
