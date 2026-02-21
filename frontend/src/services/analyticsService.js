import apiClient from './apiClient';

export const analyticsService = {
    getDashboardStats: async () => {
        const response = await apiClient.get('/analytics/stats');
        return response.data;
    },
    getStats: async () => {
        const response = await apiClient.get('/analytics/stats');
        return response.data;
    },
    getROI: async () => {
        const response = await apiClient.get('/analytics/roi');
        return response.data;
    }
};
