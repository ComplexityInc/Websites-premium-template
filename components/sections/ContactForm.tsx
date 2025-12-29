"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate network request
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  if (formState === "success") {
    return (
      <Reveal className="p-8 border border-border bg-muted/20 text-center">
        <h3 className="text-2xl font-bold mb-4">Message Sent</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. We will get back to you shortly.
        </p>
        <Button onClick={() => setFormState("idle")} variant="outline">
          Send Another
        </Button>
      </Reveal>
    );
  }

  return (
    <Reveal className="bg-white p-8 md:p-10 border border-border shadow-sm">
      <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Name</label>
            <input 
              id="name" 
              type="text" 
              required
              className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Email</label>
            <input 
              id="email" 
              type="email" 
              required
              className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
              placeholder="hello@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Phone (Optional)</label>
          <input 
            id="phone" 
            type="tel" 
            className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
            placeholder="(000) 000-0000"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Message</label>
          <textarea 
            id="message" 
            required
            rows={5}
            className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow resize-none"
            placeholder="Tell us about your project..."
          />
        </div>

        <Button 
          type="submit" 
          disabled={formState === "submitting"}
          variant="solid"
          wide
          className="w-full"
        >
          {formState === "submitting" ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Reveal>
  );
}
