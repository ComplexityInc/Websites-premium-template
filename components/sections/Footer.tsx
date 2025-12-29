import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="relative z-20 bg-background border-t border-border py-16">
      <Container className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-8">
          {siteConfig.name}
        </h2>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          {siteConfig.nav.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mb-8 flex flex-col items-center gap-2 text-muted-foreground">
          <p>{siteConfig.address}</p>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground transition-colors">{siteConfig.email}</a>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-muted-foreground/60 border-t border-border pt-8 w-full max-w-xl justify-center">
          <p>{siteConfig.footer.copyright}</p>
          <div className="flex gap-4">
            {siteConfig.footer.links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
