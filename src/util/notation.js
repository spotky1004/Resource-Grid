let notation1 = ["", "K", "M", "B", "T", "q", "Q", "s", "S", "O", "N"];
let notation2 = ["", "U", "D", "T", "q", "Q", "s", "S", "O", "N"];
let notation3 = ["", "D", "V", "T", "q", "Q", "s", "S", "O", "N"];
export default function notation(x) {
  let OOM = Math.floor(Math.log10(Math.max(1, Math.abs(x))));
  let suffixLevel = Math.floor(OOM/3);
  let suffixPart = (suffixLevel <= 10 ? notation1[suffixLevel] : notation2[suffixLevel%10]) + notation3[Math.floor(suffixLevel/10)];
  let numberPart = (x/10**(suffixLevel*3)).toFixed(Math.max(0, 3-suffixPart.length-OOM%3));
  if (x < 1000 && Number.isInteger(x)) numberPart = x;
  return numberPart + suffixPart;
}
