'use strict';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const topColor = [328, 100, 41];
const middleColor = [301, 37, 43];
const bottomColor = [221, 100, 31];

const inputEl = $('input');

let lastWord = '';

function sandbox() {
  $$('#bi-flag div')[0].style.background = toColorString(topColor);
  $$('#bi-flag div')[2].style.background = toColorString(bottomColor);

  const x = 0.5;

  // const h = makeLinearInterpolator(topColor[0], bottomColor[0])(x);
  // const s = makeLinearInterpolator(topColor[1], bottomColor[1])(x);
  // const l = makeLinearInterpolator(topColor[2], bottomColor[2])(x);

  const h = makeQuadraticInterpolator(topColor[0], middleColor[0], bottomColor[0])(x);
  const s = makeQuadraticInterpolator(topColor[1], middleColor[1], bottomColor[1])(x);
  const l = makeQuadraticInterpolator(topColor[2], middleColor[2], bottomColor[2])(x);

  $$('#bi-flag div')[1].style.backgroundColor = toColorString([h, s, l]);

  for (let i = 0; i <= 14; i++) {
    const x = i / 14;

    const h = makeQuadraticInterpolator(topColor[0], middleColor[0], bottomColor[0])(x);
    const s = makeQuadraticInterpolator(topColor[1], middleColor[1], bottomColor[1])(x);
    const l = makeQuadraticInterpolator(topColor[2], middleColor[2], bottomColor[2])(x);

    $$('#swatches div')[i].style.backgroundColor = toColorString([h, s, l]);
  }
}

function toColorString(hsl) {
  const [h, s, l] = hsl;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function makeLinearInterpolator(t, b) {
  return x => (
    (t * (1-x)) +
    (b * x)
  );
}

function makeQuadraticInterpolator(y_1, y_2, y_3) {
  const x_1 = 0;
  const x_2 = 0.5;
  const x_3 = 1;

  // https://stackoverflow.com/a/16896810/1945088
  const a = y_1/((x_1-x_2)*(x_1-x_3)) + y_2/((x_2-x_1)*(x_2-x_3)) + y_3/((x_3-x_1)*(x_3-x_2))

  const b = -y_1*(x_2+x_3)/((x_1-x_2)*(x_1-x_3))
            -y_2*(x_1+x_3)/((x_2-x_1)*(x_2-x_3))
            -y_3*(x_1+x_2)/((x_3-x_1)*(x_3-x_2))

  const c = y_1*x_2*x_3/((x_1-x_2)*(x_1-x_3))
          + y_2*x_1*x_3/((x_2-x_1)*(x_2-x_3))
          + y_3*x_1*x_2/((x_3-x_1)*(x_3-x_2))

  return x => (
    a * x * x +
    b * x +
    c
  );
}

function main() {
  sandbox();
  return;

  // let word = getWordParam();
  // if (word) {
  //   renderFlag(toIndices(word));
  //   inputEl.placeholder = word;
  // } else {
  //   useRandomWord();
  // }
  //
  // inputEl.addEventListener('keydown', handleInputChange);
  // inputEl.addEventListener('paste', handleInputChange);
  // inputEl.addEventListener('input', handleInputChange);
}

function handleInputChange() {
  setTimeout(() => {
    const word = inputEl.value;

    if (word === lastWord) {
      return;
    }

    lastWord = word;

    const indices = toIndices(word);

    if (indices.length) {
      renderFlag(indices);
    } else if (word === '') {
      useRandomWord();
    }
  }, 0);
}

function renderFlag(indices) {
  let html = '';
  for (let index of indices) {
    html += `<div style="background: ${colors[index]}"></div>`;
  }
  $('#flag').innerHTML = html;
}

function toIndices(word) {
  return (
    Array.from(word.toLowerCase())
      .map(letter => Array.from('trans').indexOf(letter))
      .filter(index => index !== -1)
  );
}

function getWordParam() {
  if (!window.location.hash) {
    return undefined;
  }

  const paramsString = window.location.hash.replace('#', '');
  const params = new URLSearchParams(paramsString);
  return params.get('w');
}

function useRandomWord() {
  const randomWord = words[Math.floor(words.length * Math.random())];
  inputEl.placeholder = randomWord;
  renderFlag(toIndices(randomWord));
}

main();
