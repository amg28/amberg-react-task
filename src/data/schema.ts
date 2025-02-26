import { z } from "zod";

const projectInfoSchema = z.object({
  name: z.string(),
  lineSectionName: z.string().nullable().optional(),
  trackName: z.string().nullable().optional(),
  projectTemplateId: z.string().nullable().optional(),
});

const newProjectValidationSchema = z.object({
  name: z.string(),
  lineSectionName: z.string(),
  trackName: z.string(),
  projectTemplateId: z.string(),
});

// there are more fields, but these are the ones that are used for task
const projectSchema = z.object({
  id: z.string(),
  projectInfo: projectInfoSchema,
  modifiedDate: z.string().datetime(),
});

const projectsResponseSchema = z.object({
  projects: z.array(projectSchema),
  prev: z.string().optional(),
  next: z.string().optional(),
});

export const projectTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const projectTemplateListSchema = z.array(projectTemplateSchema);

export type ProjectsData = z.infer<typeof projectsResponseSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectItem = ProjectsData["projects"][number];
export type ProjectInfo = z.infer<typeof projectInfoSchema>;
export type ProjectTemplate = z.infer<typeof projectTemplateSchema>;
export type ProjectTemplateList = z.infer<typeof projectTemplateListSchema>;

export {
  projectInfoSchema,
  newProjectValidationSchema,
  projectSchema,
  projectsResponseSchema,
};
