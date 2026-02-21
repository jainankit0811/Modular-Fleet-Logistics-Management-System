import apiClient from './apiClient';

export const vehicleService = {
    getAll: async () => {
        const response = await apiClient.get('/vehicles');
        return response.data;
    },
    create: async (data) => {
        const response = await apiClient.post('/vehicles', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await apiClient.put(`/vehicles/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await apiClient.delete(`/vehicles/${id}`);
        return response.data;
    }
};
