import request from '@/request';

const baseUrl = '/exercise-tracker/api/users';

export const createUser = async (username) => {
  const body = JSON.stringify({ username });

  return request({
    baseUrl,
    body,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    endpoint: '/',
  });
};

export const addExercise = async (userId, exerciseLog) => {
  const body = JSON.stringify(exerciseLog);

  return request({
    baseUrl,
    body,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    endpoint: `/api/users/${userId}/exercises`,
  });
};
