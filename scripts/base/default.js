import http from "k6/http";
import { check, sleep } from "k6";
import { k6Options } from "../config/options.js";
import { getUrl } from "../config/urls.js";

export const options = k6Options;

const url = getUrl();

export default function () {
    const res = http.get(url, options);
    check(res, { "status was 200-300": (r) => r.status >= 200 && r.status < 400 });
    sleep(1);
}

export function handleSummary(data) {
    return {};
}
