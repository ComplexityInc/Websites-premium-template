"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { siteConfig } from "@/content/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-[300px] bg-background border-l border-border p-6 shadow-2xl"
          >
            <div className="flex justify-end mb-8">
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="text-2xl font-light text-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-border my-6" />
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Contact</p>
                <a href={`mailto:${siteConfig.email}`} className="block text-lg hover:text-accent">{siteConfig.email}</a>
                <a href={`tel:${siteConfig.phone}`} className="block text-lg hover:text-accent">{siteConfig.phone}</a>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
