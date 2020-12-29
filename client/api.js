class ApiError extends Error {
    constructor(message, data, cause) {
        super(message);
        this.data = data;
        this.cause = cause;
        this.name = 'ApiError';
    }
};

export async function apiCall(endpoint, params) {
    let result;

    try {
        result = await fetch(endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params),
        });
    } catch (e) {
        throw new ApiError('Network Error', {message: 'Network Error'}, e);
    }

    let resultData;
    try {
        resultData = await result.json();
    } catch (e) {
        console.error(e);
        throw new ApiError('API Error', {message: 'Unknown Error'}, e);
    }

    if (200 !== result.status) {
        throw new ApiError('API Error', resultData);
    }

    return resultData;
}

