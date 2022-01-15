import request from '@/request';
import { buildShortUrlBody } from '@/utils/urlShortener';

const baseUrl = '/api/shorturl';

// eslint-disable-next-line camelcase
export const urlMapper = (responseBody) => ({
    ...responseBody,
    shortUrl: responseBody.short_url,
    originalUrl: responseBody.original_url,
});

export const createShortUrl = async (url) => {
    const body = buildShortUrlBody(url);
    return request({
        baseUrl,
        body,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        endpoint: '/',
        mapper: urlMapper,
    });
};
