import apiClient from './apiClient';

export const tripService = {
    getAll: async () => {
        // Trips might need driver/vehicle info, using include if backend allows or manual fetch
        const response = await apiClient.get('/trips');
        return response.data;
    },
    create: async (data) => {
        const response = await apiClient.post('/trips', data);
        return response.data;
    },
    updateStatus: async (id, status) => {
        const response = await apiClient.put(`/trips/${id}/status`, { status });
        return response.data;
    }
};
