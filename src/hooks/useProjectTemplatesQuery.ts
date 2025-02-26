import { useQuery } from "@tanstack/react-query";
import { fetchProjectTemplates } from "../services/apiService";
import { ProjectTemplate } from "../data/schema";

export const useProjectTemplatesQuery = () => {
  return useQuery<
    ProjectTemplate[]
  >({
    queryKey: ["projectTemplates"],
    queryFn: fetchProjectTemplates,
    staleTime: 1000 * 60 * 5,
  });
};
