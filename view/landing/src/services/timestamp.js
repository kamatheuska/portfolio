import request from '@/request';

const baseUrl = '/api/timestamp/';

export const generateTimestamp = async () => {
    return request({ baseUrl });
};

export const getTimestampByDate = async (date) => {
    return request({
        baseUrl,
        url: `${date}`,
    });
};
