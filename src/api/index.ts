import axios from 'axios';

import { Clusters, Currency } from '../models/tinkoff';

declare module 'axios' {
  export interface AxiosRequestConfig {
    requestType?: string;
  }
}

const baseUrl = 'https://api.tinkoff.ru';

const tinkoffService = axios.create({
  baseURL: baseUrl,
});

// Headers
tinkoffService.interceptors.request.use(async (axiosConfig) => {
  if (axiosConfig.headers) {
    axiosConfig.headers['Content-Type'] = 'application/json';
  }

  return axiosConfig;
});

export const tinkoffAPI = {
  async getClusters(currency: string) {
    try {
      const response = await tinkoffService.post<Clusters>(
        '/geo/withdraw/clusters',
        {
          bounds: {
            bottomLeft: {
              lat: 59.73313077939723,
              lng: 29.7382735314204,
            },
            topRight: {
              lat: 60.13527569766657,
              lng: 30.797065766450654,
            },
          },
          filters: {
            currencies: [currency],
            showUnavailable: true,
          },
          zoom: 8,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
