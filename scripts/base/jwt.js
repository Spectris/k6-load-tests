import { getBearerToken } from "../config/auth.js";

export default function () {
    let bToken = getBearerToken();
    console.log(console.log(`🔑 Encoded JWT: ${bToken}`));
}
