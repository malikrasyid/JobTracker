import { useAuthStore } from "./store";

const RAW_API_BASE_URL = (import.meta.env.VITE_PUBLIC_API_BASE_URL as string | undefined);

const API_BASE_URL = RAW_API_BASE_URL?.replace(/\/?$/, '/');

async function request(path: string, options?: RequestInit) {
    const { token } = useAuthStore.getState();

    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    const url = new URL(cleanPath, API_BASE_URL).toString();

    console.log("Fetching API URL:", url);

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
export const getJobs = () => request(`/jobs`);
export const getJobsByStage = (stage: string) =>
    request(`/jobs/stage/${stage}`);
export const getJobById = (id: string ) => request(`/jobs/${id}`);
export const createJob = (data: any) =>
    request(`/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const updateJob = (id: string , data: any) =>
    request(`/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const deleteJob = (id: string ) =>
    request(`/jobs/${id}`, { method: 'DELETE' });

// Auth APIs
export const register = (data: any) =>
    request(`/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const login = (data: any) =>
    request(`/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

// Pipeline APIs
export const getPipelines = () => request(`/pipelines`);
export const getPipelineById = (id: string ) => request(`/pipelines/${id}`);
export const createPipeline = (data: any) =>
    request(`/pipelines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const updatePipeline = (id: string , data: any) =>
    request(`/pipelines/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
export const deletePipeline = (id: string ) =>
    request(`/pipelines/${id}`, { method: 'DELETE' });