import { html, LitElement } from 'lit-element';

export default class ChartComponent extends LitElement {

  firstUpdated() {
    const randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };

    const color = Chart.helpers.color;
    let config = {
        type: 'radar',
        data: {
            labels: ['Unit Testing', 'Scrum', 'Java', 'JavaScript'],
            datasets: [{
                label: 'Josh',
                backgroundColor: color("rgb(255, 99, 132)").alpha(0.2).rgbString(),
                borderColor: "rgb(255, 99, 132)",
                pointBackgroundColor: "rgb(255, 99, 132)",
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            }, {
                label: 'Brian',
                backgroundColor: color("rgb(54, 162, 235)").alpha(0.2).rgbString(),
                borderColor: "rgb(54, 162, 235)",
                pointBackgroundColor: "rgb(54, 162, 235)",
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ]
            }]
        },
        options: {
            legend: {
                position: 'top',
            },
            scale: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    };
    new Chart(this.shadowRoot.querySelector('canvas'), config);
  }

  render() {
    return html`
        <style>
            :host {
            }
            .chart-size{
                position: relative;
                width: 100vw;
                height: 80vh;

                display: flex;
                align-items: center;
                justify-content: center;
            }
            canvas{
                width:400px;
                height:400px;
            }
        </style>
        <div class="chart-size">
            <canvas></canvas>
        </div>
    `;
  }
}
