import createRequest from '@/request';
import { buildShortUrlBody } from '@/utils/urlShortener';

const baseUrl = '/api/shorturl/';
const request = createRequest(baseUrl);

export const createShortUrl = async (url, { requestFn = request } = {}) => {
    const body = buildShortUrlBody(url);
    return requestFn({
        url: 'new',
        method: 'POST',
        body,
    });
};
