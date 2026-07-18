import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://trainee.fidelis.workers.dev',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
    }

})