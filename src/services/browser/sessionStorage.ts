import type { StateStorage } from "zustand/middleware";

export const chromeSessionStorage: StateStorage = {
  getItem: async (name) => {
    const result = await chrome.storage.session.get(name);
    return (result[name] as string | null) ?? null;
  },
  setItem: async (name, value) => {
    await chrome.storage.session.set({ [name]: value });
  },
  removeItem: async (name) => {
    await chrome.storage.session.remove(name);
  },
};
