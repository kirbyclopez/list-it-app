import axios from 'axios';

export const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const instance = axios.create({
  baseURL: baseUrl,
});
