import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject } from "../services/apiService";
import { useState } from "react";
import { ProjectsData, ProjectInfo } from "../data/schema";

enum SortDirection {
  ASCENDING = 1,
  DESCENDING = -1,
}

export const useProjects = () => {
  const queryClient = useQueryClient();

  const [direction, setDirection] = useState<SortDirection>(
    SortDirection.ASCENDING
  );
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const { data, error, isLoading, isFetching, refetch } =
    useQuery<ProjectsData>({
      queryKey: ["projects", direction, cursor],
      queryFn: () => getProjects(direction, cursor),
      staleTime: 1000 * 60 * 5,
    });

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
    setDirection((prev) =>
      prev === SortDirection.ASCENDING
        ? SortDirection.DESCENDING
        : SortDirection.ASCENDING
    );
    setCursor(undefined);
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
