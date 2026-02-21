import apiClient from './apiClient';

export const driverService = {
    getAll: async () => {
        const response = await apiClient.get('/drivers');
        return response.data;
    },
    create: async (data) => {
        const response = await apiClient.post('/drivers', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await apiClient.put(`/drivers/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await apiClient.delete(`/drivers/${id}`);
        return response.data;
    }
};
