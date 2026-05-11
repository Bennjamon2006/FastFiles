import { existsSync } from "fs";
import { join } from "path";

const WEB_ROOT = join(__dirname, "..", "..", "..", "web");

const WEB_DIST = join(WEB_ROOT, "dist");
const WEB_INDEX = join(WEB_DIST, "index.html");

const existsWebDist = existsSync(WEB_DIST);

console.log({ WEB_DIST, WEB_INDEX, existsWebDist });

const webConfig = {
  exists: existsWebDist,
  dist: WEB_DIST,
  index: WEB_INDEX,
};

export default webConfig;
