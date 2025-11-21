"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        status,
        ...props
      }) {
        const Icon = status === "error" ? XCircle : CheckCircle2;
        const iconColor =
          status === "error" ? "text-red-600" : "text-green-600";

        return (
          <Toast
            key={id}
            variant={status === "error" ? "destructive" : "default"}
            {...props}
          >
            <div className="flex items-start gap-3 flex-1">
              <Icon className={`h-5 w-5 ${iconColor} shrink-0 mt-0.5`} />
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
