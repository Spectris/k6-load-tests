import http from "k6/http";
import { check, sleep } from "k6";
import { k6Options } from "../config/options.js";

export const options = k6Options;

const url ="<insert your url here>" //todo replace with config

export default function () {
    const res = http.get(url, options);
    check(res, { "status was 200-300": (r) => r.status >= 200 && r.status < 400 });
    sleep(1);
}

export function handleSummary(data) {
    return {};
}
