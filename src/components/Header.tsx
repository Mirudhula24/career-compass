import { Button } from "./ui/button";

interface HeaderProps {
  onNavigate: (route: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center text-white font-bold shadow-elegant">
          CC
        </div>
        <div>
          <div className="font-bold text-lg">CareerCompass</div>
          <div className="text-xs text-muted-foreground">Personalized career & skills roadmap</div>
        </div>
      </div>
      <nav className="flex items-center gap-3">
        <button onClick={() => onNavigate('home')} className="text-sm hover:text-primary transition-smooth">
          Home
        </button>
        <Button variant="hero" onClick={() => onNavigate('onboarding')}>
          Get Your Roadmap
        </Button>
      </nav>
    </header>
  );
}