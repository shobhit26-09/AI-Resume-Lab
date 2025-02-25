
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background to-background/50 z-0" />
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
            Craft Your Perfect Resume with
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> AI
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Create professionally crafted resumes that stand out. Powered by AI to highlight your strengths and match job requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="group">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              View Templates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
