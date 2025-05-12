function buildUrlFromJson(data) {
    const { protocol, domain, endpoint, params = {}, query = {} } = data;

    const pathParams = Object.values(params)
        .map((val) => encodeURIComponent(val))
        .join("/");

    const queryString = Object.entries(query)
        .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        .join("&");

    return `${protocol}://${domain}/${endpoint}/${pathParams}${
        queryString ? "?" + queryString : ""
    }`;
}

export function getUrl() {
    let loadedUrl = {};
    try {
        loadedUrl = JSON.parse(open("/data/k6/endpoint.json"));
    } catch (_) {
        return "";
    }
    return buildUrlFromJson(loadedUrl);
}
