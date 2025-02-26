import axios from "axios";
import {
  ProjectInfo,
  projectsResponseSchema,
  projectInfoSchema,
  projectSchema,
  projectTemplateListSchema,
} from "../data/schema";

const API_BASE_URL = "https://amberg-rail-project-dev.azurewebsites.net/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getProjects = async (direction: number = 1, cursor?: string) => {
  try {
    const url = cursor
      ? `/project/list/${cursor}`
      : `/project/list?direction=${direction}`;

    const response = await api.get(url);

    return projectsResponseSchema.parse(response.data);
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const createProject = async (projectData: ProjectInfo) => {
  try {
    projectInfoSchema.parse(projectData);

    const response = await api.post("/project", {
      ...projectData,
      number: "1",
    });

    return projectSchema.parse(response.data);
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchProjectTemplates = async () => {
  try {
    const response = await api.get("/projectTemplate/list");

    return projectTemplateListSchema.parse(response.data);
  } catch (error) {
    console.error("Error fetching project templates:", error);
    return [];
  }
};
