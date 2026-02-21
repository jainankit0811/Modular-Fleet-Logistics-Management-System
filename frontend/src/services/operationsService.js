import apiClient from './apiClient';

export const maintenanceService = {
    getAll: async () => {
        const response = await apiClient.get('/maintenance');
        return response.data;
    },
    create: async (data) => {
        const response = await apiClient.post('/maintenance', data);
        return response.data;
    },
    resolve: async (vehicleId) => {
        const response = await apiClient.put(`/maintenance/${vehicleId}/resolve`);
        return response.data;
    }
};

export const fuelService = {
    getAll: async () => {
        const response = await apiClient.get('/fuel');
        return response.data;
    },
    create: async (data) => {
        const response = await apiClient.post('/fuel', data);
        return response.data;
    }
};
