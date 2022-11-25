'use strict';

const $ = s => document.querySelector(s);

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
  for (let [i, index] of indices.entries()) {
    const isEdge = i === 0 || i === indices.length - 1;
    html += `
      <div
        style="background: ${colors[index]}"
        class="${isEdge ? 'double' : ''}"
      ></div>
    `;
  }
  $('#flag').innerHTML = html;
}

function toIndices(word) {
  const indices = (
    Array.from(word.toLowerCase())
      .map(letter => Array.from('bcdefghi').indexOf(letter))
      .filter(index => index !== -1)
      .map(index => index * 2)
  );

  if (indices.length === 2) {
    return [
      indices[0],
      (indices[0] + indices[1]) / 2,
      indices[1],
    ];
  }

  return indices;
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
