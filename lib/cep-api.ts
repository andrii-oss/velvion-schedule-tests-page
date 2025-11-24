import axios from "axios";
import { CepResponse } from "@/components/home/StartEntering";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;

export interface CheckCepAvailabilityParams {
  zipCode: string;
  onSuccess?: (response: CepResponse) => void;
  onError?: (error: unknown) => void;
}

export interface CheckCepAvailabilityResult {
  response: CepResponse;
  isAvailable: boolean;
}

/**
 * Checks CEP availability via API
 * @param zipCode - CEP code (8 digits)
 * @returns Promise with verification result
 * @throws Error if an error occurred during the request
 */
export async function checkCepAvailability(
  zipCode: string
): Promise<CheckCepAvailabilityResult> {
  try {
    const response = await axios.post<CepResponse>(
      `${BASE_URL}/api/v1/locations/check-availability`,
      {
        cep: zipCode, //09090909 -> test  for successful  response with available: true
      }
    );

    const responseData: CepResponse = response.data;
    const isAvailable = responseData.available === true;

    return {
      response: responseData,
      isAvailable,
    };
  } catch (error) {
    console.error("Error fetching zip code:", error);
    throw error;
  }
}

/**
 * Handles a CEP validation error and returns an error message
 * @param error - Error with catch block
 * @returns Error message
 */
export function getCepErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Erro ao verificar disponibilidade";
  }
  return "Erro ao verificar disponibilidade";
}
