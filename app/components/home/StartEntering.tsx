"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/app/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

export default function StartEntering() {
  const formSchema = z.object({
    zipCode: z.string().min(5, "minimum 5 characters"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "",
    },
    mode: "all",
  });

  return (
    <div className="mx-auto max-w-[528px] flex-1 flex flex-col w-full">
      <div className="pb-[36px] mb-[36px] border-b border-border-default dark:border-border-default-dark">
        <h1 className="text-[32px] dark:text-accent-color text-text-primary sm:text-[42px] sm:leading-[46px] text-center mb-4 tracking-[-0.01em] font-semibold">
          Qual seu CEP?
        </h1>
        <p className="text-[16px] sm:text-[18px] dark:text-text-secondary-dark text-text-secondary sm:leading-[36px] text-center ">
          Vamos confirmar se já atendemos a sua região.
        </p>
      </div>

      <div className="w-full mx-auto flex-1 flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => console.log("submit"))}
            className="flex-1 flex flex-col"
          >
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem className="relative mb-6">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="00000-000"
                      onChange={(e) => {
                        const noSpaces = e.target.value.replace(/\s+/g, "");
                        field.onChange(noSpaces);
                      }}
                      className="p-5"
                    />
                  </FormControl>
                  <span>
                    <FormMessage className="absolute bottom-[-15px] left-0 z-1 text-red-500">
                      {!form.formState.isValid &&
                        form.formState.errors.zipCode?.message}
                    </FormMessage>
                  </span>
                </FormItem>
              )}
            />
            <button
              className="bg-accent-color hover:bg-transparent border-transparent border-2 hover:border-accent-color hover:border w-full hover:text-accent-color text-white py-[14px] cursor-pointer transition-all duration-300 ease-out font-semibold mt-auto"
              type="submit"
            >
              Continuar
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
