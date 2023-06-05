import React, { useEffect, useState } from 'react';

export type HttpMethod = 'GET' | 'POST';

const withApiCall = <P extends object>(
  WrappedComponent: React.ComponentType<P & { data: any; isLoading: boolean; error: string | null }>,
) => {
  const endpoint = 'https://example.com/api/endpoint'; // Specify your constant API endpoint here

  type Props = P & { method: HttpMethod }; // Define a new Props type

  const WithApiCall: React.FC<Props> = (props) => {
    const { method, ...restProps } = props;

    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      const headers = {
        'Content-Type': 'application/json',
        // Add any other constant headers you need
      };

      setIsLoading(true);

      const requestOptions: RequestInit = {
        method,
        headers,
      };

      if (method === 'POST') {
        // Add any required body or payload for POST requests
        // For example: requestOptions.body = JSON.stringify({ key: value });
      }

      fetch(endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    };

    return <WrappedComponent {...restProps as P} data={data} isLoading={isLoading} error={error} />;
  };

  return WithApiCall;
};

export default withApiCall;
