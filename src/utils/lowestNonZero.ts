export default function lowestNonZero(numbers: Array<number>) {
  return Math.min(...numbers.filter(x => x > 0));
}
