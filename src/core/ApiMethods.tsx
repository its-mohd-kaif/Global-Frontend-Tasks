interface ApiError {
    message: string;
}

type ApiResponse<Data> = Data | ApiError;

/**
 * Make this method for call api
 * @param method In This You Can Pass Method Like (GET,POST)
 * @param endPoint For Adding End Point
 * @param body Passing Payload
 * @returns Promise
 */

export function callApi<Data>(method: string, endPoint: string, payload = {} as any, extraHeaders = "" as any): Promise<ApiResponse<Data>> {
    const user_id = sessionStorage.getItem("user_id");
    let token: any = process.env.REACT_APP_BEARER
    if (sessionStorage.getItem(`${user_id}_auth_token`) !== null) {
        token = sessionStorage.getItem(`${user_id}_auth_token`)
    }
    let headers = new Headers({
        Authorization: `Bearer ${token}`
    });
    if (extraHeaders !== "") {
        headers = new Headers({
            Authorization: `Bearer ${token}`,
            "Ced-Source-Id": "440",
            "Ced-Source-Name": "shopify",
            "Ced-Target-Id": "313",
            "Ced-Target-Name": "tiktok",
            "Apptag": "tiktok_connector"
        });
    }

    const requestOptions: RequestInit = {
        method: method,
        headers: headers,
    };

    if (method === 'POST') {
        headers.set('Content-Type', 'application/json');
        requestOptions.body = JSON.stringify(payload);
    } else if (method === 'GET') {
        const url = new URL(`${process.env.REACT_APP_END_POINT}${endPoint}`);
        if (payload) {
            Object.keys(payload).forEach((key) =>
                url.searchParams.append(key, payload[key])
            );
        }
        endPoint = url.toString();
    }
    const hitUrl = method === "GET" ? endPoint : `${process.env.REACT_APP_END_POINT}${endPoint}`
    return fetch(`${hitUrl}`, requestOptions)
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
