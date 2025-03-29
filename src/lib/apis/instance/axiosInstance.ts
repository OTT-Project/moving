import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  params: {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: 'ko-KR',
  },
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  },
});
