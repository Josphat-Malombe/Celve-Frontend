import api from './app';

export const registerUser = (data) => {
    return api.post('register/', JSON.stringify(data));
};

export const loginUser = (data) => {
    return api.post('login/', data);
};

export const refreshToken = () => {
    return api.post('refresh/');
};

export const logoutUser = () => {
    return api.post('logout/');
};
