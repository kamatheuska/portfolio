// prettier-ignore
const request = async ({
    baseUrl = '',
    body, // empty body is ignored by fetch
    url = '/api',
    method = 'GET',
    headers = {},
} = {}) => {
    try {
        const fullUrl = `${baseUrl}${url}`;
        const response = await fetch(fullUrl, {
            method,
            headers,
            body,
        });

        return await response.json();
    } catch (error) {
        console.error(`[request]: Error on ${method} ${url}`);

        throw error;
    }
};

export default request;
