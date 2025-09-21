import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface CareerRecommendation {
  id: string;
  title: string;
  confidence: number;
  bullets: string[];
}

interface RoadmapProgress {
  [key: string]: boolean;
}

interface RoadmapViewProps {
  selectedCareer: CareerRecommendation;
  progress: RoadmapProgress;
  onToggleProgress: (item: string) => void;
  onNavigate: (route: string) => void;
}

const roadmapItems = [
  { key: 'Foundations', title: 'Foundations', description: 'Build core knowledge and understanding', months: 1 },
  { key: 'Core Project', title: 'Core Project', description: 'Apply skills in a real-world project', months: 2 },
  { key: 'Deploy Portfolio', title: 'Deploy Portfolio', description: 'Showcase your work and skills', months: 1 },
];

export function RoadmapView({ selectedCareer, progress, onToggleProgress, onNavigate }: RoadmapViewProps) {
  const completedItems = Object.values(progress).filter(Boolean).length;
  const totalItems = Object.keys(progress).length;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <section className="mt-6">
      <Card className="p-8 shadow-elegant">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">{selectedCareer?.title || 'Career Roadmap'}</h2>
            <div className="text-sm text-muted-foreground">6-month adaptive learning path</div>
          </div>
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{completedItems}/{totalItems} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {roadmapItems.map((item, index) => (
              <Card key={item.key} className="p-6 shadow-elegant hover:shadow-glow transition-smooth">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      Suggested: {item.months} month{item.months > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <Button
                    variant={progress[item.key] ? "success" : "outline"}
                    onClick={() => onToggleProgress(item.key)}
                    className="ml-4"
                  >
                    {progress[item.key] ? 'Completed' : 'Mark Done'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <aside className="space-y-6">
            <Card className="p-6 bg-gradient-hero shadow-elegant">
              <h4 className="font-semibold mb-3">Roadmap Summary</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Track progress and get dynamic updates. Resources are integrated for seamless learning.
              </p>
              
              <div className="space-y-3">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Learning Resources
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Intro to Python — free course
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Project: Guided dataset challenge
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Mock interview session
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 shadow-elegant">
              <h4 className="font-semibold mb-3">Next Steps</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Complete current milestone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <span>Schedule mock interview</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <span>Build portfolio project</span>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </Card>
    </section>
  );
}