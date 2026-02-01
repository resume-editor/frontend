import apiClient from "./apiClient";

export const signInApi = async (payload) => {
    console.log('Sign in API')
    const response = await apiClient.post("/auth/sign-in", payload);
    console.log('Sign in API Response: ', response)
    return { ...response.data }
};


export const signUpApi = async (name, email, password) => {
    const response = await apiClient.post("/auth/sign-up", {
        name,
        email,
        password,
    });

    return { data: response.data, status: response.status }
};

export const sendOtpApi = async (email, type = '2_fa') => {
    const response = await apiClient.post("/auth/otp", {
        email,
        type
    });

    return { data: response.data, status: response.status }
};

export const verifyEmailApi = async (email, code, type = '2_fa') => {
    const response = await apiClient.post("/auth/otp", {
        email,
        code,
        type
    });

    return { data: response.data, status: response.status }
};

