import request from '@/request';

const baseUrl = '/file-metadata';

export const uploadFile = async (body) => request({
  baseUrl,
  body,
  method: 'POST',
  endpoint: '/',
});
