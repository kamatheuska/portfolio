// prettier-ignore
/**
 * REST function encapsulating api requests
 *
 * @param {Object} options
 * @param {String} options.baseUrl
 * @param {any} options.body
 * @param {String} options.endpoint
 * @param {String} options.method - HTTP method, e.g GET, POST, PUT
 * @param {Object} options.headers
 * @param {Function | null} options.mapper - maps backend response to a certain signature
 */
const request = async ({
  baseUrl = '/api',
  body, // empty body is ignored by fetch
  endpoint = '',
  method = 'GET',
  headers = {},
  mapper = null,
} = {}) => {
  try {
    const fullUrl = `${baseUrl}${endpoint}`;
    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
    });

    const responseBody = await response.json();

    return mapper ? mapper(responseBody) : responseBody;
  } catch (error) {
    console.error(`[request]: Error on ${method} ${endpoint}`);

    throw error;
  }
};

export default request;
