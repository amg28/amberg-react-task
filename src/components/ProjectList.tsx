import { FC } from "react";

import { Project } from "../data/schema";
import ProjectCard from "./ProjectCard";
import { Box, Grid2 as Grid } from "@mui/material";

interface ProjectListProps {
  projects: Project[] | undefined;
}

const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  return (
    <Box>
      <Box mt={2}>
        <Grid container spacing={2}>
          {projects &&
            projects.map((project) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }} key={project.id}>
                <ProjectCard
                  name={project.projectInfo.name}
                  lastModified={project.modifiedDate}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProjectList;
