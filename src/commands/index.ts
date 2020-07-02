/**
 * I'll be organizing this by category and will refer to them as modules and commands by commands.
 */

/**
 * Fun Module
 */
import test from "./Fun/okay";

/**
 * Moderation Module
 */

import kick from "./Moderation/kick";

/**
 * System Module
 */
import help from "./System/help";
import info from "./System/info";
import config from "./System/config";
import disable from "./System/disable";
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
    config,
    disable,
  },
  music: {},
  economy: {
    top,
  },
};
