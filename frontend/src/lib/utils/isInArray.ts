export default function isInArray<T>(arr: T[], value: T): boolean {
  return arr.indexOf(value) !== -1;
}
