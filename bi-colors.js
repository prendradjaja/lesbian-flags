const colors = generateBiColors();

function generateBiColors() {
  const topColor = [328, 100, 41];
  const middleColor = [301, 37, 43];
  const bottomColor = [221, 100, 31];

  const result = [];

  for (let i = 0; i <= 14; i++) {
    const x = i / 14;

    const h = makeQuadraticInterpolator(topColor[0], middleColor[0], bottomColor[0])(x);
    const s = makeQuadraticInterpolator(topColor[1], middleColor[1], bottomColor[1])(x);
    const l = makeQuadraticInterpolator(topColor[2], middleColor[2], bottomColor[2])(x);

    result.push(toColorString([h, s, l]));
  }
  return result;
}

function toColorString(hsl) {
  const [h, s, l] = hsl;
  return `hsl(${h}, ${s}%, ${l}%)`;
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
