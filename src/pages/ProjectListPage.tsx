import { FC } from "react";
import PageLayout from "../layout/PageLayout";
import ProjectList from "../components/ProjectList";
import {
  Box,
  Button,
  styled,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import Pagination from "../components/Pagination";
import SortOrderSelect from "../components/SortOrderSelect";

const StyledHeaderGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
}));

const ProjectListPage: FC = () => {
  const {
    projects,
    isLoading,
    error,
    loadNext,
    loadPrev,
    hasNext,
    hasPrev,
    toggleSort,
    direction,
  } = useProjects();

  return (
    <PageLayout
      subtitle="Projects"
      actions={
        <StyledHeaderGroup>
          <Button variant="contained" component={Link} to="/new">
            + New
          </Button>
         <SortOrderSelect direction={direction} toggleSort={toggleSort} />
        </StyledHeaderGroup>
      }
    >
      {isLoading ? (
        <Box display="flex" justifyContent="center" mt={(theme) => theme.spacing(2)}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box color={(theme) => theme.palette.error.main} textAlign="center" mt={(theme) => theme.spacing(2)}>
          Failed to load projects. Please try again.
        </Box>
      ) : (
        <>
          <ProjectList projects={projects} />
          <Pagination
            loadPrev={loadPrev}
            loadNext={loadNext}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        </>
      )}
    </PageLayout>
  );
};

export default ProjectListPage;
