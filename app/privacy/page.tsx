import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

export default function PrivacyPage() {
  return (
    <div className="py-32">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-stone max-w-none text-muted-foreground space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>
            At {siteConfig.name}, we respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            and tell you about your privacy rights.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">1. Information We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            Identity Data, Contact Data, Technical Data, and Usage Data.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">2. How We Use Your Data</h2>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-8">3. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: {siteConfig.email}.
          </p>
        </div>
      </Container>
    </div>
  );
}
