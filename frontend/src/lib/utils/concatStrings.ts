export default function concatStrings(
  values: (string | null | undefined)[],
  separator: string = " "
): string {
  return values.filter((s): s is string => s != null).join(separator);
}
