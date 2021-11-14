import request from '@/request';
import { buildShortUrlBody } from '@/utils/urlShortener';

const baseUrl = '/api/shorturl/';

export const createShortUrl = async (url) => {
    const body = buildShortUrlBody(url);
    return request({
        baseUrl,
        body,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        url: 'new',
    });
};
