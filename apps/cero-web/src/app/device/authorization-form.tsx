"use client";

import Logo from "@/components/shared/logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { deviceAuthorizationSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconAlertCircle,
  IconDeviceMobile,
  IconLoader2,
} from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

const DeviceAuthorizationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: zodResolver(deviceAuthorizationSchema),
    defaultValues: {
      userCode: "",
    },
  });

  const onSubmit = useCallback(
    async (data: { userCode: string }) => {
      try {
        const response = await authClient.device({
          query: { user_code: data.userCode },
        });

        console.log("Device authorization response:", response);

        if (response.data) {
          router.push(`/device/approve?user_code=${data.userCode}`);
        }

        if (response.error) {
          form.setError("root", {
            message:
              response.error.error_description ||
              "An error occurred. Please try again.",
          });
        }
      } catch (err) {
        console.error(err);
        form.setError("root", {
          message: "Invalid or expired code. Please check and try again.",
        });
      }
    },
    [router, form]
  );

  // Auto-submit if user_code is in query params
  useEffect(() => {
    const userCode = searchParams.get("user_code");
    if (userCode && !form.formState.isSubmitting) {
      form.setValue("userCode", userCode);
      form.handleSubmit(onSubmit)();
    }
  }, [searchParams, form, onSubmit]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20 px-4">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-[#FF6B6B]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#06B6D4]/20 blur-3xl" />

      <Card className="w-full max-w-md border-2 border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="flex items-center justify-center rounded-2xl bg-[#FF6B6B]/10 p-3">
              <IconDeviceMobile className="h-8 w-8 text-[#FF6B6B]" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Device Authorization
            </CardTitle>
            <CardDescription className="text-base">
              Enter the code displayed on your device to authorize it
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="ABCD-1234"
                        type="text"
                        className="text-center text-lg tracking-widest font-mono h-12"
                        disabled={form.formState.isSubmitting}
                        maxLength={9}
                        autoComplete="off"
                        autoFocus
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the 8-character code shown on your device
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <IconAlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {form.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90"
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                {form.formState.isSubmitting ? (
                  <>
                    <IconLoader2 className="animate-spin mr-2 h-5 w-5" />
                    Verifying...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Secure Authorization
              </span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              This code will expire in 30 minutes
            </p>
            <div className="flex items-center justify-center gap-2">
              <Logo className="h-5 w-5" />
              <span className="text-xs font-medium text-muted-foreground">
                Powered by <span className="text-[#FF6B6B]">CERO</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceAuthorizationForm;
