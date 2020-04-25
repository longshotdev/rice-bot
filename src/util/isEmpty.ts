/*
 * File: isEmpty.ts
 * Project: ricebot
 * File Created: Tuesday, 21st April 2020 8:37:31 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Tuesday, 21st April 2020 8:37:31 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

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
