"use client";

import { useState } from "react";
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
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { createClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const tForm = useTranslations("ContactPage.form");
  const tSubjectOptions = useTranslations("ContactPage.form.subjectOptions");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const supabase = createClient();

    try {
      const { error } = await supabase.from("messages").insert([{ name, email, phone, subject, message }]);
      if (error) throw error;

      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setShowConfirmation(true);
    } catch (err) {
      console.error("Form submission error", err);
      setError(tForm("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">{tForm("title")}</h2> 
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="name">{tForm("name")}</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={tForm("namePlaceholder")} 
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
              placeholder={tForm("emailPlaceholder")}  
              required 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="phone">{tForm("phone")}</Label>
            <Input 
              id="phone" 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={tForm("phonePlaceholder")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">{tForm("subject")}</Label>
            <Select 
              value={subject} 
              onValueChange={setSubject}
            >
              <SelectTrigger id="subject">
                <SelectValue placeholder={tForm("subjectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">{tSubjectOptions("general")}</SelectItem>
                <SelectItem value="classes">{tSubjectOptions("classes")}</SelectItem>
                <SelectItem value="private">{tSubjectOptions("private")}</SelectItem>
                <SelectItem value="pricing">{tSubjectOptions("pricing")}</SelectItem>
                <SelectItem value="careers">{tSubjectOptions("careers")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          <Label htmlFor="message">{tForm("message")}</Label>
          <Textarea 
            id="message" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={tForm("messagePlaceholder")}
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
          {isSubmitting ? tForm("submitting") : tForm("submit")}
        </Button>
      </form>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{tForm("successTitle")}</AlertDialogTitle>
            <AlertDialogDescription>{tForm("successMessage")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}