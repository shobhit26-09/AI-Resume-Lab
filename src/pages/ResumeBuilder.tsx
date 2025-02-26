import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NavBar } from "@/components/NavBar";
import { Plus, Trash, Download } from "lucide-react";
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

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
    id: "sde",
    name: "Software Developer Template",
    personalInfo: {
      fullName: "Alex Developer",
      email: "alex.dev@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
    },
    sections: [
      {
        id: "experience",
        title: "Professional Experience",
        content: "Senior Software Engineer | Tech Solutions Inc.\n2021 - Present\n• Architected and implemented microservices using Node.js and TypeScript\n• Led team of 4 developers in delivering critical features\n• Reduced API response time by 40% through optimization\n\nSoftware Engineer | StartupXYZ\n2019 - 2021\n• Developed full-stack applications using React and Node.js\n• Implemented CI/CD pipelines reducing deployment time by 60%",
      },
      {
        id: "education",
        title: "Education",
        content: "Master of Science in Computer Science\nStanford University | 2019\nCGPA: 3.8/4.0\n\nBachelor of Engineering in Computer Science\nMIT | 2017\nCGPA: 3.9/4.0",
      },
      {
        id: "skills",
        title: "Technical Skills",
        content: "Languages: JavaScript, TypeScript, Python, Java\nFrameworks: React, Node.js, Express, Next.js\nTools: Git, Docker, Kubernetes, AWS\nDatabases: MongoDB, PostgreSQL\nOther: RESTful APIs, GraphQL, Microservices",
      },
      {
        id: "projects",
        title: "Projects",
        content: "E-commerce Platform | React, Node.js, MongoDB\n• Built a full-stack e-commerce platform with 10k+ monthly users\n• Implemented real-time inventory management\n\nAI Chat Application | Python, TensorFlow\n• Developed an AI-powered chatbot using natural language processing\n• Achieved 85% accuracy in response generation",
      }
    ],
  },
  {
    id: "designer",
    name: "UI/UX Designer Template",
    personalInfo: {
      fullName: "Sarah Designer",
      email: "sarah.design@example.com",
      phone: "+1 (555) 987-6543",
      location: "New York, NY",
    },
    sections: [
      {
        id: "experience",
        title: "Design Experience",
        content: "Senior UI/UX Designer | Design Studio\n2020 - Present\n• Led the redesign of major e-commerce platform increasing conversion by 35%\n• Mentored junior designers and conducted design workshops\n• Created comprehensive design systems for enterprise clients\n\nProduct Designer | Tech Startup\n2018 - 2020\n• Designed mobile-first applications from concept to launch\n• Conducted user research and usability testing",
      },
      {
        id: "education",
        title: "Education",
        content: "Bachelor of Fine Arts in Digital Design\nParsons School of Design | 2018\n\nUX Design Certification\nGoogle | 2019",
      },
      {
        id: "skills",
        title: "Design Skills",
        content: "Design Tools: Figma, Adobe XD, Sketch, Photoshop, Illustrator\nPrototyping: InVision, Principle, ProtoPie\nOther: Design Systems, Wireframing, User Research\nSoft Skills: Communication, Project Management, Team Leadership",
      },
      {
        id: "portfolio",
        title: "Portfolio Projects",
        content: "Mobile Banking App Redesign\n• Increased user engagement by 45%\n• Reduced task completion time by 30%\n\nE-learning Platform Design\n• Created intuitive interface for 50k+ students\n• Implemented accessibility guidelines",
      }
    ],
  },
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

  const downloadResume = async (format: 'txt' | 'pdf' | 'docx') => {
    if (format === 'txt') {
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
    } else if (format === 'pdf') {
      const pdf = new jsPDF();
      const lineHeight = 7;
      let yPos = 20;

      // Add personal info
      pdf.setFontSize(16);
      pdf.text(personalInfo.fullName, 20, yPos);
      yPos += lineHeight;

      pdf.setFontSize(10);
      pdf.text(`${personalInfo.email} | ${personalInfo.phone}`, 20, yPos);
      yPos += lineHeight;
      pdf.text(personalInfo.location, 20, yPos);
      yPos += lineHeight * 2;

      // Add sections
      sections.forEach(section => {
        pdf.setFontSize(14);
        pdf.text(section.title, 20, yPos);
        yPos += lineHeight;

        pdf.setFontSize(10);
        const lines = section.content.split('\n');
        lines.forEach(line => {
          if (yPos >= pdf.internal.pageSize.height - 20) {
            pdf.addPage();
            yPos = 20;
          }
          pdf.text(line, 20, yPos);
          yPos += lineHeight;
        });
        yPos += lineHeight;
      });

      pdf.save('resume.pdf');
    } else if (format === 'docx') {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: personalInfo.fullName,
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${personalInfo.email} | ${personalInfo.phone}`,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: personalInfo.location,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({}),
            ...sections.flatMap(section => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: section.title,
                    bold: true,
                    size: 26,
                  }),
                ],
              }),
              ...section.content.split('\n').map(line => 
                new Paragraph({
                  children: [
                    new TextRun({
                      text: line,
                      size: 24,
                    }),
                  ],
                })
              ),
              new Paragraph({}),
            ]),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.docx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
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

          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={addNewSection} className="flex-1">
              <Plus className="mr-2 h-4 w-4" />
              Add New Section
            </Button>
            <div className="flex gap-2 flex-1">
              <Button onClick={() => downloadResume('txt')} variant="secondary" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download TXT
              </Button>
              <Button onClick={() => downloadResume('pdf')} variant="secondary" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button onClick={() => downloadResume('docx')} variant="secondary" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download DOCX
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
