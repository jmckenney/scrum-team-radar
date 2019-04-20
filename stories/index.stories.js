import { storiesOf, html, withKnobs, color } from '@open-wc/demoing-storybook';
import { withA11y } from '@storybook/addon-a11y';
import '../src/app-component.js';
import '../src/chart-component.js';

storiesOf('app-component', module)
  .addDecorator(withA11y)
  .addDecorator(withKnobs)
  .add(
    'With css variables set by consumer',
    () => html`
      <style>
        body {
          background-image: url(https://www.reliablepsd.com/wp-content/themes/reliable/images/blog/bg02.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          min-height: 100vh;
          font-family: 'Quattrocento Sans', Sans-Serif;
          font-size: 17px;
          --chart-text-label-color: ${color('Skills Title Color', '#ffffff')};
          --chart-grid-line-color: ${color('Chart Grid Line Color', '#edc795')};
          --chart-circle-background-color: ${color('Chart Circle Background Color', '#d0a0842e')};
          --chart-width: 90vw;
          --chart-label-background-color: rgba(179, 138, 93, 0.75);
          --emoji-slider-bar-color: ${color('Emoji Slider Bar Color', '#e2ae77')};
          --emoji-slider-bar-active-color: ${color('Emoji Slider Bar Active Color', '#1b0f0b')};
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
        }
        h1,
        h2,
        h3,
        h4,
        h5 {
          font-family: 'Ovo', Serif;
          font-size: 42px;
        }
      </style>
      <app-component .header=${'Something else'}></app-component>
    `,
    { options: { selectedPanel: 'storybooks/knobs/panel' } },
  );

storiesOf('chart-component', module)
  .add(
    'With css variables set by consumer',
    () => html`
      <style>
        body {
          background-image: url(https://www.reliablepsd.com/wp-content/themes/reliable/images/blog/bg02.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          min-height: 100vh;
          font-family: 'Quattrocento Sans', Sans-Serif;
          font-size: 17px;
          --chart-text-label-color: #ffffff;
          --chart-polygon-color: #e2ae77;
          --chart-grid-line-color: #edc795;
          --chart-circle-background-color: #d0a0842e;
          --chart-width: 90vw;
          --emoji-slider-bar-color: #e2ae77;
          --emoji-slider-bar-active-color: #1b0f0b;
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
        }
        h1,
        h2,
        h3,
        h4,
        h5 {
          font-family: 'Ovo', Serif;
          font-size: 42px;
        }
      </style>
      <chart-component></chart-component>
    `,
  )
  .add('With initial team members', () => {
    const strengths = ['Testing', 'Java', 'JavaScript', 'HTML & CSS', 'Joke Master', 'Scruming'];
    const members = [
      {
        name: 'JimBob',
        strengths: [55, 76, 99, 99, 2, 20],
        id: '234322',
      },
      {
        name: 'RickyBobby',
        strengths: [89, 67, 56, 45, 34, 49],
        id: '8348457547',
      },
    ];
    return html`
      <chart-component .strengths=${strengths} .members=${members}></chart-component>
    `;
  })
  .add('With initial team members and one member active', () => {
    const strengths = ['Testing', 'Java', 'JavaScript', 'HTML & CSS', 'Joke Master', 'Scruming'];
    const members = [
      {
        name: 'JimBob',
        strengths: [55, 76, 99, 99, 2, 20],
        id: '234322',
      },
      {
        name: 'RickyBobby',
        strengths: [89, 67, 56, 45, 34, 49],
        id: '8348457547',
        active: true,
      },
    ];
    return html`
      <chart-component .strengths=${strengths} .members=${members}></chart-component>
    `;
  });
