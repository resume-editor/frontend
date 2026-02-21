import apiClient from "./apiClient"

export const fetchUserProfile = async () => {
    const response = await apiClient.get('/auth/profile')

    return response.data
}

export const updateUserProfile = async (data) => {
    const response = await apiClient.put('/auth/profile', data)

    return response.data
}

export const changePassword = async (data) => {
    const response = await apiClient.put('/auth/password', data)

    return response.data
}