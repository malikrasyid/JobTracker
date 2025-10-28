import { useAuthStore } from "./store";

const API_BASE_URL = '/api';

// Helper for fetch requests
async function request(url: string, options?: RequestInit) {
    const token = useAuthStore.getState().user?.token;
    const headers = {
        ...(options?.headers || {}),
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
 
    const response = await fetch(url, {...options, headers});

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'API request failed');
    }
    return response.json();
}

// Jobs APIs
export const getJobs = () => request(`${API_BASE_URL}/jobs`);
export const getJobsByStage = (stage: string) =>
    request(`${API_BASE_URL}/jobs/stage/${stage}`);
export const getJobById = (id: string ) => request(`${API_BASE_URL}/jobs/${id}`);
export const createJob = (data: any) =>
    request(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const updateJob = (id: string , data: any) =>
    request(`${API_BASE_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const deleteJob = (id: string ) =>
    request(`${API_BASE_URL}/jobs/${id}`, { method: 'DELETE' });

// Auth APIs
export const register = (data: any) =>
    request(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const login = (data: any) =>
    request(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

// Pipeline APIs
export const getPipelines = () => request(`${API_BASE_URL}/pipeline`);
export const getPipelineById = (id: string ) => request(`${API_BASE_URL}/pipeline/${id}`);
export const createPipeline = (data: any) =>
    request(`${API_BASE_URL}/pipeline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const updatePipeline = (id: string , data: any) =>
    request(`${API_BASE_URL}/pipeline/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const deletePipeline = (id: string ) =>
    request(`${API_BASE_URL}/pipeline/${id}`, { method: 'DELETE' });