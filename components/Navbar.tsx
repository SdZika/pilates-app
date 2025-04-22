"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, } from "lucide-react"; // X
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
//import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface User {
  isAdmin?: boolean;
}

export function Navbar({ user }: { user: User | null }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    { name: "Home", path: "/" },
    { name: "Schedule", path: "/schedule" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (user) {
    routes.push({ name: "My Bookings", path: "/my-bookings" });
  }

  if (user?.isAdmin) {
    routes.push({ name: "Admin", path: "/admin" });
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
                PilatesFlow
              </div>
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
              {/*<ThemeToggle />*/}
            </div>
            {!user ? (
              <Button asChild variant="default" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link href="/api/auth/signout">Logout</Link>
              </Button>
            )}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {/*<ThemeToggle />*/}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
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
                        Login
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      asChild
                      variant="outline"
                      className="mt-4"
                    >
                      <Link
                        href="/api/auth/signout"
                        onClick={() => setIsOpen(false)}
                      >
                        Logout
                      </Link>
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