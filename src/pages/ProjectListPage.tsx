import { FC } from "react";
import PageLayout from "../layout/PageLayout";
import ProjectList from "../components/ProjectList";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";

const StyledHeaderGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
}));

const StyledDropDown = styled(FormControl)(({ theme }) => ({
  display: "flex",
  minWidth: theme.spacing(12),
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const ProjectListPage: FC = () => {
  const {
    projects,
    isLoading,
    // error,
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
          <StyledDropDown variant="outlined">
            <InputLabel>Order</InputLabel>
            <Select value={direction} onChange={toggleSort} label="Order">
              <MenuItem value={1}>A-Z</MenuItem>
              <MenuItem value={-1}>Z-A</MenuItem>
            </Select>
          </StyledDropDown>
        </StyledHeaderGroup>
      }
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <ProjectList projects={projects} />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" onClick={loadPrev} disabled={!hasPrev}>
              Previous
            </Button>
            <Button variant="contained" onClick={loadNext} disabled={!hasNext}>
              Next
            </Button>
          </Box>
        </>
      )}
    </PageLayout>
  );
};

export default ProjectListPage;
