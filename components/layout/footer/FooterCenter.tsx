import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { FooterNavLink } from "@/constants/FooterNavLinks";

export default function FooterCenter() {
  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email required")
      .email({ message: "Invalid email" }),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  const footerPolicyLinks: FooterNavLink[] = [
    {
      href: "https://www.velvion.com.br/politica-de-privacidade-da-velvion",
      label: "Política de Privacidade",
    },
    { href: "https://www.velvion.com.br/sobre", 
      label: "Termos de Serviço" },
  ];

  return (
    <div className="w-full flex ltablet:flex-row flex-col border-b border-cream py-8 sm:py-14 justify-between items-center gap-6">
      <div className="flex w-full flex-col ltablet:flex-row justify-center items-center gap-4">
        <div className="w-full ltablet:max-w-[273px] ltablet:min-w-[145px]">
          <h2 className="text-white text-center ltablet:text-left font-work-sans font-bold text-2xl whitespace-nowrap">
            Fique por dentro
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {
              window.location.assign("https://www.velvion.com.br");
            })}
            className=" flex w-full flex-col sm:flex-row gap-6 sm:gap-4 h-full justify-center ltablet:justify-start"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Seu e-mail"
                      onChange={(e) => {
                        const noSpaces = e.target.value.replace(/\s+/g, "");
                        field.onChange(noSpaces);
                      }}
                      className="p-5 bg-cream placeholder:text-neutral placeholder:text-[14px] w-full sm:w-[300px]"
                    />
                  </FormControl>
                  <span>
                    <FormMessage className="absolute bottom-[-20px] left-0 z-1 text-red-400">
                      {!form.formState.isValid &&
                        form.formState.errors.email?.message}
                    </FormMessage>
                  </span>
                </FormItem>
              )}
            />
            <Button
              className="bg-cyan h-[60px] hover:bg-transparent border-transparent border-2 hover:border-cyan hover:border w-full sm:w-[143px] hover:text-cyan text-white py-[14px] transition-all duration-300 ease-out font-semibold"
              type="submit"
            >
              Inscrever-se
            </Button>
          </form>
        </Form>
      </div>
      <ul className="flex flex-col sm:flex-row ltablet:flex-col! xl:flex-row! gap-8 sm:gap-6">
        {footerPolicyLinks.map((link: FooterNavLink) => (
          <li key={link.label} className="w-full">
            <Link
              href={link.href}
              rel="noopener noreferrer"
              className="block w-full min-w-[170px] text-center lmobile:text-left text-white text-[16px] font-medium hover:text-cyan transition-all duration-300 ease-out"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
