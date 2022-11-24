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

const words = [
  // From original post + plurals
  'alien',
  'aliens',
  'baseball',
  'baseballs',
  'bean',
  'beans',
  'bees',
  'lesbian',
  'lesbians',
  'lilnas',
  'nananana',
  'snail',
  'lesbians',

  // Pride
  'enbies',
  'bi',

  // Food
  'ananas',
  'anise',
  'basil',
  'blini',
  'naan',

  // Animals
  'baleen',
  'banana',
  'bananas',
  'eel',
  'eels',
  'seal',
  'seals',

  // Math
  'abelian',
  'sine',

  // Music
  'abba',
  'bassline',
  'basslines',

  // Other
  'aisle',
  'aisles',
  'alias',
  'aliases',
  'alibi',
  'alibis',
  'ansible',
  'bale',
  'bales',
  'balsa',
  'bell',
  'belle',
  'belles',
  'bells',
  'biennial',
  'ease',
  'easel',
  'easels',
  'eases',
  'enable',
  'enables',
  'lens',
  'lenses',
  'libel',
  'linen',
  'linens',
  'nail',
  'nails',
  'nasal',
  'nine',
  'nines',
  'sane',
  'sea',
  'seas',
  'sensei',
  'senseis',
  'sensible',
  'sienna',
];

const inputEl = $('input');

function main() {
  useRandomWord();

  inputEl.addEventListener('keydown', handleInputChange);
  inputEl.addEventListener('paste', handleInputChange);
  inputEl.addEventListener('input', handleInputChange);
}

function handleInputChange() {
  setTimeout(() => {
    const word = inputEl.value;
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
