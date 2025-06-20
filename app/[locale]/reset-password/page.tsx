"use client";

import { useState } from "react";
//import { useRouter } from "next/navigation";
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
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations("ResetPassword");


  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || t("error"));
    } else {
      setMessage(t("successMessage"));
    }

    setIsLoading(false);
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
          <form onSubmit={handleReset}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-sm text-red-500">{error}</div>}
              {message && <div className="text-sm text-green-600">{message}</div>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? t("sending") : t("sendLink")}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("rememberPassword")}{" "}
            <Link
              href="/login"
              className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300 font-medium"
            >
              {t("signIn")}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
