// src/pages/ProjectListPage.tsx
import { FC, useEffect, useState } from "react";
import PageLayout from "../layout/PageLayout";
import ProjectList from "../components/ProjectList";
import { Project, ProjectsData } from "../data/schema";
import { getProjects } from "../services/apiService";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

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
  const [projects, setProjects] = useState<Project[]>();
  const [cursor, setCursor] = useState<string | null>(null);
  const [ascDirection, setAscDirection] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const data: ProjectsData = await getProjects(
        ascDirection,
        cursor || undefined
      );
      if (data) {
        setProjects(data.projects);
        setCursor(data.next || null);
      }
    };
    fetchData();
  }, [ascDirection, cursor]);

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
            <Select
              value={ascDirection}
              onChange={(e) => setAscDirection(Number(e.target.value))}
              label="Order"
            >
              <MenuItem value={1}>A-Z</MenuItem>
              <MenuItem value={-1}>Z-A</MenuItem>
            </Select>
          </StyledDropDown>
        </StyledHeaderGroup>
      }
    >
      <ProjectList projects={projects} />
    </PageLayout>
  );
};

export default ProjectListPage;
