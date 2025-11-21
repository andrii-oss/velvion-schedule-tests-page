import { create } from "zustand";

interface AvailabilityState {
  isAvailable: boolean | null;
  setAvailability: (available: boolean) => void;
  reset: () => void;
}

export const useAvailabilityStore = create<AvailabilityState>((set) => ({
  isAvailable: null,
  setAvailability: (available: boolean) => set({ isAvailable: available }),
  reset: () => set({ isAvailable: null }),
}));
