import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject } from "../services/apiService";
import { useState } from "react";
import { ProjectsData, ProjectInfo } from "../data/schema";

export const useProjects = () => {
  const queryClient = useQueryClient();

  // Sorting & Pagination State
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = Ascending, -1 = Descending
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  // 🛠 Fetch Projects with React Query & Zod Validation
  const { data, error, isLoading, isFetching, refetch } =
    useQuery<ProjectsData>({
      queryKey: ["projects", direction, cursor],
      queryFn: () => getProjects(direction, cursor),
    });

  // 🛠 Create Project Mutation (Validates before sending)
  const createProjectMutation = useMutation({
    mutationFn: (projectData: ProjectInfo) => createProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Refresh project list
    },
  });

  const loadNext = () => {
    if (data?.next) setCursor(data.next);
  };

  const loadPrev = () => {
    if (data?.prev) setCursor(data.prev);
  };

  const toggleSort = () => {
    setDirection((prev) => (prev === 1 ? -1 : 1));
    setCursor(undefined); // Reset pagination when sorting changes
    refetch();
  };

  return {
    projects: data?.projects || [],
    isLoading,
    isFetching,
    error,
    createProject: createProjectMutation.mutate,
    createProjectStatus: createProjectMutation.status,
    createProjectError: createProjectMutation.error,
    loadNext,
    loadPrev,
    hasNext: !!data?.next,
    hasPrev: !!data?.prev,
    toggleSort,
    direction,
  };
};
