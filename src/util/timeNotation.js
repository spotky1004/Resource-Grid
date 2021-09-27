export default function timeNotation(x) {
  let minute = Math.floor(x/60_000);
  let seconds = Math.floor((x%60_000)/1000);

  return (minute+"").padStart(2, "0") + ":" + (seconds+"").padStart(2, "0")
}
