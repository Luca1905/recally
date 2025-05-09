/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import {fileURLToPath} from "node:url";
import createJiti from "jiti";
import "./src/env.js";

const jiti= createJiti(fileURLToPath(import.meta.url));
 
jiti("./src/env");

/** @type {import("next").NextConfig} */
const config = {};

export default config;
