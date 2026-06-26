import { projectItems } from "./projects";

// Legacy export kept so older imports or validators do not break.
// The UI now uses these as project highlights instead of fake testimonials.
export const testimonialData = projectItems.map((project) => ({
  image: project.path,
  name: project.title,
  position: project.category,
  message: project.description,
}));
