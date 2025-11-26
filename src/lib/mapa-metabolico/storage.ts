import type { MapaProgress } from './types';

const STORAGE_KEY = 'levser_mapa_progress';
const TTL_DAYS = 7;

export function saveProgress(progress: MapaProgress) {
  try {
    const data = {
      ...progress,
      expiresAt: new Date(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function loadProgress(): MapaProgress | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    const expiresAt = new Date(data.expiresAt);

    if (expiresAt < new Date()) {
      clearProgress();
      return null;
    }

    return {
      currentStep: data.currentStep,
      answers: data.answers,
      lastUpdated: data.lastUpdated,
    };
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
}
