export const login = ({ email, password }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                token: 'dummy-login-token',
                user: { email }
            });
        }, 1000);
    });
};


export const signup = ({ name, email, password }) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'Account created successfully'
            });
        }, 1000);
    });
};