"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useRouter } from "@/i18n/navigation";
import { useUser } from "@/context/UserContext"; 
import { useTranslations } from "next-intl";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { refreshUser } = useUser();
  const router = useRouter();
  const t = useTranslations("Login");
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        const message =
          data?.message || data?.error || t("error");
        throw new Error(message);
      }
  
      // Now fetch profile
      const res = await fetch("/api/profile");
      const profile = await res.json();
  
      await refreshUser(); // optionally refresh context if needed elsewhere
  
      if (profile?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
  
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error during login.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">{t("title")}</CardTitle>
          <CardDescription className="text-center">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("password")}</Label>
                  <Link
                    href="/reset-password"
                    className="text-sm text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-sm text-red-500 mt-2">{error}</div>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("signingIn") : t("signIn")}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {t("noAccount")}{" "}
            <Link
              href="/signup"
              className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 font-medium"
            >
              {t("signUp")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
