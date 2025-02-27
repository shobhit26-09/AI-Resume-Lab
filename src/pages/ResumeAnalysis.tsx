
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const ResumeAnalysis = () => {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setAnalyzing(true);
      toast({
        title: "Analyzing Resume",
        description: "Please wait while we analyze your resume...",
      });

      const text = await extractTextFromFile(file);
      
      const response = await fetch('/functions/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText: text }),
      });

      if (!response.ok) throw new Error('Analysis failed');

      const data = await response.json();
      setAnalysis(data.choices[0].message.content);
      
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully!",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          resolve(e.target?.result as string);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-purple-50 to-rose-50">
      <NavBar />
      <main className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Is your resume good enough?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A free and fast AI resume checker doing 16 crucial checks to ensure your resume is ready to perform and get you interview callbacks.
            </p>
          </div>

          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-dashed rounded-xl">
            <div className="flex flex-col items-center justify-center gap-4">
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="w-full"
              >
                <div className="flex flex-col items-center gap-6 cursor-pointer p-8">
                  <Upload className="h-12 w-12 text-emerald-500" />
                  <div className="text-center space-y-2">
                    <p className="text-lg font-medium">Drop your resume here or choose a file.</p>
                    <p className="text-sm text-gray-500">PDF & DOCX only. Max 2MB file size.</p>
                  </div>
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    Upload Your Resume
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Lock className="h-4 w-4" />
                    <span>Privacy guaranteed</span>
                  </div>
                </div>
              </label>
            </div>
          </Card>

          {analyzing && (
            <div className="text-center p-4">
              <p className="text-lg text-gray-600">Analyzing your resume...</p>
              <p className="text-sm text-gray-500">This may take a few moments</p>
            </div>
          )}

          {analysis && (
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {analysis}
              </pre>
            </Card>
          )}

          <div className="mt-16 text-center space-y-4">
            <p className="text-gray-600 font-medium">Loved by interviewers at</p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
              <span className="text-xl font-bold">Google</span>
              <span className="text-xl font-bold">TESLA</span>
              <span className="text-xl font-bold">facebook</span>
              <span className="text-xl font-bold">Spotify</span>
              <span className="text-xl font-bold">amazon</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeAnalysis;
