export function request({ url, method = 'GET', headers, body }) {
    return async (baseUrl) => {
        try {
            const fullUrl = `${baseUrl}${url}`;
            return await fetch(fullUrl, {
                method,
                headers: {
                    ...headers,
                },
                body,
            });
        } catch (error) {
            console.error(`[request]: Error on ${method} ${url}`);

            throw error;
        }
    };
}

export default function createRequest(baseUrl, { requestFn = request } = {}) {
    return requestFn(baseUrl);
}
