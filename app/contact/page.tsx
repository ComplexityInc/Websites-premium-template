import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us for your next project.",
};

export default function ContactPage() {
  return (
    <>
      <Hero 
        title={siteConfig.contact.hero.title}
        subtitle={siteConfig.contact.hero.subtitle}
        showScroll={true}
        cta=""
        image="/images/placeholder-8.jpg"
      />
      
      <div className="relative z-10 bg-background mt-[100vh]">
        <div id="intro" className="py-24 bg-muted/20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Direct Contact Info */}
              <div className="space-y-12">
                 <Reveal>
                   <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                   <p className="text-lg text-muted-foreground mb-8">
                     We are available for consultations Monday through Friday. Please schedule an appointment or reach out via email.
                   </p>
                 </Reveal>

                 <Reveal delay={0.1} className="space-y-8">
                   <div>
                     <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Office</h3>
                     <p className="text-xl">{siteConfig.address}</p>
                   </div>
                   <div>
                     <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Email</h3>
                     <a href={`mailto:${siteConfig.email}`} className="text-xl hover:text-accent transition-colors">{siteConfig.email}</a>
                   </div>
                   <div>
                     <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Phone</h3>
                     <a href={`tel:${siteConfig.phone}`} className="text-xl hover:text-accent transition-colors">{siteConfig.phone}</a>
                   </div>
                 </Reveal>
              </div>

              {/* Form */}
              <div>
                <ContactForm />
              </div>

            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
