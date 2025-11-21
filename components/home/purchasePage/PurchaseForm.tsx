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
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import axios from "axios";
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

export default function PurchaseForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/locations/check-availability`,
        {
          cep: values.zipCode,
        }
      );

      console.log("response", response);
    } catch (error) {
      console.error("Error fetching zip code:", error);
    }
  };
  return (
    <div className="w-full mx-auto flex flex-col h-full border-t border-gray dark:border-cyan-light pt-[36px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full"
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
  );
}
