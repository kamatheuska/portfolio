import request from '@/request';

const baseUrl = '/api/fileanalyse';

export const uploadFile = async (body) => request({
  baseUrl,
  body,
  method: 'POST',
  endpoint: '/',
});
