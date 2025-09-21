import { Button } from "./ui/button";
import { Card } from "./ui/card";
import heroImage from "@/assets/hero-illustration.jpg";

interface HeroSectionProps {
  onNavigate: (route: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const handleSampleRoadmap = () => {
    alert('Demo roadmap opened');
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7 space-y-6">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Your Personalized Career & Skills Roadmap
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          AI-powered career guidance tailored to your strengths, interests, and future opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="hero" size="lg" onClick={() => onNavigate('onboarding')}>
            Get Your Career Roadmap
          </Button>
          <Button variant="outline" size="lg" onClick={handleSampleRoadmap}>
            See Sample Roadmap
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 bg-gradient-card shadow-elegant hover:shadow-glow transition-smooth">
            <h3 className="font-semibold text-foreground">Lost in Career Choices?</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Most students rely on generic advice. We provide personalized clarity using AI + local job market data.
            </p>
            <ul className="mt-4 text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Current career guidance = confusing & generic</li>
              <li>Fast-changing job market</li>
              <li>Students lack personalized clarity</li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-card shadow-elegant hover:shadow-glow transition-smooth">
            <h3 className="font-semibold text-foreground">Why CareerCompass?</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Powered by Google Cloud's Gemini, grounded in job data, and optimized for students across India.
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Gemini AI</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Localized</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Skill Roadmaps</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Mock Interviews</span>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <h4 className="font-semibold mb-4">How it works</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              "Create profile",
              "AI recommends", 
              "Explore roadmap",
              "Mock interviews & more"
            ].map((step, index) => (
              <Card key={step} className="p-4 text-center shadow-elegant hover:shadow-glow transition-smooth">
                <div className="w-8 h-8 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center mx-auto mb-2">
                  {index + 1}
                </div>
                <div className="text-sm font-medium">{step}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-gradient-hero p-6 shadow-elegant">
          <div className="h-72 flex flex-col items-center justify-center">
            <img 
              src={heroImage} 
              alt="Students exploring career paths" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="mt-6">
            <div className="text-sm text-muted-foreground mb-3">Inclusive Features</div>
            <div className="grid grid-cols-2 gap-2">
              {["Regional tips", "Local salary ranges", "Language support", "Scholarships"].map((feature) => (
                <Card key={feature} className="p-3 text-sm text-center hover:bg-primary/5 transition-smooth">
                  {feature}
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}