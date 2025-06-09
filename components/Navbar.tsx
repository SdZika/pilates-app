"use client";

import { Link } from "@/i18n/navigation";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, } from "lucide-react"; // X
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle  } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/UserContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {useTranslations} from 'next-intl';

export function Navbar() {

  const t = useTranslations("Navbar")
  const { user, loading, refreshUser } = useUser();

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    { name: t("homePage"), path: "/" },
    { name: t("schedule"), path: "/schedule" },
    { name: t("about"), path: "/about" },
    { name: t("contact"), path: "/contact" },
  ];

  if (user) {
    routes.push({ name: t("myBookings"), path: "/my-bookings" });
  }

  if (user?.role === 'admin') {
    routes.push({ name: "Admin", path: "/admin" });
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      await refreshUser(); // refresh context immediately
      router.push("/login");
      router.refresh(); // optional, only if you need server components to re-render
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  if (loading) {
    return (
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm h-16 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">{t("loading")}</span>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Pilates Smederevo
              </div>
              <p>{user?.email}</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === route.path
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400"
                )}
              >
                {route.name}
              </Link>
            ))}
            <div className="pl-4">
              <ThemeToggle />
            </div>
            <div className="pl-4">
              <LanguageSwitcher />
            </div>
            {!user ? (
              <Button asChild variant="default" size="sm">
                <Link href="/login">{t("login")}</Link>
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {t("logout")}
              </Button>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col space-y-4 mt-8">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-3 py-2 text-lg font-medium rounded-md transition-colors",
                        pathname === route.path
                          ? "text-pink-600 dark:text-pink-400"
                          : "text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400"
                      )}
                    >
                      {route.name}
                    </Link>
                  ))}
                  {!user ? (
                    <Button asChild className="mt-4">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        {t("login")}
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {setIsOpen(false); handleLogout();}}
                    >
                        {t("logout")}
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}