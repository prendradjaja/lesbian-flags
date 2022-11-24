'use strict';

const $ = s => document.querySelector(s);

const colors = [
  '#d52d00',
  '#ef7627',
  '#ff9a56',
  '#fff',
  '#d162a4',
  '#b55690',
  '#a30262',
];

const inputEl = $('input');

let lastWord = '';

function main() {
  useRandomWord();

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
      .map(letter => Array.from('lesbian').indexOf(letter))
      .filter(index => index !== -1)
  );
}

function useRandomWord() {
  const randomWord = words[Math.floor(words.length * Math.random())];
  inputEl.placeholder = randomWord;
  renderFlag(toIndices(randomWord));
}

main();
