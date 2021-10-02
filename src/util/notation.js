let notation1 = ["", "K", "M", "B", "T", "q", "Q", "s", "S", "O", "N"];
let notation2 = ["", "U", "D", "T", "q", "Q", "s", "S", "O", "N"];
let notation3 = ["", "D", "V", "T", "q", "Q", "s", "S", "O", "N"];
export default function notation(x, precision=3, focusDecimal=false) {
  let numberPartLength = precision;
  let extra = "";

  let sign = Math.sign(x);
  if (sign === -1) numberPartLength -= 1;
  x = Math.abs(x);
  if (x !== 0 && x < 10**(-precision)) {
    x = x**-1;
    extra += "1/";
    numberPartLength -= 2;
  }

  let OOM = Math.floor(Math.log10(Math.max(1, Math.abs(x))));
  let suffixLevel = Math.floor(OOM/3);
  let suffixPart = (suffixLevel <= 10 ? notation1[suffixLevel] : notation2[suffixLevel%10]) + notation3[Math.floor(suffixLevel/10)];
  numberPartLength -= suffixPart.length;
  let numberPart = (x/10**(suffixLevel*3)).toFixed(Math.max(0, numberPartLength-OOM%3));
  if (!focusDecimal && x < 1000 && Number.isInteger(x)) numberPart = x;
  return extra + numberPart + suffixPart;
}
