const fs = require("fs");
const orig = fs.readlinkSync;
fs.readlinkSync = function(path, options) {
  try {
    return orig.call(fs, path, options);
  } catch (err) {
    if (err && (err.code === "EISDIR" || err.code === "EINVAL" || err.code === "UNKNOWN")) {
      return path;
    }
    throw err;
  }
};
