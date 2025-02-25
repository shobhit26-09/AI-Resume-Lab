
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const NavBar = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <a href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">AI Resume Lab</span>
          </a>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </a>
            <a href="#templates" className="text-sm font-medium transition-colors hover:text-primary">
              Templates
            </a>
            <a href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="text-sm">
                  Get Started
                </Button>
              </SignUpButton>
            </>
          ) : (
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
};
