import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { OnboardingForm } from '@/components/OnboardingForm';
import { Dashboard } from '@/components/Dashboard';
import { RoadmapView } from '@/components/RoadmapView';
import { Footer } from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";

interface Profile {
  name: string;
  grade: string;
  interests: string[];
  skills: string[];
  region: string;
  language: string;
}

interface CareerRecommendation {
  id: string;
  title: string;
  confidence: number;
  bullets: string[];
}

const Index = () => {
  const [route, setRoute] = useState('home');
  const [profile, setProfile] = useState<Profile>({
    name: '',
    grade: '',
    interests: [],
    skills: [],
    region: '',
    language: 'English'
  });
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<CareerRecommendation | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const mockAnalyze = (p: Profile): CareerRecommendation[] => {
    const result: CareerRecommendation[] = [];
    
    if (p.interests.includes('Coding') || p.skills.some(s => s.toLowerCase().includes('python'))) {
      result.push({
        id: 'ds',
        title: 'Data Scientist',
        confidence: 91,
        bullets: ['Strong analytical thinking', 'Coding-friendly background', 'Project-based learning approach']
      });
      result.push({
        id: 'fe',
        title: 'Full-stack Developer',
        confidence: 85,
        bullets: ['Problem-solving mindset', 'Web development fundamentals', 'Technical versatility']
      });
    }
    
    if (p.interests.includes('Design') || p.skills.some(s => s.toLowerCase().includes('figma'))) {
      result.push({
        id: 'ux',
        title: 'UI/UX Designer',
        confidence: 89,
        bullets: ['Visual thinking abilities', 'User empathy', 'Creative problem solving']
      });
    }
    
    if (p.interests.includes('Business')) {
      result.push({
        id: 'pm',
        title: 'Product Manager',
        confidence: 87,
        bullets: ['Strategic thinking', 'Communication skills', 'Cross-functional collaboration']
      });
    }
    
    if (result.length === 0) {
      result.push({
        id: 'ba',
        title: 'Business Analyst',
        confidence: 75,
        bullets: ['Analytical mindset', 'Communication skills', 'Process improvement focus']
      });
    }
    
    return result;
  };

  const handleSubmitProfile = () => {
    const recs = mockAnalyze(profile);
    setRecommendations(recs);
    setRoute('dashboard');
    toast({
      title: "Profile analyzed successfully!",
      description: `Found ${recs.length} matching career paths for you.`,
    });
  };

  const handleSelectCareer = (career: CareerRecommendation) => {
    setSelectedCareer(career);
    setProgress({
      'Foundations': false,
      'Core Project': false,
      'Deploy Portfolio': false
    });
    setRoute('roadmap');
    toast({
      title: "Career path selected!",
      description: `Starting your ${career.title} roadmap.`,
    });
  };

  const handleToggleProgress = (item: string) => {
    setProgress(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
    
    const isCompleting = !progress[item];
    if (isCompleting) {
      toast({
        title: "Milestone completed!",
        description: `Great job completing ${item}!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header onNavigate={setRoute} />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        {route === 'home' && (
          <HeroSection onNavigate={setRoute} />
        )}
        
        {route === 'onboarding' && (
          <OnboardingForm
            profile={profile}
            setProfile={setProfile}
            onSubmit={handleSubmitProfile}
            onNavigate={setRoute}
          />
        )}
        
        {route === 'dashboard' && (
          <Dashboard
            profile={profile}
            recommendations={recommendations}
            onNavigate={setRoute}
            onSelectCareer={handleSelectCareer}
          />
        )}
        
        {route === 'roadmap' && selectedCareer && (
          <RoadmapView
            selectedCareer={selectedCareer}
            progress={progress}
            onToggleProgress={handleToggleProgress}
            onNavigate={setRoute}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
