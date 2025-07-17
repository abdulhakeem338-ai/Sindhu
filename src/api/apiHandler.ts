// apiHandler.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { store } from '../redux/store';
import { API, SCREENS } from '../constants/constants';
import { NavigationService } from '../utils/NavigationService';
import { useCallback, useEffect, useState } from 'react';
import { setLogout } from '../redux/app/appAction';
import { showAlert } from '../redux/handler/handlerAction';

type CacheConfig = {
    enabled: boolean;
    ttl?: number; // Time to live in seconds
};

type RequestConfig = AxiosRequestConfig & {
    cache?: CacheConfig;
    retries?: number;
};

class ApiHandler {
    private client: AxiosInstance;
    private cache: Map<string, { data: any; timestamp: number }> = new Map();
    private requestMap: Map<string, Promise<any>> = new Map();

    constructor(baseURL: string) {
        this.client = axios.create({
            baseURL,
            timeout: API.TIMEOUT,
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(
            async (config) => {
                const token = store?.getState()?.appState?.token;
                console.log({ token })
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                if (config.data instanceof FormData) {
                    config.headers['Content-Type'] = 'multipart/form-data';
                } else {
                    config.headers['Content-Type'] = 'application/json';
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            (error: AxiosError) => {
                const errorData = {
                    message: error.message,
                    code: error.response?.status,
                    data: error.response?.data,
                };

                // Handle token expiration
                if (error.response?.status === 401 || error.response?.status === 403) {
                    console.log("UNATHORIZED: Navigation to Login..!")
                    this.handleUnauthorizedError();
                }

                return Promise.reject(errorData);
            }
        );
    }

    private handleUnauthorizedError() {
        // Dispatch logout action
        store.dispatch(setLogout());

        store.dispatch(showAlert({
            title: 'Session Expired',
            message: 'Session expired. Please log in again.',
            autoClose: true,
            duration: 2000
        }));

        // Clear any cached data
        this.cache.clear();

        console.log("Navigating to login page");
        // Navigate to login screen
        NavigationService.reset(0, [{ name: SCREENS.LOGIN }]);

        // Optionally show a notification to the user
        console.log('Session expired. Please log in again.');
    }



    private generateCacheKey(config: AxiosRequestConfig): string {
        return `${config.url}_${JSON.stringify(config.params)}`;
    }

    private async handleCache<T>(key: string, config: CacheConfig, fetchFn: () => Promise<T>): Promise<T> {
        if (config.enabled) {
            const cachedData = this.cache.get(key);
            if (cachedData && Date.now() - cachedData.timestamp < (config.ttl || 60) * 1000) {
                return cachedData.data;
            }
        }

        const data = await fetchFn();
        if (config.enabled) {
            this.cache.set(key, { data, timestamp: Date.now() });
        }
        return data;
    }

    async request<T = any>(config: RequestConfig): Promise<T> {
        const cacheKey = this.generateCacheKey(config);
        const { cache = { enabled: false }, retries = 0, ...axiosConfig } = config;

        // Deduplicate simultaneous requests
        if (this.requestMap.has(cacheKey)) {
            return this.requestMap.get(cacheKey);
        }

        const requestPromise: any = this.handleCache(cacheKey, cache, async () => {
            try {
                const response = await this.client.request<T>(axiosConfig);
                return response.data;
            } catch (error) {
                if (retries > 0) {
                    return this.retryRequest(axiosConfig, retries);
                }
                throw error;
            } finally {
                this.requestMap.delete(cacheKey);
            }
        });

        this.requestMap.set(cacheKey, requestPromise);
        return requestPromise;
    }

    private async retryRequest<T>(config: AxiosRequestConfig, retriesLeft: number): Promise<T> {
        await new Promise((resolve) => setTimeout(resolve, API.TIMEOUT));
        try {
            const response = await this.client.request<T>(config);
            return response.data;
        } catch (error) {
            if (retriesLeft === 1) throw error;
            return this.retryRequest(config, retriesLeft - 1);
        }
    }

    // Basic CRUD operations
    get<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'GET', url, data });
    }

    post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'POST', url, data, });
    }

    put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'PUT', url, data });
    }

    delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.request<T>({ ...config, method: 'DELETE', url });
    }
}

// Initialize with your base URL
export const api = new ApiHandler(API.BASE_URL);

// Custom hook for API calls
export const useApi = () => {
    const callApi = async <T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> => {
        try {
            return await api.request<T>({ method, url, data, ...config });
        } catch (error) {
            // Handle global error reporting here
            console.error('API Error:', error);
            throw error;
        }
    };

    return { callApi };
};

// Utility hook for handling API data fetching
export const useApiHandler = <T>(url: string, config?: RequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const { callApi } = useApi();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const result = await callApi<T>('GET', url, undefined, config);
            setData(result);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url, config, callApi]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refresh = () => {
        fetchData();
    };

    return { data, loading, error, refresh };
};