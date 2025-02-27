
import { Button } from "@/components/ui/button";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Sparkles, LogIn } from "lucide-react";

export const Hero = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-20 bg-gradient-to-br from-teal-50 via-purple-50 to-rose-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Create Your Professional Resume
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Build and customize your resume with our AI-powered resume builder. Stand out from the crowd and land your dream job.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              {isSignedIn ? (
                <Button
                  size="lg"
                  onClick={() => navigate("/resume-builder")}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Start Building
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button size="lg" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign in to Start Building
                  </Button>
                </SignInButton>
              )}
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate("/resume-analysis")}
                className="gap-2 bg-white hover:bg-gray-50"
              >
                <Sparkles className="h-4 w-4" />
                Analyze Resume with AI
              </Button>
            </div>
          </div>
          <div className="mx-auto flex w-full items-center justify-center">
            <img
              alt="Resume Builder Hero"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center"
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              width={600}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
