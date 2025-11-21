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
  coupon: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function PurchaseForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coupon: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/`, {
        cep: values.coupon,
      });

      console.log("response", response);
    } catch (error) {
      console.error("Error fetching zip code:", error);
    }
  };
  return (
    <section className="w-full mx-auto flex flex-col border-t border-gray dark:border-cyan-light pt-[36px]">
      <div className="mb-6">
        <h2 className="text-dark dark:text-cyan-light text-2xl font-helvetica-neue font-medium mb-3">
          Seus Dados
        </h2>
        <p className="text-blue text-[16px] font-medium">
          Usaremos só para criar sua conta, emitir comprovantes e nota fiscal.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="coupon"
            render={({ field }) => (
              <FormItem className="relative mb-6">
                <FormLabel className="text-dark dark:text-cyan-light text-[16px] font-bold">
                  CPF
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cupom de desconto"
                    className="p-5 mt-2"
                    {...field}
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
    </section>
  );
}
