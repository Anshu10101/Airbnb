import Container from "@/components/Container";
import Heading from "@/components/Heading";

const PrivacyPolicy = () => {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <Heading
          title="Privacy Policy"
          subtitle="Last updated: March 2024"
        />
        
        <div className="mt-8 space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Communication preferences</li>
              <li>Profile information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Process your transactions</li>
              <li>Send you updates and marketing communications</li>
              <li>Improve our services</li>
              <li>Protect against fraud and unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Service providers and business partners</li>
              <li>Legal authorities when required by law</li>
              <li>Other users as part of the normal operation of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">Email: privacy@airbnb-clone.com</p>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicy; 