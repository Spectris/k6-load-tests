import crypto from "k6/crypto";
import encoding from "k6/encoding";

const algToHash = {
    HS256: "sha256",
};

function sign(data, hashAlg, secret) {
    const hasher = crypto.createHMAC(hashAlg, secret);
    hasher.update(data);
    return hasher.digest("base64rawurl");
}

/**
 *
 * @param {Object} payload
 * @param {string} secret
 * @param {string|undefined} algorithm Default: "HS256"
 * @returns string
 */
export function encode(payload, secret) {
    const algorithm = "HS256";
    const header = encoding.b64encode(JSON.stringify({ typ: "JWT", alg: algorithm }), "rawurl");
    payload = encoding.b64encode(JSON.stringify(payload), "rawurl");
    const sig = sign(header + "." + payload, algToHash[algorithm], secret);
    return [header, payload, sig].join(".");
}

/**
 *
 * @param {string} token
 * @param {string} secret
 * @param {string|undefined} algorithm
 * @returns
 */
export function decode(token, secret, algorithm) {
    const parts = token.split(".");
    const header = JSON.parse(encoding.b64decode(parts[0], "rawurl", "s"));
    const payload = JSON.parse(encoding.b64decode(parts[1], "rawurl", "s"));
    algorithm = algorithm || algToHash[header.alg];
    if (sign(parts[0] + "." + parts[1], algorithm, secret) != parts[2]) {
        throw Error("JWT signature verification failed");
    }
    return payload;
}

//default values- parametrize later
const defaultPayload = {
    lang: "cs-CZ",
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
};

let loadedPayload = {};
try {
    loadedPayload = JSON.parse(open("/data/jwt/payload.json"));
} catch (_) {}

export const tokenPayload = Object.assign({}, defaultPayload, loadedPayload);

export const tokenSecret = open("/run/secrets/token_secret").trim();
if (!tokenSecret) console.warn("no secret loaded!!");

export function getBearerToken() {
    return encode(tokenPayload, tokenSecret);
}
