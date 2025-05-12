import { getBearerToken } from "./auth.js";

const defaultOptions = {
    hosts: { localhost: "localhost:8116" },
    stages: [
        { duration: "1m", target: 10 },
        { duration: "1m", target: 0 },
    ],
    userAgent: "K6UserAgent/1.0",
    headers: {
        Authorization: `Bearer ${getBearerToken()}`,
    },
};

export let loadedOptions = {};

try {
    //data = mounted directory with json configs
    loadedOptions = JSON.parse(open("/data/k6/options.json"));
} catch (_) {}

export const k6Options = Object.assign({}, defaultOptions, loadedOptions);
