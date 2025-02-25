
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Create Your Professional Resume
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Build and customize your resume with our AI-powered resume builder. Stand out from the crowd and land your dream job.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                size="lg"
                onClick={() => {
                  if (isSignedIn) {
                    navigate("/resume-builder");
                  }
                }}
              >
                Start Building
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
