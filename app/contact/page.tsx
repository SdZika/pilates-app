"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FaMapPin, FaPhone, FaEnvelope, FaClock, FaInstagram } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  // Contact form submission handler - connect to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      // This would be your actual Supabase client initialization
      const supabase = createClient();
      
      const { error } = await supabase
        .from('messages')
        .insert([
          { name, email, phone, subject, message }
        ]);
      
      if (error) throw error;
     
      
      // For now, we'll simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      
      // Show confirmation dialog
      setShowConfirmation(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("There was a problem submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const studioLocations = [
    {
      name: "Bilja Pilates",
      address: "Djure Danicica 6, Smederevo (Teretana Zlatan Gym - Sportska hala",
      phone: "(+381) 064 1932-069",
      email: "info@pilatesflow.com",
      hours: "Mon-Fri: 7am-8pm, Sat-Sun: 9am-5pm",
      pin: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.902252656889!2d20.931291199999997!3d44.66034870000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4750939530efbb99%3A0xae7f7f99ac7a159d!2sGYM%20I%20FITNESS%20KLUB%20ZLATAN!5e0!3m2!1ssr!2srs!4v1747123108706!5m2!1ssr!2srs"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Contact PilatesFlow
        </h1>
        
        <div className="mb-12 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Have questions or want to book a session? Reach out to us and our team will get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input 
                        id="phone" 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Your phone number" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select 
                        value={subject} 
                        onValueChange={setSubject}
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="classes">Class Information</SelectItem>
                          <SelectItem value="private">Private Sessions</SelectItem>
                          <SelectItem value="pricing">Pricing</SelectItem>
                          <SelectItem value="careers">Careers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us how we can help you..." 
                      rows={5} 
                      required 
                    />
                  </div>
                  
                  {error && (
                    <div className="text-red-500 mb-4">
                      {error}
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaEnvelope className="mr-3 h-5 w-5 text-pink-600 dark:text-pink-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:info@pilatesflow.com" 
                        className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
                      >
                        info@pilatesflow.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaPhone className="mr-3 h-5 w-5 text-pink-600 dark:text-pink-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href="tel:+381641932069" 
                        className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
                      >
                        (+381) 064 1932-069
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <FaClock className="mr-3 h-5 w-5 text-pink-600 dark:text-pink-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Monday - Friday: 6am - 9pm<br />
                        Saturday - Sunday: 8am - 6pm
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                  <h3 className="font-semibold mb-3">Follow Us</h3>
                  <div className="flex space-x-3">
                    <a href="#" className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400">
                      <span className="sr-only">Instagram</span>
                      <FaInstagram className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studioLocations.map((location) => (
              <Card key={location.name} className="overflow-hidden">
                <div className="aspect-video relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {/* Placeholder for a map - in production you'd use a real map integration */}
                  {/*<MapPin className="h-12 w-12 text-gray-400" />*/}
                  <iframe
                    src={location.pin}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-3">{location.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <FaMapPin className="mr-3 h-4 w-4 text-pink-600 dark:text-pink-400 mt-1" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{location.address}</p>
                    </div>
                    
                    <div className="flex items-start">
                      <FaPhone className="mr-3 h-4 w-4 text-pink-600 dark:text-pink-400 mt-1" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{location.phone}</p>
                    </div>
                    
                    <div className="flex items-start">
                      <FaEnvelope className="mr-3 h-4 w-4 text-pink-600 dark:text-pink-400 mt-1" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{location.email}</p>
                    </div>
                    
                    <div className="flex items-start">
                      <FaClock className="mr-3 h-4 w-4 text-pink-600 dark:text-pink-400 mt-1" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{location.hours}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Do I need to bring my own equipment?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  No, we provide all the necessary equipment for our classes. Just bring comfortable clothing, water, and a positive attitude!
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">How do I book a class?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You can book classes through our online booking system, mobile app, or by calling our studio directly. We recommend booking at least 24 hours in advance as classes tend to fill up quickly.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">What&#39;s your cancellation policy?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We require a 12-hour notice for class cancellations to avoid being charged. For private sessions, we require a 24-hour notice.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Is Pilates suitable for beginners?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Absolutely! Pilates is adaptable to all fitness levels. We offer specific beginner classes and our instructors can modify exercises to suit your needs and experience level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Success Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Message Sent Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for reaching out. We&#39;ve received your message and will get back to you as soon as possible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}