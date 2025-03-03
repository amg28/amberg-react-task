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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
    } else {
      console.error("Unexpected Error:", error);
    }
    return Promise.reject(error);
  }
);

export const getProjects = async (direction: number = 1, cursor?: string) => {
    const url = cursor
      ? `/project/list/${cursor}`
      : `/project/list?direction=${direction}`;

    const response = await api.get(url);

    return projectsResponseSchema.parse(response.data); 
};

export const createProject = async (projectData: ProjectInfo) => {
  
    projectInfoSchema.parse(projectData);

    const response = await api.post("/project", {
      ...projectData,
      number: "1",
    });

    return projectSchema.parse(response.data);
  
};

export const fetchProjectTemplates = async () => {
  
    const response = await api.get("/projectTemplate/list");

    return projectTemplateListSchema.parse(response.data);
  
};
