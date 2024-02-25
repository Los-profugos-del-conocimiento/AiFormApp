import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

// Define a type for the hook options, including method and data
interface UseAxiosOptions<T> extends AxiosRequestConfig {
  url: string;
  method?: 'get' | 'post' | 'delete' | 'patch' | 'put';
  requestData?: T;
}

const useAxios = <T = unknown, R = unknown>({ url, method = 'get', requestData, ...axiosConfig }: UseAxiosOptions<T>) => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    // Construct the request configuration
    const requestConfig: AxiosRequestConfig = {
      url,
      method,
      ...axiosConfig,
      ...(requestData && { data: requestData }),
    };

    axios(requestConfig)
      .then(response => {
        setData(response.data);
        setError(null);
      })
      .catch(error => {
        setError(error.message || 'An error occurred');
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [url, method, requestData]);

  return { data, loading, error };
};

export default useAxios;