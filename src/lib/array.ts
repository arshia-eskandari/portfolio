export function removeItem<T>(
  arr: T[],
  item: T,
): { result: T[]; index: number } {
  const index = arr.indexOf(item);

  if (index === -1) {
    return {result: arr, index};
  }

  return { result: [...arr.slice(0, index), ...arr.slice(index + 1)], index };
}
