import React, { ComponentType, useState } from 'react';

interface ApiConfig {
    baseUrl: string;
    headers?: { [key: string]: string };
}

type HttpMethod = 'GET' | 'POST';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

function withApi<T>(WrappedComponent: ComponentType<T>, apiConfig: ApiConfig) {
    return function ApiWrapper(props: T) {
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<Error | null>(null);
        const [data, setData] = useState<T | null>(null);

        const makeApiCall = async (method: HttpMethod, endpoint: string, body?: any) => {
            setLoading(true);
            try {
                const requestOptions: RequestInit = {
                    method,
                    headers: {
                        ...apiConfig.headers,
                        'Content-Type': 'application/json',
                    },
                    body: body ? JSON.stringify(body) : undefined,
                };

                const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, requestOptions);
                const responseData: T = await response.json();
                setData(responseData);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
                setLoading(false);
            }
        };

        const get = async (endpoint: string) => {
            await makeApiCall('GET', endpoint);
        };

        const post = async (endpoint: string, body?: any) => {
            await makeApiCall('POST', endpoint, body);
        };

        return (
            <WrappedComponent
                {...props}
                api={{
                    get,
                    post,
                    loading,
                    error,
                    data,
                }}
            />
        );
    };
}

export default withApi;
