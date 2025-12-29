export const siteConfig = {
  name: "Your Business",
  domain: "yourbusiness.com",
  description: "Premium architectural concrete and construction services for residential and commercial projects.",
  email: "hello@yourbusiness.com",
  phone: "(000) 000-0000",
  address: "City, State",
  
  // Navigation Links
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],

  // Social Links (Placeholders)
  socials: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
  },

  hero: {
    title: "Project integrity. \nBuilt to last.", // The period style from Ref
    subtitle: "We deliver high-end concrete solutions with precision and architectural excellence.",
    cta: "Contact Us",
  },

  intro: {
    heading: "Every detail considered.\nEvery project covered.",
    description: "We bring decades of experience to every pour. From architectural residential slabs to large-scale commercial foundations, our team is dedicated to quality, safety, and finish.",
  },

  capabilities: {
    title: "Our core capabilities include:",
    items: [
      { 
        title: "Architectural Slabs", 
        image: "/images/placeholder-1.jpg" 
      },
      { 
        title: "Commercial Foundations", 
        image: "/images/placeholder-2.jpg" 
      },
      { 
        title: "Civil Works", 
        image: "/images/placeholder-3.jpg" 
      },
      { 
        title: "Detailed Excavation", 
        image: "/images/placeholder-4.jpg" 
      },
      { 
        title: "Formwork Solutions", 
        image: "/images/placeholder-5.jpg" 
      },
    ],
  },
  
  splitFeature: {
    heading: "The team behind the pour.",
    description: "Founded on the principles of hard work and honest communication, our team is our greatest asset. We take pride in a roll-up-your-sleeves mentality.",
    image: "/images/team-placeholder.jpg",
    cta: "Meet the Team",
  },
  
  about: {
    hero: {
      title: "Our Story.",
      subtitle: "Building a legacy of quality and trust.",
    },
    intro: {
      heading: "More than just concrete.",
      description: "We started with a single truck and a vision. Today, we are the region's most trusted partner for complex architectural concrete.",
    },
    mosaic: [
        "/images/placeholder-6.jpg", "/images/placeholder-7.jpg", "/images/placeholder-8.jpg", "/images/placeholder-9.jpg"
    ]
  },

  services: {
    hero: {
      title: "Our Capabilities.",
      subtitle: "Comprehensive concrete solutions for every scale.",
    },
    items: [
      {
        title: "Residential Driveways",
        description: "Elevate your home's curb appeal with custom designed, durable concrete driveways.",
        image: "/images/service-1.jpg",
        mosaic: ["/images/service-1a.jpg", "/images/service-1b.jpg", "/images/service-1c.jpg"]
      },
      {
        title: "Commercial Buildings",
        description: "From foundations to suspended slabs, we deliver large-scale commercial structures with precision.",
        image: "/images/service-2.jpg",
        mosaic: ["/images/service-2a.jpg", "/images/service-2b.jpg", "/images/service-2c.jpg"]
      },
      {
        title: "Repair & Maintenance",
        description: "Extend the life of your concrete assets with our expert repair and maintenance services.",
        image: "/images/service-3.jpg",
        mosaic: ["/images/service-3a.jpg", "/images/service-3b.jpg", "/images/service-3c.jpg"]
      }
    ]
  },

  contact: {
    hero: {
      title: "Get in Touch.",
      subtitle: "Let's discuss your next project.",
    }
  },

  cta: {
    heading: "Ready to start your project?",
    subtext: "Get in touch with our team to discuss your requirements.",
    button: "Get a Quote",
  },

  footer: {
    copyright: "© 2024 Your Business. All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ]
  }
};
