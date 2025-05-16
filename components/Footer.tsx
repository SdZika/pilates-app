"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaEnvelope, FaMapPin, FaPhone } from "react-icons/fa"; //FaTwitter,
//import { cn } from "@/lib/utils";
//import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Schedule", path: "/schedule" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "My Bookings", path: "/my-bookings" },
  ];

  // const services = [
  //   { name: "Private Sessions", path: "/services/private" },
  //   { name: "Group Classes", path: "/services/group" },
  //   { name: "Corporate Wellness", path: "/services/corporate" },
  //   { name: "Online Training", path: "/services/online" },
  //   { name: "Workshops", path: "/services/workshops" },
  // ];

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand and Social */}
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                PilatesFlow
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Discover the transformative power of Pilates with our expert instructors and state-of-the-art facilities.
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
              {/*<Link 
                href="https://twitter.com/pilatesflow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>*/}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
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

          {/* Services */}
          {/*<div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.path}>
                  <Link 
                    href={service.path}
                    className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>*/}

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapPin className="w-5 h-5 text-pink-500 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Djure Danicica 6, Smederevo (Teretana Zlatan Gym - Sportska hala)<br />
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-pink-500 dark:text-pink-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  (+381) 064 1932-069
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="w-5 h-5 text-pink-500 dark:text-pink-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  biljanazivkovic2411@gmail.com
                </span>
              </li>
            </ul>
            
            {/*<div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                Subscribe to our newsletter
              </h4>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-l-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
                <Button 
                  className="rounded-l-none bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  Join
                </Button>
              </div>
            </div>*/}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} PilatesFlow. All rights reserved.
            </p>
            {/*<div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="/privacy"
                className="text-sm text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms"
                className="text-sm text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies"
                className="text-sm text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>*/} 
          </div>
        </div>
      </div>
    </footer>
  );
}