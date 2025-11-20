"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function StartEntering() {
  const formSchema = z.object({
    password: z.string().min(8, "minimum 8 characters"),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
    mode: "all",
  });

  return (
    <div className="mx-auto max-w-[528px]">
      <h1 className="text-[32px] sm:text-[42px] sm:leading-[46px] text-center mb-4 tracking-[-0.01em]">
        Start by entering your CEP
      </h1>
      <p className="text-[16px] sm:text-[18px] sm:leading-[36px] text-center mb-[30px]">
        Enter your CEP (zip code) to check availability.
      </p>
      <div className="max-w-[425px] w-full mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => console.log("submit"))}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative mb-6">
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Enter your postal code (CEP)"
                      onChange={(e) => {
                        const noSpaces = e.target.value.replace(/\s+/g, "");
                        field.onChange(noSpaces);
                      }}
                      className="w-full outline-none h-[28px] pb-[6px] border-b border-[#7E7E7E] placeholder:text-[#CCCCCC]"
                    />
                  </FormControl>
                  <span>
                    <FormMessage className="absolute bottom-[-15px] left-0 z-1 ">
                      {!form.formState.isValid &&
                        form.formState.errors.password?.message}
                    </FormMessage>
                  </span>
                </FormItem>
              )}
            />
            <button
              className="bg-accent-color hover:bg-transparent border-transparent border-2  hover:border-accent-color hover:border w-full hover:text-accent-color text-white py-[14px] cursor-pointer transition-all duration-300 ease-out font-semibold"
              type="submit"
            >
              Continue
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
