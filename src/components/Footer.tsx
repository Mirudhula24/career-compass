export function Footer() {
  return (
    <footer className="mt-16 py-8 bg-card border-t">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-bold text-foreground">CareerCompass</div>
          <div className="text-xs text-muted-foreground">
            Built for Indian students • Multilingual support coming soon • Backed by Google Cloud
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          © CareerCompass • Privacy • Terms
        </div>
      </div>
    </footer>
  );
}
