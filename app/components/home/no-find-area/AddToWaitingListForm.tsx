"use client";

import * as React from "react";
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
import {
  isValidPhoneNumber,
  parsePhoneNumber,
  Country,
} from "react-phone-number-input";
import { PhoneInput } from "../../ui/phone-input";

export default function AddToWaitingListForm() {
  const [selectedCountry, setSelectedCountry] = React.useState<
    Country | undefined
  >(undefined);

  // Function for validating a phone number in the national format
  const validatePhoneNumber = (value: string): boolean => {
    if (!value || value.trim() === "") {
      return false;
    }

    // If the number is already in international format (starts with +)
    if (value.startsWith("+")) {
      return isValidPhoneNumber(value);
    }

    // If the number is already in international format (starts with +)
    if (selectedCountry) {
      try {
        // Let's try to parse the number with the specified country
        const phoneNumber = parsePhoneNumber(value, selectedCountry);
        return phoneNumber ? phoneNumber.isValid() : false;
      } catch {
        // If parsing fails, try with international format
        return isValidPhoneNumber(value);
      }
    }

    // If no country is selected, use standard validation
    return isValidPhoneNumber(value);
  };

  const formSchema = z.object({
    fullName: z.string().min(2, "minimum 2 characters"),
    phoneNumber: z.string().refine((value) => validatePhoneNumber(value), {
      message: "Invalid phone number",
    }),
    email: z
      .string()
      .min(1, "Email required")
      .email({ message: "Invalid email" }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
    },
    mode: "all",
  });

  return (
    <div className="mx-auto w-full max-w-[457px]">
      <div className="max-w-[425px] w-full mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => console.log("submit"))}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="relative mb-5">
                  <div className="flex flex-col gap-3 mb-4">
                    <FormLabel className="text-[22px] sm:h-[26px] text-black">
                      How should we call you?
                    </FormLabel>
                    <FormLabel className="text-[18px] sm:leading-[36px] sm:h-[26px] text-gray">
                      Name needed for the waiting list.
                    </FormLabel>
                  </div>

                  <FormControl>
                    <input
                      type="text"
                      {...field}
                      placeholder="Enter your full name"
                      className="w-full text-[16px] outline-none h-[28px] pb-[6px] border-b border-gray placeholder:text-placeholder"
                    />
                  </FormControl>
                  <span>
                    <FormMessage className="absolute bottom-[-15px] left-0 z-1 ">
                      {!form.formState.isValid &&
                        form.formState.errors.fullName?.message}
                    </FormMessage>
                  </span>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="relative mb-5">
                  <div className="flex flex-col gap-3 mb-4">
                    <FormLabel className="text-[22px] sm:h-[26px] text-black">
                      What is your WhatsApp number?
                    </FormLabel>
                    <FormLabel className="text-[18px] sm:leading-[36px] sm:h-[26px] text-gray">
                      We'll notify you here.
                    </FormLabel>
                  </div>

                  <FormControl>
                    <PhoneInput
                      {...field}
                      placeholder="Enter your phone number"
                      onCountryChange={(country) => {
                        setSelectedCountry(country);
                        // Trigger validation after changing country
                        form.trigger("phoneNumber");
                      }}
                    />
                  </FormControl>
                  <span>
                    <FormMessage className="absolute bottom-[-20px] left-0 z-1 ">
                      {!form.formState.isValid &&
                        form.formState.errors.phoneNumber?.message}
                    </FormMessage>
                  </span>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative mb-5">
                  <div className="flex flex-col gap-3 mb-4">
                    <FormLabel className="text-[22px] sm:h-[26px] text-black">
                      What is your e-mail?
                    </FormLabel>
                    <FormLabel className="text-[18px] sm:leading-[36px] sm:h-[26px] text-gray">
                      We'll send you a confirmation.
                    </FormLabel>
                  </div>

                  <FormControl>
                    <input
                      type="email"
                      {...field}
                      placeholder="Enter your e-mail"
                      onChange={(e) => {
                        const noSpaces = e.target.value.replace(/\s+/g, "");
                        field.onChange(noSpaces);
                      }}
                      className="w-full text-[16px] outline-none h-[28px] pb-[6px] border-b border-gray placeholder:text-placeholder"
                    />
                  </FormControl>
                  <span>
                    <FormMessage className="absolute bottom-[-15px] left-0 z-1 ">
                      {!form.formState.isValid &&
                        form.formState.errors.email?.message}
                    </FormMessage>
                  </span>
                </FormItem>
              )}
            />

            <button
              className="bg-cyan hover:bg-transparent border-transparent border-2 hover:border-cyan hover:border w-full hover:text-cyan text-white py-[14px] cursor-pointer transition-all duration-300 ease-out font-semibold"
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
