import Container from "@/components/Container";
import Heading from "@/components/Heading";

const TermsOfService = () => {
  return (
    <Container>
      <div className="max-w-4xl mx-auto py-12">
        <Heading
          title="Terms of Service"
          subtitle="Last updated: March 2024"
        />
        
        <div className="mt-8 space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
            <p>To use certain features of the Service, you must register for an account. You agree to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Not share your account credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Listing and Booking</h2>
            <p>When listing or booking properties:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>All information must be accurate and up-to-date</li>
              <li>You must honor your commitments as host or guest</li>
              <li>You must follow our community guidelines</li>
              <li>You are responsible for any taxes or fees required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Prohibited Activities</h2>
            <p>Users are prohibited from:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Violating any applicable laws or regulations</li>
              <li>Posting false or misleading information</li>
              <li>Interfering with the proper operation of the service</li>
              <li>Engaging in discriminatory behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
            <p>We reserve the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Suspend or terminate accounts</li>
              <li>Remove or edit content</li>
              <li>Deny service to anyone</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Contact Information</h2>
            <p>For any questions about these Terms of Service, please contact us at:</p>
            <p className="mt-2">Email: legal@airbnb-clone.com</p>
          </section>
        </div>
      </div>
    </Container>
  );
};

export default TermsOfService; 