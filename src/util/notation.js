let notation1 = ["", "K", "M", "B", "T", "q", "Q", "s", "S", "o", "N"];
let notation2 = ["", "D", "T", "q", "Q", "s", "S", "O", "N"];
export default function notation(x) {
  let OOM = Math.floor(Math.log10(Math.max(1, Math.abs(x))));
  let suffixPart = notation1[Math.floor(OOM/3)%10] + notation2[Math.floor(OOM/30)];
  let numberPart = (x/10**(Math.floor(OOM/3)*3)).toFixed(3-suffixPart.length-OOM%3);
  if (x < 1000 && Number.isInteger(x)) numberPart = x;
  return numberPart + suffixPart;
}
