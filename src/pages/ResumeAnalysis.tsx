
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto pt-24 pb-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Resume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8">
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="flex flex-col items-center gap-4 cursor-pointer"
              >
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-lg font-medium">Upload your resume</p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, DOC, DOCX, and TXT files
                  </p>
                </div>
              </label>
            </div>

            {analyzing && (
              <div className="text-center p-4 text-muted-foreground">
                <p className="text-lg">Analyzing your resume...</p>
                <p className="text-sm">This may take a few moments</p>
              </div>
            )}

            {analysis && (
              <div className="p-6 bg-muted rounded-lg">
                <pre className="whitespace-pre-wrap text-sm">
                  {analysis}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ResumeAnalysis;
