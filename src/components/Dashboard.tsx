import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface CareerRecommendation {
  id: string;
  title: string;
  confidence: number;
  bullets: string[];
}

interface Profile {
  name: string;
  grade: string;
  interests: string[];
  skills: string[];
  region: string;
  language: string;
}

interface DashboardProps {
  profile: Profile;
  recommendations: CareerRecommendation[];
  onNavigate: (route: string) => void;
  onSelectCareer: (career: CareerRecommendation) => void;
}

export function Dashboard({ profile, recommendations, onNavigate, onSelectCareer }: DashboardProps) {
  return (
    <section className="mt-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Career Recommendations</h2>
          <div className="text-sm text-muted-foreground">
            Top career options tailored for {profile.name || 'you'}
          </div>
        </div>
        <Button variant="outline" onClick={() => onNavigate('onboarding')}>
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="p-6 shadow-elegant hover:shadow-glow transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{rec.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {rec.confidence}% match
                  </Badge>
                </div>
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              {rec.bullets.map((bullet, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>

            <Button 
              variant="hero" 
              className="w-full" 
              onClick={() => onSelectCareer(rec)}
            >
              Select This Path
            </Button>
          </Card>
        ))}
      </div>

      {recommendations.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            Complete your profile to get personalized career recommendations
          </div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => onNavigate('onboarding')}
          >
            Complete Profile
          </Button>
        </Card>
      )}
    </section>
  );
}
