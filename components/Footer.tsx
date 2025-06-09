"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaEnvelope, FaMapPin, FaPhone } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useUser } from "@/context/UserContext";

export function Footer() {
  const t = useTranslations("Footer");
  const { user } = useUser();
  const tLinks = t.raw("links"); // Access nested object
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: tLinks.home, path: "/" },
    { name: tLinks.schedule, path: "/schedule" },
    { name: tLinks.about, path: "/about" },
    { name: tLinks.contact, path: "/contact" },
  ];

 if (user) {
    quickLinks.push({ name: tLinks.myBookings, path: "/my-bookings" });
  }

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand and Social */}
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Pilates Smederevo
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              {t("description")}
            </p>
            <div className="flex space-x-4 mt-4">
              <Link 
                href="https://www.instagram.com/pilates_smederevo/?utm_source=qr&igsh=MTI0cWhyazVpc25sZw%3D%3D#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="https://www.facebook.com/pilatesfitnes?rdid=atBzbEXiyOybAYKY&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1E6Biik1xc%2F#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{t("contact")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapPin className="w-5 h-5 text-pink-500 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {t("address")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-pink-500 dark:text-pink-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {t("phone")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-pink-500 dark:text-pink-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {t("email")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Pilates Smederevo. {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
