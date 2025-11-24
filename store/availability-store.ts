import { create } from "zustand";
import { CepResponse } from "@/components/home/StartEntering";

interface AvailabilityState {
  isAvailable: boolean;
  cepResponse: CepResponse | null;
  setAvailability: (available: boolean) => void;
  setCepResponse: (response: CepResponse) => void;
  reset: () => void;
}

export const useAvailabilityStore = create<AvailabilityState>((set) => ({
  isAvailable: false,
  cepResponse: null,
  setAvailability: (available: boolean) => set({ isAvailable: available }),
  setCepResponse: (response: CepResponse) => set({ cepResponse: response }),
  reset: () => set({ isAvailable: false, cepResponse: null }),
}));
