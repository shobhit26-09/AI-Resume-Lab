
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ResumeBuilder from "@/pages/ResumeBuilder";
import ResumeAnalysis from "@/pages/ResumeAnalysis";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/resume-builder",
    element: <ResumeBuilder />,
  },
  {
    path: "/resume-analysis",
    element: <ResumeAnalysis />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
