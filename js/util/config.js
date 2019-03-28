import { env } from "process";

const CASTS = {
    int: v => typeof v === "number" ? v : parseInt(v),
    float: v => typeof v === "number" ? v : parseFloat(v),
    bool: v => typeof v === "boolean" ? v : ["1", "true", "True"].includes(v),
    list: v => Array.isArray(v) ? v : v.split(";"),
    tuple: v => Array.isArray(v) ? v : v.split(";")
};

const CONFIGS = {};

export const conf = function(name, fallback = null, cast = null, ctx = null) {
    const configs = ctx ? ctx.configs : CONFIGS;
    cast = _castR(cast);
    let value = configs[name] === undefined ? fallback : configs[name];
    if (cast && value !== null) value = cast(value);
    return value;
};

export const confS = function(name, value, ctx = null) {
    const configs = ctx ? ctx.configs : CONFIGS;
    configs[name] = value;
};

export const load = function(ctx = null) {
    console.info("vai carregar");
    loadEnv(ctx);
};

export const loadEnv = function(ctx = null) {
    const configs = ctx ? ctx.configs : CONFIGS;
    if (env === undefined || env === null) return;
    Object.entries(env).forEach(
        function([key, value]) {
            configs[key] = value;
        }
    );
};

const _castR = function(cast) {
    return CASTS[cast] === undefined ? cast : CASTS[cast];
};

export default conf;