import { html, LitElement, svg } from "lit-element";

export default class ChartComponent extends LitElement {
  constructor() {
    super();

    // default values can be set from the constructor
    this.members = [
      {
        name: "Bob",
        strengths: [
          { label: "Testing", value: 40 },
          { label: "Java", value: 30 },
          { label: "JavaScript", value: 70 },
          { label: "HTML & CSS", value: 95 },
          { label: "Joke Master", value: 50 },
          { label: "Scruming", value: 65 }
        ]
      },
      {
        name: "JimBob",
        strengths: [
          { label: "Testing", value: 60 },
          { label: "Java", value: 70 },
          { label: "JavaScript", value: 20 },
          { label: "HTML & CSS", value: 65 },
          { label: "Joke Master", value: 55 },
          { label: "Scruming", value: 35 }
        ]
      }
    ];
  }

  _renderGraph() {
    return svg`
      <svg class="scoreviz" viewBox="-300 -300 600 600" width="600">
        <g class="score-dial">
            <circle class="outline" cx="0" cy="0" r="270" stroke="blue" fill="transparent"></circle>
            <circle class="outline" cx="0" cy="0" r="180" stroke="blue" fill="transparent"></circle>
            <circle class="outline" cx="0" cy="0" r="100" stroke="blue" fill="transparent"></circle>
            ${this._renderMemberRadarPolygons()}
        </g>
      </svg>
    `;
  }

  _renderMemberRadarPolygons() {
    return svg`
        ${this.members.map(
            member => svg`
                ${this._renderLineFromCenterToOuterPolygonPoint( member )}
                <polygon fill="green" fill-opacity="0.7" points="${this._getPolygonPoints( member )}"></polygon>
                ${this._renderPolygonLabels( member )}
            `
        )}
    `;
  }

  _renderPolygonLabels(member) {
    return svg`
        ${member.strengths.map((strength, i) => {
            let point = this._valueToPoint( 100, i, member.strengths.length );
            return svg`
                <text dominant-baseline="middle" text-anchor="middle" x="${point.x}" y="${point.y}">${strength.label}</text>
            `;
        })}
    `
  }

  _renderLineFromCenterToOuterPolygonPoint(member) {
    return svg`
        ${member.strengths.map((strength, i) => {
            let point = this._valueToPoint( 100, i, member.strengths.length );
            return svg`
                <line x1="0" y1="0" x2="${point.x}" y2="${point.y}" stroke="black" />
            `;
        })}
    `
  }

  _getPolygonPoints(player) {
    var total = player.strengths.length;
    return player.strengths
      .map((strength, i) => {
        var point = this._valueToPoint(strength.value, i, total);
        return point.x + "," + point.y;
      })
      .join(" ");
  }

  _valueToPoint(value, index, total) {
    var maxV = 100;
    var maxR = 300 * 0.9;
    var r = (maxR / maxV) * value;
    var angle = ((Math.PI * 2) / total) * index + Math.PI / 2;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var tx = r * cos;
    var ty = r * sin;
    return {
      angle: angle,
      radius: r,
      x: tx,
      y: ty
    };
  }

  render() {
    return html`
      <style>
        .chart-size {
          position: relative;
          width: 100vw;
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      </style>
      <div class="chart-size">
        ${this._renderGraph()}
      </div>
    `;
  }
}