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
