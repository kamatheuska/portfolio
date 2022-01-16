import request from '@/request';

const baseUrl = '/api/whoami';

export const getWhoami = async () => {
    return request({ baseUrl });
};
