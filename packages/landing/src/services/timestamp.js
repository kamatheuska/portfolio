import request from '@/request';

const baseUrl = '/api/timestamp';

export const generateTimestamp = async () => request({ baseUrl });

export const getTimestampByDate = async (date) => request({
  baseUrl,
  endpoint: `/${date}`,
});
