export const buildShortUrlBody = (url) => (typeof url === 'string' ? JSON.stringify({ url }) : null);
