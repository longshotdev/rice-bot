/**
 * I'll be organizing this by category and will refer to them as modules and commands by commands.
 */

/**
 * Fun Module
 */
import test from "./Fun/test";

/**
 * Moderation Module
 */

import kick from "./Moderation/kick";

/**
 * System Module
 */
import help from "./System/help";
import info from "./System/info";

/**
 * Music Module
 */
// import play from "./Music/play";

/**
 * Econ Module
 */
import top from "./Economy/top";
export default {
  fun: {
    test,
  },
  moderation: {
    kick,
  },
  system: {
    help,
    info,
  },
  music: {},
  economy: {
    top,
  },
};
