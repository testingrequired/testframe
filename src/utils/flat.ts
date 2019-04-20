/**
 * Flatten array
 *
 * Based on: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#Polyfill
 *
 * @param arrayToFlatten Target array
 * @param depth Depth to flatten
 */
export default function flat<T>(arrayToFlatten: Array<T>, depth: number = 2) {
  depth = depth === undefined ? 1 : Math.floor(depth);

  if (depth < 1) return Array.prototype.slice.call(arrayToFlatten);

  return (function flat(arr, depth) {
    const len = arr.length >>> 0;
    let flattened = [];
    let i = 0;

    while (i < len) {
      if (i in arr) {
        const el = arr[i];
        if (Array.isArray(el) && depth > 0)
          flattened = flattened.concat(flat(el, depth - 1));
        else flattened.push(el);
      }
      i++;
    }
    return flattened;
  })(arrayToFlatten, depth);
}
