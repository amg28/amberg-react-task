import { z } from "zod";

const projectInfoSchema = z.object({
  name: z.string(),
  number: z.string(),
  comment: z.string().nullable().optional(),
  start: z
    .object({
      name: z.string(),
      stationing: z.number(),
    })
    .optional(),
  end: z
    .object({
      name: z.string(),
      stationing: z.number(),
    })
    .optional(),
});

const customerInfoSchema = z.object({
  homePage: z.string().url().optional(),
});

const serviceProviderInfoSchema = z.object({}).optional();

const statisticsSchema = z.object({
  oldestMeasurementCreatedDate: z.string().datetime(),
  newestMeasurementCreatedDate: z.string().datetime(),
});

const projectSchema = z.object({
  id: z.string(),
  projectInfo: projectInfoSchema,
  customerInfo: customerInfoSchema,
  serviceProviderInfo: serviceProviderInfoSchema,
  createdDate: z.string().datetime(),
  modifiedDate: z.string().datetime(),
  statistics: statisticsSchema,
  eTag: z.string(),
});

const projectsResponseSchema = z.object({
  projects: z.array(projectSchema),
  prev: z.string().optional(),
  next: z.string().optional(),
});

export type ProjectsData = z.infer<typeof projectsResponseSchema>;
export type Project = z.infer<typeof projectSchema>;
export type ProjectItem = ProjectsData["projects"][0];
export type ProjectInfo = z.infer<typeof projectInfoSchema>;
export type CustomerInfo = z.infer<typeof customerInfoSchema>;
export type ServiceProviderInfo = z.infer<typeof serviceProviderInfoSchema>;
export type Statistics = z.infer<typeof statisticsSchema>;

export { projectInfoSchema, projectSchema, projectsResponseSchema };
