interface ApiError {
    message: string;
}

type ApiResponse<Data> = Data | ApiError;

/**
 * Make this method for call api
 * @param method In This You Can Pass Method Like (GET,POST,etc)
 * @param endPoint For Adding End Point
 * @param body Passing Payload
 * @returns Promise
 */

export function callApi<Data>(method: string, endPoint: string, body = "" as any): Promise<ApiResponse<Data>> {
    const urlParams = window.location.pathname;
    const user_id = urlParams.split("/")[2]
    let token: any = process.env.REACT_APP_BEARER
    if (sessionStorage.getItem(`${user_id}_auth_token`) !== null) {
        token = sessionStorage.getItem(`${user_id}_auth_token`)
    }
    const requestOptions: RequestInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add the Bearer token to the Authorization header
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
