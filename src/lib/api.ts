import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-portal.uryonym.com/api/v1',
})
