/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} numberToClamp The number being clamped
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
function clamp(numberToClamp: number, min: number, max: number): number {
  return Math.min(Math.max(numberToClamp, min), max);
}
export default clamp;
// this is a test
