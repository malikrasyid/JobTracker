import { create } from 'zustand';
import * as api from './api';

interface Job {
  id: string;
  title: string;
  stage: string;
  // Add other job fields as needed
}

interface Pipeline {
  id: string;
  name: string;
  // Add other pipeline fields as needed
}

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

interface JobState {
  jobs: Job[];
  job: Job | null;
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  fetchJobsByStage: (stage: string) => Promise<void>;
  createJob: (data: any) => Promise<void>;
  updateJob: (id: string, data: any) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

interface PipelineState {
  pipelines: Pipeline[];
  pipeline: Pipeline | null;
  loading: boolean;
  error: string | null;
  fetchPipelines: () => Promise<void>;
  fetchPipelineById: (id: string) => Promise<void>;
  createPipeline: (data: any) => Promise<void>;
  updatePipeline: (id: string, data: any) => Promise<void>;
  deletePipeline: (id: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const user = await api.login(data);
      set({ user, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const user = await api.register(data);
      set({ user, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  logout: () => set({ user: null }),
}));

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  job: null,
  loading: false,
  error: null,
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const jobs = await api.getJobs();
      set({ jobs, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  fetchJobById: async (id) => {
    set({ loading: true, error: null });
    try {
      const job = await api.getJobById(id);
      set({ job, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  fetchJobsByStage: async (stage) => {
    set({ loading: true, error: null });
    try {
      const jobs = await api.getJobsByStage(stage);
      set({ jobs, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  createJob: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.createJob(data);
      await useJobStore.getState().fetchJobs();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  updateJob: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await api.updateJob(id, data);
      await useJobStore.getState().fetchJobs();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  deleteJob: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.deleteJob(id);
      await useJobStore.getState().fetchJobs();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export const usePipelineStore = create<PipelineState>((set) => ({
  pipelines: [],
  pipeline: null,
  loading: false,
  error: null,
  fetchPipelines: async () => {
    set({ loading: true, error: null });
    try {
      const pipelines = await api.getPipelines();
      set({ pipelines, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  fetchPipelineById: async (id) => {
    set({ loading: true, error: null });
    try {
      const pipeline = await api.getPipelineById(id);
      set({ pipeline, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  createPipeline: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.createPipeline(data);
      await usePipelineStore.getState().fetchPipelines();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  updatePipeline: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await api.updatePipeline(id, data);
      await usePipelineStore.getState().fetchPipelines();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  deletePipeline: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.deletePipeline(id);
      await usePipelineStore.getState().fetchPipelines();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));