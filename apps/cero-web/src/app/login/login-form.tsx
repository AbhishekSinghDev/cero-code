"use client";

import Logo from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { IconBrandGithub, IconLoader2 } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { data: session, isPending: sessionPending } = authClient.useSession();
  const redirectUrl = searchParams.get("redirect");

  useEffect(() => {
    // Redirect authenticated users
    if (session?.user) {
      // Decode the redirect URL to get the full path with query params
      const destination = redirectUrl ? decodeURIComponent(redirectUrl) : "/";
      router.push(destination);
    }
  }, [session, router, redirectUrl]);

  const handleGitHubSignIn = async () => {
    startTransition(async () => {
      // Decode redirect URL to ensure proper callback after OAuth
      const callbackURL = redirectUrl ? decodeURIComponent(redirectUrl) : "/";
      await authClient.signIn.social({
        provider: "github",
        callbackURL,
      });
    });
  };

  if (sessionPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <IconLoader2 className="animate-spin h-10 w-10 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20 px-4">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 -z-10 h-96 w-96 rounded-full bg-[#FF6B6B]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#06B6D4]/20 blur-3xl" />

      <Card className="w-full max-w-md border-2 border-border/50 bg-card/50 p-8 backdrop-blur">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <Logo className="h-12 w-12" showText={false} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome to <span className="text-muted-foreground">cero</span>
              <span className="text-[#FF6B6B]">code</span>
            </h1>
            <p className="text-muted-foreground">
              {redirectUrl
                ? "Sign in to authorize your device"
                : "Sign in to continue your journey"}
            </p>
          </div>

          {/* GitHub OAuth Button */}
          <Button
            onClick={handleGitHubSignIn}
            size="lg"
            className="w-full bg-[#FF6B6B] cursor-pointer text-base hover:bg-[#FF6B6B]/90"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <IconLoader2 className="animate-spin mr-2 h-5 w-5" />
                Authenticating...
              </>
            ) : (
              <>
                <IconBrandGithub className="mr-2 h-5 w-5" /> Continue with
                GitHub
              </>
            )}
          </Button>

          {/* Footer Text */}
          <p className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
