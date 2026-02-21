import apiClient from './apiClient';

export const userService = {
    getMe: async () => {
        const response = await apiClient.get('/users/me');
        return response.data;
    }
};
