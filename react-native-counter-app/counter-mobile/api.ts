import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://7yu833keeh.execute-api.us-east-1.amazonaws.com/dev',
  headers: {
    Accept: 'application/json',
  },
});

export const getCount = async (userId: string) => instance.get(`${userId}/count`).then(response => response.data);
export const patchCount = async ({userId, count}: { userId: string, count: number}) => instance.patch(`${userId}/count`, {
    increment: count
  });
