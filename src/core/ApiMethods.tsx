interface ApiError {
    message: string;
}

type ApiResponse<Data> = Data | ApiError;

export function callApi<Data>(method: string, endPoint: string, body = "" as any): Promise<ApiResponse<Data>> {
    const requestOptions: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_BEARER}`, // Add the Bearer token to the Authorization header
        },
        body: JSON.stringify(body),
    };

    return fetch(`${process.env.REACT_APP_END_POINT}${endPoint}`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return response.json() as Promise<Data>;
        })
        .catch((error) => {
            return { message: error.message } as ApiError;
        });
}
