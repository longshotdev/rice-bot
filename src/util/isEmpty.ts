/**
 * Checks if an object is empty or not
 * @param obj Object to check for Emptyness
 * @returns {boolean}
 */
export default function (obj: Object): boolean {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
