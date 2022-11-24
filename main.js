'use strict';

const $ = s => document.querySelector(s);

const colors = [
  '#5BCEFA',
  '#F5A9B8',
  'white',
  '#F5A9B8',
  '#5BCEFA',
];

const inputEl = $('input');

let lastWord = '';

function main() {
  let word = getWordParam();
  if (word) {
    renderFlag(toIndices(word));
    inputEl.placeholder = word;
  } else {
    useRandomWord();
  }

  inputEl.addEventListener('keydown', handleInputChange);
  inputEl.addEventListener('paste', handleInputChange);
  inputEl.addEventListener('input', handleInputChange);
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
