import apiClient from "./apiClient";

export const getHomeData = () => {
    return Promise.resolve([
        {
            id: 1,
            name: 'Modern Resume',
            thumbnail: '/resume1.png'
        },
        {
            id: 2,
            name: 'Professional Resume',
            thumbnail: '/resume2.png'
        },
        {
            id: 3,
            name: 'Creative Resume',
            thumbnail: '/resume3.png'
        }
    ]);
};

export const fetchHomeData = async (page = 1, size = 12, name = undefined) => {
    let url = name ? `/template?page=${page}&size=${size}&name=${name}` : `/template?page=${page}&size=${size}`
    const response = await apiClient.get(url)
    return response.data
}

export const fetchSidebarData = async (page = 1, size = 10, name = undefined) => {
    let url = name ? `/resume?page=${page}&size=${size}&name=${name}` : `/resume?page=${page}&size=${size}`
    const response = await apiClient.get(url)
    return response.data
}

export const updateUserTemplate = async (id, data) => {
    const url = `/resume/${id}`
    const response = await apiClient.put(url, data)
    return response.data
}

export const deleteProject = async (data) => {
    const url = `/resume/${id}`

    const response = await apiClient.delete(url)

    return response.data
}