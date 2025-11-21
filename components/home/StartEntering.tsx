"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useAvailabilityStore } from "@/store/availability-store";
import { useToast } from "@/hooks/use-toast";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;

const formSchema = z.object({
  zipCode: z.string().regex(/^\d{8}$/, "CEP deve ter exatamente 8 dígitos"),
});

type FormSchema = z.infer<typeof formSchema>;

function formatCep(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length >= 5) {
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  }
  return digits;
}

function handleCepBackspace(
  e: React.KeyboardEvent<HTMLInputElement>,
  currentValue: string,
  onChange: (value: string) => void
) {
  if (e.key === "Backspace") {
    const input = e.currentTarget;
    const cursorPosition = input.selectionStart || 0;
    const formattedValue = formatCep(currentValue);
    const digits = currentValue.replace(/\D/g, "");

    if (
      cursorPosition === 6 &&
      formattedValue.endsWith("-") &&
      digits.length > 0
    ) {
      e.preventDefault();
      const newDigits = digits.slice(0, -1);
      onChange(newDigits);
      setTimeout(() => {
        input.setSelectionRange(4, 4);
      }, 0);
    }
  }
}

export default function StartEntering() {
  const { toast } = useToast();
  const setAvailability = useAvailabilityStore(
    (state) => state.setAvailability
  );
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!BASE_URL) {
        throw new Error("BASE_URL não configurado");
      }

      const response = await axios.post(
        `${BASE_URL}/api/v1/locations/check-availability`,
        {
          cep: values.zipCode,
        }
      );

      console.log("response", response);

      const isAvailable = response.data?.available === true;

      toast({
        status: isAvailable ? "success" : "error",
        title:
          response.data?.message ||
          (isAvailable ? "Região atendida!" : "Região não atendida"),
      });

      // Set availability based on API response
      if (isAvailable) {
        setAvailability(true);
      } else {
        setAvailability(false);
      }
    } catch (error) {
      console.error("Error fetching zip code:", error);

      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Erro ao verificar disponibilidade"
        : "Erro ao verificar disponibilidade";

      toast({
        status: "error",
        title: errorMessage,
      });

      setAvailability(false);
    }
  };
  return (
    <div className="mx-auto max-w-[528px] h-full flex flex-col w-full">
      <div className="pb-[36px] mb-[36px] border-b border-gray dark:border-cyan-light">
        <h1 className="text-[32px] dark:text-cyan text-dark sm:text-[36px] text-center mb-4 tracking-[-0.01em] font-helvetica-neue font-semibold">
          Qual seu CEP?
        </h1>
        <p className="text-[18px] sm:text-[20px] dark:text-cyan-light text-blue leading-[26px] text-center">
          Vamos confirmar se já atendemos a sua região.
        </p>
      </div>

      <div className="w-full mx-auto flex flex-col h-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-[25vh] h-full"
          >
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="relative mb-6">
                  <FormLabel className="text-dark dark:text-cyan-light text-[16px] font-bold">
                    CEP
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00000-000"
                      className="p-5 mt-2"
                      value={formatCep(field.value)}
                      onChange={(e) => {
                        const rawValue = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 8);
                        field.onChange(rawValue);
                        form.trigger("zipCode");
                      }}
                      onKeyDown={(e) => {
                        handleCepBackspace(e, field.value, field.onChange);
                      }}
                      onBlur={() => {
                        form.clearErrors("zipCode");
                      }}
                    />
                  </FormControl>
                  <FormMessage className="absolute bottom-[-20px] left-0 text-red-500" />
                </FormItem>
              )}
            />

            <Button
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className="bg-cyan hover:bg-transparent border-transparent border-2 hover:border-cyan hover:border w-full hover:text-cyan text-dark py-[14px] transition-all duration-300 ease-out font-semibold mt-auto disabled:opacity-50"
              type="submit"
            >
              Continuar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
