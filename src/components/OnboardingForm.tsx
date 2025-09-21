import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Profile {
  name: string;
  grade: string;
  interests: string[];
  skills: string[];
  region: string;
  language: string;
}

interface OnboardingFormProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  onSubmit: () => void;
  onNavigate: (route: string) => void;
}

const interestTags = ['Coding', 'Design', 'Business', 'Science', 'Arts', 'Robotics', 'Content'];

export function OnboardingForm({ profile, setProfile, onSubmit, onNavigate }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const toggleInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.includes(interest)
        ? profile.interests.filter(i => i !== interest)
        : [...profile.interests, interest]
    });
  };

  const handleSkillsChange = (value: string) => {
    setProfile({
      ...profile,
      skills: value.split(',').map(s => s.trim()).filter(Boolean)
    });
  };

  return (
    <section className="mt-6 max-w-2xl mx-auto">
      <Card className="p-8 shadow-elegant">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Create your profile</h2>
          <div className="text-sm text-muted-foreground">Step {currentStep} of 2</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade / Degree</Label>
                  <Input
                    id="grade"
                    required
                    value={profile.grade}
                    onChange={(e) => setProfile({ ...profile, grade: e.target.value })}
                    placeholder="e.g., 12th Grade, B.Tech CSE"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Region</Label>
                <Select 
                  value={profile.region} 
                  onValueChange={(value) => setProfile({ ...profile, region: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metro">Metro</SelectItem>
                    <SelectItem value="tier2">Tier 2</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => onNavigate('home')}>
                  Back
                </Button>
                <Button type="button" onClick={() => setCurrentStep(2)}>
                  Next
                </Button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Interests</Label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {interestTags.map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant={profile.interests.includes(tag) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleInterest(tag)}
                        className="transition-smooth"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input
                    id="skills"
                    value={profile.skills.join(', ')}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    placeholder="e.g., Python, Figma, Communication"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button type="submit" variant="hero">
                  Analyze & Recommend
                </Button>
              </div>
            </>
          )}
        </form>
      </Card>
    </section>
  );
}