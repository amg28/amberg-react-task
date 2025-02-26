import { useQuery } from "@tanstack/react-query";
import { fetchProjectTemplates } from "../services/apiService";
import { ProjectTemplate } from "../data/schema";

export const useProjectTemplates = () => {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    ProjectTemplate[]
  >({
    queryKey: ["projectTemplates"],
    queryFn: fetchProjectTemplates,
    staleTime: 1000 * 60 * 5,
  });

  return {
    templates: data || [],
    isLoading,
    isFetching,
    error,
    refetchTemplates: refetch,
  };
};
