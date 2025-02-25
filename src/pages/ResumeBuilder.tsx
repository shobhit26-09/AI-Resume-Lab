
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NavBar } from "@/components/NavBar";
import { Plus, Trash } from "lucide-react";

interface ResumeSection {
  id: string;
  title: string;
  content: string;
}

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [sections, setSections] = useState<ResumeSection[]>([
    { id: "experience", title: "Work Experience", content: "" },
    { id: "education", title: "Education", content: "" },
    { id: "skills", title: "Skills", content: "" },
  ]);

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSectionChange = (id: string, value: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, content: value } : section
      )
    );
  };

  const addNewSection = () => {
    const newSection = {
      id: `section-${sections.length + 1}`,
      title: "New Section",
      content: "",
    };
    setSections((prev) => [...prev, newSection]);
  };

  const removeSection = (id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto pt-24 pb-16">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input
                name="fullName"
                placeholder="Full Name"
                value={personalInfo.fullName}
                onChange={handlePersonalInfoChange}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={personalInfo.email}
                onChange={handlePersonalInfoChange}
              />
              <Input
                name="phone"
                placeholder="Phone"
                value={personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
              <Input
                name="location"
                placeholder="Location"
                value={personalInfo.location}
                onChange={handlePersonalInfoChange}
              />
            </CardContent>
          </Card>

          {sections.map((section) => (
            <Card key={section.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>{section.title}</CardTitle>
                {section.id !== "experience" && 
                 section.id !== "education" && 
                 section.id !== "skills" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSection(section.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={`Enter your ${section.title.toLowerCase()}...`}
                  value={section.content}
                  onChange={(e) => handleSectionChange(section.id, e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          ))}

          <Button onClick={addNewSection} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Section
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
