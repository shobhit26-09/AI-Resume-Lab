
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NavBar } from "@/components/NavBar";
import { Plus, Trash, Download } from "lucide-react";

interface ResumeSection {
  id: string;
  title: string;
  content: string;
}

interface ResumeTemplate {
  id: string;
  name: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  sections: ResumeSection[];
}

const templates: ResumeTemplate[] = [
  {
    id: "professional",
    name: "Professional Template",
    personalInfo: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
    },
    sections: [
      {
        id: "experience",
        title: "Work Experience",
        content: "Senior Software Engineer | Tech Corp\n2020 - Present\n• Led development of cloud-based solutions\n• Managed team of 5 developers\n\nSoftware Engineer | StartupXYZ\n2018 - 2020\n• Developed full-stack applications\n• Improved system performance by 40%",
      },
      {
        id: "education",
        title: "Education",
        content: "Master of Science in Computer Science\nStanford University | 2018\n\nBachelor of Science in Computer Engineering\nMIT | 2016",
      },
      {
        id: "skills",
        title: "Skills",
        content: "Programming Languages: JavaScript, Python, Java\nFrameworks: React, Node.js, Django\nTools: Git, Docker, AWS\nSoft Skills: Leadership, Communication, Problem Solving",
      },
    ],
  },
  {
    id: "creative",
    name: "Creative Template",
    personalInfo: {
      fullName: "Jane Smith",
      email: "jane.creative@example.com",
      phone: "+1 (555) 987-6543",
      location: "San Francisco, CA",
    },
    sections: [
      {
        id: "experience",
        title: "Creative Journey",
        content: "Art Director | Creative Studio\n2019 - Present\n• Directed visual identity for major brands\n• Led team of designers and artists\n\nSenior Designer | Design Agency\n2017 - 2019\n• Created award-winning campaign designs\n• Collaborated with international clients",
      },
      {
        id: "education",
        title: "Education & Training",
        content: "Bachelor of Fine Arts in Graphic Design\nParsons School of Design | 2017\n\nUI/UX Design Certification\nGoogle | 2018",
      },
      {
        id: "skills",
        title: "Creative Arsenal",
        content: "Design: Adobe Creative Suite, Figma, Sketch\nMultimedia: After Effects, Premier Pro\nSkills: Brand Design, Typography, Motion Graphics\nSoft Skills: Creativity, Team Collaboration, Client Communication",
      },
    ],
  },
];

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
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

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setPersonalInfo(template.personalInfo);
      setSections(template.sections);
    }
  };

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

  const downloadResume = () => {
    const resumeContent = `
${personalInfo.fullName}
${personalInfo.email} | ${personalInfo.phone}
${personalInfo.location}

${sections.map(section => `${section.title}
${section.content}

`).join('\n')}`;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto pt-24 pb-16">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
                  selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to use this template
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

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

          <div className="flex gap-4">
            <Button onClick={addNewSection} className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Add New Section
            </Button>
            <Button onClick={downloadResume} variant="secondary" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
