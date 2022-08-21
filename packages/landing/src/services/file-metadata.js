import request from '@/request';

const baseUrl = '/api/file-analyse';

export const uploadFile = async (body) => request({
  baseUrl,
  body,
  method: 'POST',
  endpoint: '/',
});
