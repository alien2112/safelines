import Link from 'next/link';
import VideoBackground from './components/VideoBackground';
import { ProjectsSection } from './components/Projects';
import { AboutSection } from './components/About';
import { ServicesSection } from './components/Services';
import CTASection from './components/CTA';
import MakingEasySection from './components/MakingEasy';
import StrategyContentSection from './components/StrategyContent';
import CommunitySection from './components/Community';
import FAQSection from './components/FAQ';
import PricingShippingSection from './components/PricingShipping';
import TestimonialsSection from './components/Testimonials';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <VideoBackground src="/hero-animations.mp4" scale={0.5} />
        <div className="container hero-row">
          <div>
            <div className="hero-tag" aria-label="tag">
              <span style={{ width: 8, height: 8, background: 'var(--color-primary)', borderRadius: 9999, display: 'inline-block' }} />
              SAFE LIENS CUSTOMS CLEARANCE
            </div>

            <h1 className="hero-headline">Unveiling a world of opportunities</h1>
            <p className="hero-subheadline">
              We provide distinguished customs clearance, sea, land, and air freight services with
              a modern, trustworthy experience.
            </p>

            <Link className="hero-cta" href="#contact">
              Book A Free Call Now
            </Link>
          </div>

          {/* Removed side media; background video is used instead */}
        </div>
      </section>
      <ProjectsSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection
        testimonials={[
          {
            avatarSrc: '/safelines-logo.png',
            name: 'Ryan harper',
            source: 'Harper education',
            review:
              'Working with this AI agency has been a game-changer for our team. Their smart solutions and action able insights help us make better decisions every day.',
          },
          {
            avatarSrc: '/safelines-logo.png',
            name: 'Mia emirt',
            source: 'emirt agency',
            review:
              'The perfect partner for AI-driven innovation. They simplified our workflows and gave our marketing team the tools to achieve more with less effort.',
          },
          {
            avatarSrc: '/safelines-logo.png',
            name: 'Emily johns',
            source: 'Johnson marketing',
            review:
              "We've seen measurable growth since implementing their solutions. It’s intuitive, fast, and works seamlessly with our existing workflows.",
          },
        ]}
        reviewUsers={[
          '/safelines-logo.png',
          '/safelines-logo.png',
          '/safelines-logo.png',
          '/safelines-logo.png',
          '/safelines-logo.png',
        ]}
        blob={{
          intensity: 0.85,
          colors: {
            primary: 'rgba(236,72,153,0.75)',
            mid: 'rgba(244,114,182,0.55)',
            outer: 'rgba(253,164,175,0.38)',
          },
        }}
      />
      <MakingEasySection />
      <StrategyContentSection />
      <CommunitySection />
      <FAQSection />
      <PricingShippingSection />
      <CTASection />
      <Footer />
    </main>
  );
}


