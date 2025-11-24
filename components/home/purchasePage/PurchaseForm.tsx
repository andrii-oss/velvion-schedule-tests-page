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
import Link from "next/link";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import axios from "axios";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Checkbox } from "@/components/ui/checkbox";
import { CouponData } from "@/types/couponTypes";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;
const baseLink = "https://www.velvion.com.br";

export interface PaymentData {
  bankSlipUrl: string;
  billingType: string;
  customer: string;
  dateCreated: string; // ISO string
  description: string;
  dueDate: string; // YYYY-MM-DD
  externalReference: string | null;
  id: string;
  installmentCount: number | null;
  installmentValue: number | null;
  interestValue: number | null;
  invoiceNumber: string;
  invoiceUrl: string;
  netValue: number;
  originalValue: number | null;
  status: string;
  transactionReceiptUrl: string | null;
  value: number;
}

function formatBrazilPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  // <-- IMPORTANT: if nothing is entered, return ""
  if (digits.length === 0) return "";

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

const formSchema = z.object({
  cpfCode: z.string().min(11, "mínimo 11 caracteres"),
  fullName: z.string().min(2, "mínimo 2 caracteres"),
  phoneNumber: z
    .string()
    .min(11, "Número de telefone inválido")
    .refine(
      (value) => {
        const e164 = "+55" + value.replace(/\D/g, "");
        return isValidPhoneNumber(e164);
      },
      { message: "Número de telefone inválido" }
    ),
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .email({ message: "E-mail inválido" }),
  termsAccepted: z.boolean().refine((value) => value === true, {
    message: "Você deve aceitar os termos para continuar",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface PurchaseFormProps {
  couponData: CouponData | null;
  selectedOption: number;
}
export default function PurchaseForm({
  couponData,
  selectedOption,
}: PurchaseFormProps) {
  const { toast } = useToast();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpfCode: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      termsAccepted: false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { isValid, isDirty },
  } = form;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currValues = form.watch();

  const onSubmit = async (values: FormSchema) => {
    try {
      const response = await axios.post<PaymentData>(
        `${BASE_URL}/api/v1/payments/create`,
        {
          payment_type:
            selectedOption === 12 ? "installment_payment" : "full_payment",
          cpf: values.cpfCode, //12345678909 -> test for successful response
          customer_name: values.fullName,
          customer_email: values.email,
          customer_phone: "+55" + values.phoneNumber.replace(/\D/g, ""), // <- Sending in E.164 format
          total_value: couponData?.final_value || 1080,
        }
      );

      const paymentData: PaymentData = response.data;

      if (paymentData.invoiceUrl) {
        toast({
          status: "success",
          title: "Sucesso ao criar pagamento!",
        });
      } else {
        throw new Error("Erro ao criar pagamento");
      }

      console.log("response", response);
    } catch (error) {
      console.error("Error fetching zip code:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Erro ao criar pagamento"
        : "Erro ao criar pagamento";
      toast({
        status: "error",
        title: errorMessage,
      });
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
          {/* cpfCode */}
          <FormField
            control={form.control}
            name="cpfCode"
            render={({ field }) => (
              <FormItem className="relative mb-6">
                <FormLabel className="text-dark dark:text-cyan-light text-[16px] font-bold">
                  CPF
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu CPF"
                    className="p-5 mt-2"
                    value={field.value}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      if (digits.length <= 11) {
                        field.onChange(digits);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-20px] left-0 text-red-500" />
              </FormItem>
            )}
          />

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="relative mb-6">
                <FormLabel className="text-dark dark:text-cyan-light text-[16px] font-bold">
                  Nome Completo
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seu nome completo"
                    className="p-5 mt-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-20px] left-0 z-1 text-red-500">
                  {form.formState.errors.fullName?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative mb-6">
                <FormLabel className="text-dark dark:text-cyan-light text-[16px] font-bold">
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@exemplo.com"
                    className="p-5 mt-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-20px] left-0 z-1 text-red-500">
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="relative mb-6">
                <FormLabel className="text-dark dark:text-cyan-light text-[16px] font-bold">
                  Telefone (WhatsApp)
                </FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="(00) 90000-0000"
                    className="p-5 mt-2"
                    value={formatBrazilPhone(field.value)}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      field.onChange(digits);
                    }}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-[-20px] left-0 z-1 text-red-500">
                  {form.formState.errors.phoneNumber?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 mb-13 space-y-0 relative">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                </FormControl>
                <FormLabel className="text-sm text-blue dark:text-cyan-light cursor-pointer mt-0!">
                  Li e concordo com os{" "}
                  <Link
                    href={`${baseLink}/sobre`}
                    className="text-cyan font-semibold underline! hover:text-cyan/80 transition-colors "
                    onClick={(e) => e.stopPropagation()}
                  >
                    Termos de Uso
                  </Link>
                  ,{" "}
                  <Link
                    href={`${baseLink}/politica-de-privacidade-da-velvion`}
                    className="text-cyan font-semibold underline! hover:text-cyan/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Política de Privacidade
                  </Link>
                  .
                </FormLabel>
                <FormMessage className="absolute bottom-[-20px] left-0 z-1 text-red-500" />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            disabled={
              !form.formState.isValid ||
              form.formState.isSubmitting ||
              !form.watch("termsAccepted")
            }
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
